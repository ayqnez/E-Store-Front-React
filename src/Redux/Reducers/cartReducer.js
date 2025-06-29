const initialStore = {
    cartItems: []
};

export default function cartReducer(state = initialStore, action) {
    if (action.type === 'SET_TO_CART') {
        return {
            ...state,
            cartItems: action.payload
        };
    }

    if (action.type === 'ADD_TO_CART') {
        const existing = state.cartItems.find(item =>
            item.id === action.payload.id
        );

        if (existing) {
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                )
            };
        }

        return {
            ...state,
            cartItems: [...state.cartItems, action.payload]
        };
    }

    if (action.type === 'REMOVE_FROM_CART') {
        return {
            ...state,
            cartItems: state.cartItems.filter(item => {
                const itemId = item.id || item.product?.id;
                return itemId !== action.payload.id;
            })
        };
    }


    if (action.type === 'INCREMENT_QUANTITY') {
        return {
            ...state,
            cartItems: state.cartItems.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        };
    }

    if (action.type === 'DECREMENT_QUANTITY') {
        return {
            ...state,
            cartItems: state.cartItems
                .map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        };
    }

    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            cartItems: []
        };
    }

    return state;
}

export const fetchCart = () => async (dispatch) => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        return;
    }

    try {
        const res = await fetch('http://localhost:8080/api/cart', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await res.json();
        dispatch(setToCart(data));
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
    }
};


export const setToCart = (items) => ({
    type: 'SET_TO_CART',
    payload: items,
});


export const addToCart = (item) => ({
    type: 'ADD_TO_CART',
    payload: item,
});

export const incrementQuantity = (id) => ({
    type: 'INCREMENT_QUANTITY',
    payload: { id },
});

export const decrementQuantity = (id) => ({
    type: 'DECREMENT_QUANTITY',
    payload: { id },
});

export const removeFromCart = (id) => ({
    type: 'REMOVE_FROM_CART',
    payload: { id }
});

export const clearCart = () => ({
    type: 'CLEAR_CART'
});