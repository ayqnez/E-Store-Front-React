import './product.css'

import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, fetchFav, removeFromFavorites, setFavorites } from '../../Redux/Reducers/favoriteReducer';

import { useEffect, useState } from "react";

import { addToCart, fetchCart, removeFromCart } from '../../Redux/Reducers/cartReducer';

function ProductDetails({ id }) {
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwtToken");

    const [selectedMemory, setSelectedMemory] = useState("");
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id])

    useEffect(() => {
        dispatch(fetchFav());
        dispatch(fetchCart());
    }, [dispatch])

    const favorites = useSelector((state) => state.favorites.favorites);
    const isFavorite = token ? favorites.some(p => p?.id === product?.id) : false;

    const cart = useSelector(state => state.cart.cartItems);
    console.log(cart)
    const isInCart = token && product && selectedMemory ? cart.some(c => c?.product?.id === product.id && c?.selectedMemory === selectedMemory) : false;


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

    async function handleAddToCart() {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            alert("You need to login");
            return;
        }

        if (!selectedMemory) {
            alert("Please select a memory option before adding to cart");
            return;
        }

        if (!product || !product.id) {
            alert("Product information is missing");
            return;
        }

        let finalPrice = product.price;
        if (selectedMemory === "256GB") finalPrice += 100;
        else if (selectedMemory === "512GB") finalPrice += 200;
        else if (selectedMemory === "1TB") finalPrice += 300;

        try {
            const response = await fetch(`http://localhost:8080/api/cart/${product.id}?quantity=1&selectedMemory=${selectedMemory}&price=${finalPrice}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                dispatch(addToCart({
                    product: product,
                    selectedMemory,
                    quantity: 1,
                    price: finalPrice,
                }));
            }
            alert("Added to cart successfully!");
        } catch (error) {
            console.error("Add to cart error:", error);
            alert("Something went wrong while adding to cart");
        }
    }

    if (!product) return null;

    return (
        <>
            <div className="product-container">

                <div className="product-image">
                    <img src={`http://localhost:8080/uploads/images/${product.largeImageUrl}`} alt={product.name} />
                </div>

                <div className="product-details">

                    <div className="product-content">
                        <h6>{product.name}</h6>
                        <p>
                            {selectedMemory ? (
                                selectedMemory === '128GB' ? (
                                    `$${product.price}`
                                ) : selectedMemory === '256GB' ? (
                                    `$${product.price + 100}`
                                ) : selectedMemory === '512GB' ? (
                                    `$${product.price + 200}`
                                ) : selectedMemory === '1TB' ? (
                                    `$${product.price + 300}`
                                ) : (
                                    'Недопустимый объём памяти'
                                )
                            ) : (
                                'Choose the memory'
                            )}
                        </p>
                    </div>

                    <div className="product-info">

                        <div className="product-memory">
                            {product.memory.map((mem) => (
                                <button
                                    key={mem}
                                    onClick={() => setSelectedMemory(mem)}
                                    className={selectedMemory === mem ? 'active' : ''}
                                >
                                    {mem}
                                </button>
                            ))}
                        </div>

                        <div className="product-characteristics">
                            <h3>Specifications</h3>
                            <div className="specs-grid">
                                <div className="spec-item">
                                    <span className="spec-name">Screen size</span>
                                    <span className="spec-value">{product.screenSize}"</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-name">CPU</span>
                                    <span className="spec-value">{product.cpu}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-name">Cores</span>
                                    <span className="spec-value">{product.numberOfCores}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-name">Main Camera</span>
                                    <span className="spec-value">{product.mainCamera} MP</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-name">Front Camera</span>
                                    <span className="spec-value">{product.frontCamera} MP</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-name">Battery</span>
                                    <span className="spec-value">{product.batteryCapacity} mAh</span>
                                </div>
                            </div>
                        </div>

                        <div className="product-text">
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <div className="product-buttons">

                        <button
                            className={`add-w ${isFavorite ? 'is-active' : ''}`}
                            onClick={handleToggleFavorite}
                        >
                            {isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </button>


                        <button
                            className={`add-c ${isInCart ? 'is-active' : ''}`}
                            onClick={handleAddToCart}
                            disabled={isInCart && selectedMemory}
                        >
                            {isInCart ? 'Already In Cart' : 'Add to Cart'}
                        </button>



                    </div>

                    <div className="delivery-info">
                        <div className="delivery-item">
                            <span className='delivery-name'>Free Delivery</span>
                            <span className='delivery-value'>1-2 day</span>
                        </div>
                        <div className="delivery-item">
                            <span className='delivery-name'>In Stock</span>
                            <span className='delivery-value'>{product.stock} Items</span>
                        </div>
                        <div className="delivery-item">
                            <span className='delivery-name'>Guaranteed</span>
                            <span className='delivery-value'>1 year</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductDetails;