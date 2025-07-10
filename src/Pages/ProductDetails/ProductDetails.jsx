import './product.css'

import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, fetchFav, removeFromFavorites } from '../../Redux/Reducers/favoriteReducer';

import { useEffect, useState } from "react";

import { addToCart, fetchCart } from '../../Redux/Reducers/cartReducer';
import Breadcrumps from '../../Components/Breadcrumbs';

function ProductDetails({ id }) {
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwtToken");

    const [product, setProduct] = useState(null);
    const [selectedMemory, setSelectedMemory] = useState("");

    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id]);

    useEffect(() => {
        dispatch(fetchFav());
        dispatch(fetchCart());
    }, [dispatch]);

    const favorites = useSelector(state => state.favorites.favorites);
    const isFavorite = token ? favorites.some(p => p?.id === product?.id) : false;

    const cart = useSelector(state => state.cart.cartItems);

    const isStock = product?.stock > 0;
    const isPhone = product?.category === 'phones';
    const isWatch = product?.category === 'watches';
    const isHeadphones = product?.category === 'headphones';

    const isInCart = token && product
        ? isPhone
            ? cart.some(c => c?.product?.id === product.id && c?.selectedMemory === selectedMemory)
            : cart.some(c => c?.product?.id === product.id)
        : false;

    async function handleToggleFavorite() {
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
                console.error("Error toggling favorite:", response.status);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }

    async function handleAddToCart() {
        if (!token) {
            alert("You need to login");
            return;
        }

        if (isPhone && !selectedMemory) {
            alert("Please select a memory option before adding to cart");
            return;
        }

        if (!product || !product.id) {
            alert("Product info missing");
            return;
        }

        let finalPrice = product.price;
        if (isPhone) {
            if (selectedMemory === "256GB") finalPrice += 100;
            else if (selectedMemory === "512GB") finalPrice += 200;
            else if (selectedMemory === "1TB") finalPrice += 300;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/cart/${product.id}?quantity=1&selectedMemory=${selectedMemory}&price=${finalPrice}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                dispatch(addToCart({
                    product,
                    selectedMemory,
                    quantity: 1,
                    price: finalPrice,
                }));
                alert("Added to cart!");
            }
        } catch (error) {
            console.error("Add to cart error:", error);
            alert("Failed to add to cart");
        }
    }

    if (!product) return null;

    return (
        <>
            <Breadcrumps category={product.category} productTitle={product.name} />

            <div className="product-container">

                <div className="product-image">
                    <img src={`http://localhost:8080/uploads/images/${product.largeImageUrl}`} alt={product.name} />
                </div>

                <div className="product-details">
                    <div className="product-content">
                        <h6>{product.name}</h6>
                        <p>
                            {isPhone ? (
                                selectedMemory ? (
                                    selectedMemory === '128GB' ? `$${product.price}` :
                                        selectedMemory === '256GB' ? `$${product.price + 100}` :
                                            selectedMemory === '512GB' ? `$${product.price + 200}` :
                                                selectedMemory === '1TB' ? `$${product.price + 300}` :
                                                    'Invalid memory'
                                ) : 'Choose the memory'
                            ) : `$${product.price}`}
                        </p>
                    </div>

                    {isPhone && product.memory && (
                        <div className="product-memory">
                            {product.memory.map(mem => (
                                <button
                                    key={mem}
                                    onClick={() => setSelectedMemory(mem)}
                                    className={selectedMemory === mem ? 'active' : ''}
                                >
                                    {mem}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="product-characteristics">
                        <h3>Specifications</h3>
                        <div className="specs-grid">
                            {isPhone && (
                                <>
                                    <div className="spec-item"><span>Screen size</span><span>{product.screenSize}"</span></div>
                                    <div className="spec-item"><span>CPU</span><span>{product.cpu}</span></div>
                                    <div className="spec-item"><span>Cores</span><span>{product.numberOfCores}</span></div>
                                    <div className="spec-item"><span>Main Camera</span><span>{product.mainCamera} MP</span></div>
                                    <div className="spec-item"><span>Front Camera</span><span>{product.frontCamera} MP</span></div>
                                    <div className="spec-item"><span>Battery</span><span>{product.batteryCapacity} mAh</span></div>
                                </>
                            )}
                            {isWatch && (
                                <>
                                    <div className="spec-item"><span>Case size</span><span>{product.caseSize} mm</span></div>
                                    <div className="spec-item"><span>CPU</span><span>{product.cpu}</span></div>
                                    <div className="spec-item"><span>Strap Material</span><span>{product.strapMaterial}</span></div>
                                    <div className="spec-item"><span>gpsEnabled</span><span>{product.gpsEnabled ? 'True' : 'False'}</span></div>
                                    <div className="spec-item"><span>Water Resistance</span><span>{product.waterResistant ? 'True' : 'False'}</span></div>
                                    <div className="spec-item"><span>Battery Life</span><span>{product.batteryLife} Hours</span></div>
                                </>
                            )}
                            {isHeadphones && (
                                <>
                                    <div className="spec-item"><span>Headphone Type</span><span>{product.headphoneType}</span></div>
                                    <div className="spec-item"><span>Connection Type</span><span>{product.connectionType}</span></div>
                                    <div className="spec-item"><span>Noise Cancellation</span><span>{product.noiseCancellation ? 'True' : 'False'}</span></div>
                                    <div className="spec-item"><span>Waterproof Rating</span><span>{product.waterproofRating}</span></div>
                                    <div className="spec-item"><span>Microphone</span><span>{product.microphone}</span></div>
                                    <div className="spec-item"><span>Battery Life</span><span>{product.batteryLife} Hours</span></div>
                                </>
                            )}

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
                            className={`add-c ${isInCart ? 'is-active' : ''} ${!isStock ? 'out-of-stock' : ''}`}
                            onClick={handleAddToCart}
                            disabled={!isStock}
                        >
                            {isInCart ? 'Already In Cart' : isStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>

                    <div className="delivery-info">
                        <div className="delivery-item"><span>Free Delivery</span><span>1–2 days</span></div>
                        <div className="delivery-item"><span>In Stock</span><span>{product.stock} items</span></div>
                        <div className="delivery-item"><span>Guaranteed</span><span>1 year</span></div>
                    </div>
                </div>
            </div>

            <div className="product-info">
                <div className="product-info__content">
                    <h1>Details</h1>

                    <p>{product.description}</p>

                    {showDetails && (
                        <>
                            <div className="product-content__title">
                                <h1>Screen</h1>
                            </div>

                            <div className="product-content__specs">
                                <div className="scep">
                                    <span>Screen diagonal</span><span>{product.screenSize}"</span>
                                </div>
                                <div className="scep">
                                    <span>The screen resolution</span><span>{product.screenResolution}</span>
                                </div>
                                <div className="scep">
                                    <span>The screen refresh rate</span><span>{product.screenRefreshRate} Hz</span>
                                </div>
                                <div className="scep">
                                    <span>The pixel density</span><span>{product.pixelDensity} ppi</span>
                                </div>
                                <div className="scep">
                                    <span>Screen type</span><span>{product.screenType}</span>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="btn-wrapper">
                        <button onClick={() => setShowDetails(!showDetails)} className='btn-details'>
                            {showDetails ? 'Hide details' : 'View more'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
