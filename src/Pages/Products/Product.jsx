import './products.css';

import { Link, useNavigate } from 'react-router-dom';
import { GoHeartFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { addToFavorites, fetchFav, removeFromFavorites, setFavorites } from '../../Redux/Reducers/favoriteReducer';

function Product({ product }) {
    const token = localStorage.getItem('jwtToken');
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favorites = useSelector((state) => state.favorites.favorites)
    const isFavorite = token ? favorites.some(p => p.id === product.id) : false;

    useEffect(() => {
        dispatch(fetchFav())
    }, [dispatch])

    async function handleToggleFavorite() {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            alert("You need to login");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/favorites/${product.id}?favorite=${!isFavorite}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                if (isFavorite) {
                    dispatch(removeFromFavorites(product.id));
                } else {
                    dispatch(addToFavorites(product));
                }
            } else {
                console.error("Ошибка при переключении избранного:", response.status);
            }
        } catch (error) {
            console.error("Сетевая ошибка:", error);
        }
    }

    return (
        <div className="product-card">
            <div
                className={`favorite-icon ${isFavorite ? 'isActive' : ''}`}
                onClick={handleToggleFavorite}
                style={{ cursor: 'pointer' }}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <GoHeartFill size={24} />
            </div>

            <Link to={`/product/${product.id}`}>
                <img src={`http://localhost:8080/uploads/images/${product.imageUrl}`} alt={product.name} />
            </Link>

            <div className="product-title">{product.name}</div>
            <div className="product-price">${product.price}</div>

            <button className="buy-button" onClick={() => navigate(`/product/${product.id}`)}>Buy Now</button>
        </div>
    );
}

export default Product;
