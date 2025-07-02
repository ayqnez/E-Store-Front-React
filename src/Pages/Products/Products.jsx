import './products.css'

import { IoPhonePortraitOutline } from "react-icons/io5";
import { BsSmartwatch } from "react-icons/bs";
import { IoCameraOutline } from "react-icons/io5";
import { PiHeadphonesLight } from "react-icons/pi";
import { RiMacbookLine } from "react-icons/ri";
import { IoGameControllerOutline } from "react-icons/io5";

import { useEffect, useState } from 'react';

import Product from './Product';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts, setProducts } from '../../Redux/Reducers/productsReducer';

const categories = [
    { name: 'phones', icon: <IoPhonePortraitOutline /> },
    { name: 'watches', icon: <BsSmartwatch /> },
    { name: 'cameras', icon: <IoCameraOutline /> },
    { name: 'headphones', icon: <PiHeadphonesLight /> },
    { name: 'laptops', icon: <RiMacbookLine /> },
    { name: 'gaming', icon: <IoGameControllerOutline /> }
];

const tabs = ['New Arrival', 'Bestseller', 'Featured Products'];

function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('New Arrival');
    const [visibleCount, setVisibleCount] = useState(4);

    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleShowMore = () => {
        setVisibleCount(prev => Math.min(prev + 4, products.length));
    };

    const handleShowLess = () => {
        setVisibleCount(prev => Math.max(prev - 4, 4));
    };

    return (
        <>
            <div className="category-container">
                <p>Browse By Category</p>
                <div className="category">
                    {categories.map((category, index) => (
                        <button key={index} onClick={() => navigate(`/products/${category.name}`)}>
                            <div className='category-card'>
                                <div className="icon">
                                    {category.icon}
                                </div>
                                <div className="name">
                                    {category.name}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="tab-navigation">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="products-container">
                {products.slice(0, visibleCount).map((product) => (
                    <Product product={product} key={product.id} />
                ))}
            </div>

            <div className="show-more-container">
                {visibleCount < products.length && (
                    <button className="show-more-button" onClick={handleShowMore}>
                        Show More
                    </button>
                )}

                {visibleCount > 4 && (
                    <button className="back-button" onClick={handleShowLess}>
                        Back
                    </button>
                )}
            </div>
        </>
    );
}

export default Products;
