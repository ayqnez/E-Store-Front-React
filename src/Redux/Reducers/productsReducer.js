const initialStore = {
    products: []
};

export default function productsReducer(state = initialStore, action) {
    if (action.type === 'SET_PRODUCTS') {
        return { ...state, products: action.payload };
    }
    if (action.type === 'ADD_PRODUCT') {
        return { ...state, products: [...state.products, action.payload] };
    }
    return state;
}

export const fetchProducts = () => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:8080/api/products');
        const data = await res.json();
        dispatch(setProducts(data));
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
    }
};


export const setProducts = (products) => ({
    type: 'SET_PRODUCTS',
    payload: products,
});

export const addProduct = (product) => ({
    type: 'ADD_PRODUCT',
    payload: product,
});
