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

    const products = useSelector((state) => state.products.products);

    const filteredProducts = products.filter((product) => {
        if (activeTab === 'New Arrival') return product.isNewArrival;
        if (activeTab === 'Bestseller') return product.isBestseller;
        if (activeTab === 'Featured Products') return product.isFeatured;
        return true;
    })

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
                {filteredProducts.slice(0, 4).map((product) => (
                    <Product product={product} key={product.id} />
                ))}
            </div>
        </>
    );
}

export default Products;
