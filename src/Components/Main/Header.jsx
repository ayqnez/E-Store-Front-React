import './header.css';
import { Link, NavLink, useNavigate } from "react-router-dom";

import { LuHeart } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";

import { useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../../Redux/Reducers/cartReducer';
import { fetchFav } from '../../Redux/Reducers/favoriteReducer';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showFav, setShowFav] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const fav = useSelector(state => state.favorites.favorites);
    const cart = useSelector(state => state.cart.cartItems);

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
        })

        if (response.ok) {
            dispatch(removeFromCart(productId));
        }
    }

    return (
        <header>
            <div className="header-logo">
                <Link to="/"><img src="/img/logo.png" alt="" /></Link>
            </div>

            <div className="header-search">
                <CiSearch />
                <input type="text" placeholder="Search" />
            </div>

            <div className="header-links">
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact Us</NavLink>
                <NavLink to="/blog" className={({ isActive }) => isActive ? "active" : ""}>Blog</NavLink>
            </div>

            <div className="header-buttons">

                <Link>
                    <LuHeart size={23} onClick={toggleFav} />
                </Link>

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
                                                <img src={`http://localhost:8080/uploads/images/${product.imageUrl}`} alt={product.name} />
                                                <div className="favorite-info">{product.name}</div>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                <Link>
                    <IoCartOutline size={27} onClick={toggleCart} />
                </Link>

                {showCart && (
                    <div className="favorites-dropdown">

                        {cart.map((item) => (
                            <li key={item.id}>
                                {console.log(item)}
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
                        <button className="btn-cart" onClick={() => navigate("/cart")}>
                            Shopping Cart
                        </button>
                    </div>
                )}

                <Link to="/profile">
                    <FiUser />
                </Link>
            </div>
        </header>
    );
}

export default Header;
