import '../../Pages/Cart/cart.css';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart
} from '../../Redux/Reducers/cartReducer';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart.cartItems);

    const [promoCode, setPromoCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    async function toggleDelete(productId) {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) return;

        const response = await fetch(`http://localhost:8080/api/cart/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            dispatch(removeFromCart(productId));
        }
    }

    async function toggleIncrement(productId, currentQuantity) {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) return;

        const newQuantity = currentQuantity + 1;

        const response = await fetch(`http://localhost:8080/api/cart/${productId}?newQuantity=${newQuantity}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            dispatch(incrementQuantity(productId));
        }
    }

    async function toggleDecrement(productId, currentQuantity) {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) return;

        const newQuantity = currentQuantity - 1;
        if (newQuantity < 1) return;

        const response = await fetch(`http://localhost:8080/api/cart/${productId}?newQuantity=${newQuantity}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            dispatch(decrementQuantity(productId));
        }
    }

    function applyPromoCode() {
        if (promoCode.trim().toLowerCase() === "vasyatop") {
            setDiscountPercent(10);
        } else {
            setDiscountPercent(0);
        }
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = cart.length > 0 ? 50 : 0;
    const shipping = cart.length > 0 ? 29 : 0;

    const discount = subtotal * (discountPercent / 100);
    const total = subtotal - discount + tax + shipping;

    return (
        <div className="cart-container">
            <div className="cart-items">
                <h1 className="cart-title">Shopping Cart</h1>

                <div className="cart-products">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div className="cart-product" key={item.id}>
                                <img src={`http://localhost:8080/uploads/images/${item.product.imageUrl}`} alt={item.product.name} />

                                <div className="cart-info">
                                    <p className="cart-name">{item.product.name}</p>
                                    <p className="cart-memory">{item.selectedMemory}</p>
                                    <p className="cart-id">#{item.id}</p>
                                </div>

                                <div className="cart-quantity">
                                    <button onClick={() => toggleIncrement(item.id, item.quantity)}>+</button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => toggleDecrement(item.id, item.quantity)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                </div>

                                <p className="cart-price">${item.quantity * item.price}</p>
                                <p className='cart-delete' onClick={() => toggleDelete(item.id)}>×</p>
                            </div>
                        ))
                    ) : (
                        <p className="empty-cart-message">Your cart is empty.</p>
                    )}
                </div>
            </div>

            <div className="cart-summary">
                <h2 className="order-title">Order Summary</h2>

                <div className="summary-field">
                    <label>Discount code / Promo code</label>
                    <input
                        type="text"
                        placeholder="Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button className="apply-btn" onClick={applyPromoCode}>Apply</button>
                </div>


                <div className="summary-field">
                    <label>Your bonus card number</label>
                    <input type="text" placeholder="Enter Card Number" />
                </div>

                <div className="summary-totals">
                    <div className="summary-row">
                        <span><b>Subtotal</b></span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {discountPercent > 0 && (
                        <div className="summary-row">
                            <span>Discount ({discountPercent}%)</span>
                            <span>- ${discount.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="summary-row">
                        <span>Estimated Tax</span>
                        <span>${tax}</span>
                    </div>
                    <div className="summary-row">
                        <span>Estimated shipping & Handling</span>
                        <span>${shipping}</span>
                    </div>

                    <div className="summary-total">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    className="checkout-btn"
                    onClick={() => navigate("/address")}
                    disabled={cart.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;
