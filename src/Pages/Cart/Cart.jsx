import '../../Pages/Cart/cart.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart
} from '../../Redux/Reducers/cartReducer';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cartItems);

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

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = 50;
    const shipping = 29;
    const total = subtotal + tax + shipping;

    return (
        <div className="cart-container">
            <div className="cart-items">
                <h1 className="cart-title">Shopping Cart</h1>

                <div className="cart-products">
                    {cart.map((item) => (
                        <div className="cart-product" key={item.id}>
                            {console.log(item)}
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
                    ))}
                </div>
            </div>

            <div className="cart-summary">
                <h2 className="order-title">Order Summary</h2>

                <div className="summary-field">
                    <label>Discount code / Promo code</label>
                    <input type="text" placeholder="Code" />
                </div>

                <div className="summary-field">
                    <label>Your bonus card number</label>
                    <input type="text" placeholder="Enter Card Number" />
                </div>

                <div className="summary-totals">
                    <div className="summary-row">
                        <span><b>Subtotal</b></span>
                        <span>${subtotal}</span>
                    </div>
                    <div className="summary-row">
                        <span>Estimated Tax</span>
                        <span>$50</span>
                    </div>
                    <div className="summary-row">
                        <span>Estimated shipping & Handling</span>
                        <span>$29</span>
                    </div>
                    <div className="summary-total">
                        <span>Total:</span>
                        <span>${total}</span>
                    </div>
                </div>

                <button className="checkout-btn">Checkout</button>
            </div>
        </div>
    );
}

export default Cart;
