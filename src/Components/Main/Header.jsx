import './header.css';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuHeart } from "react-icons/lu";

import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TiDelete } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../../Redux/Reducers/cartReducer';
import { fetchFav } from '../../Redux/Reducers/favoriteReducer';
import { fetchProducts } from '../../Redux/Reducers/productsReducer';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showFav, setShowFav] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const fav = useSelector(state => state.favorites.favorites);
    const cart = useSelector(state => state.cart.cartItems);
    const products = useSelector(state => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
            return;
        }

        const filtered = products.filter(product =>
            product.name?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    }, [query, products]);

    const toggleFav = () => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            alert("You need to login");
            return;
        }
        setShowFav(prev => !prev);
        dispatch(fetchFav())
    };

    const toggleCart = () => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            alert("You need to login");
            return;
        }
        setShowCart(prev => !prev);
        dispatch(fetchCart())
    };

    async function toggleDelete(productId) {
        const jwtToken = localStorage.getItem("jwtToken");

        const response = await fetch(`http://localhost:8080/api/cart/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            dispatch(removeFromCart(productId));
        }
    }

    return (
        <header className="header">

            <div className="header-left">

                <div className="header-logo">
                    <Link to="/"><img src="/img/logo.png" alt="Logo" /></Link>
                </div>

                <div className="header-search" onClick={() => setShowSearch(true)}>
                    <button>Search</button>
                    <CiSearch />
                </div>

                {showSearch && (
                    <div className="search-modal" onClick={() => setShowSearch(false)}>

                        <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>

                            <div className="search-header">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            <ul className="search-results">
                                {query && (
                                    results.length > 0 ? (
                                        results.map(product => (
                                            <li key={product.id}>
                                                <Link to={`/product/${product.id}`} onClick={() => {
                                                    setQuery('');
                                                    setShowSearch(false);
                                                }}>
                                                    {product.name}
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="no-results">No results for "{query}"</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <div className="header-right">
                <div className="header-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact Us</NavLink>
                    <NavLink to="/blog" className={({ isActive }) => isActive ? "active" : ""}>Blog</NavLink>
                </div>

                <div className="header-buttons">
                    <LuHeart size={23} onClick={toggleFav} style={{ cursor: 'pointer' }} />

                    {showFav && (
                        <div className="favorites-dropdown">
                            {fav.length === 0 ? (
                                <p>Empty</p>
                            ) : (
                                <ul>
                                    {fav.map((product) => (
                                        <li key={product.id}>
                                            <div className="favorite-details">
                                                <Link to={`/product/${product.id}`}>
                                                    <img
                                                        src={`http://localhost:8080/uploads/images/${product.imageUrl}`}
                                                        alt={product.name}
                                                    />
                                                    <div className="favorite-info">{product.name}</div>
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    <IoCartOutline size={27} onClick={toggleCart} style={{ cursor: 'pointer' }} />

                    {showCart && (
                        <div className="favorites-dropdown">
                            <ul>
                                {cart.map((item) => (
                                    <li key={item.id}>
                                        <div className="favorite-details">
                                            <Link to={`/product/${item.product?.id}`}>
                                                <img
                                                    src={`http://localhost:8080/uploads/images/${item.product?.imageUrl}`}
                                                    alt={item.product?.name}
                                                />
                                                <div className="favorite-info">{item.product?.name}</div>
                                            </Link>
                                        </div>
                                        <div className="favorite-delete">
                                            <TiDelete onClick={() => toggleDelete(item.id)} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button className="btn-cart" onClick={() => navigate("/cart")}>
                                Shopping Cart
                            </button>
                        </div>
                    )}

                    <Link to="/profile">
                        <CgProfile size={23} />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
