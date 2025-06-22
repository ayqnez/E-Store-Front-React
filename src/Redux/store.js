import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userReducer";
import productsReducer from "./Reducers/productsReducer";
import favoriteReducer from "./Reducers/favoriteReducer";
import cartReducer from "./Reducers/cartReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        favorites: favoriteReducer,
        cart: cartReducer
    }
})

export default store;