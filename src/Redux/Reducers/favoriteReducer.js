const initialStore = {
    favorites: []
};

export default function favoriteReducer(state = initialStore, action) {
    if (action.type === 'SET_FAVORITES') {
        return { ...state, favorites: action.payload };
    }
    if (action.type === 'ADD_TO_FAVORITES') {
        return { ...state, favorites: [...state.favorites, action.payload] };
    }
    if (action.type === 'REMOVE_FROM_FAVORITES') {
        return {
            ...state,
            favorites: state.favorites.filter(item => item.id !== action.payload)
        };
    }
    return state;
}


export const fetchFav = () => async (dispatch) => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        return;
    }

    try {
        const res = await fetch('http://localhost:8080/api/favorites', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
        });
        const data = await res.json();
        dispatch(setFavorites(data));
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
    }
};


export const setFavorites = (items) => ({
    type: 'SET_FAVORITES',
    payload: items,
});

export const addToFavorites = (item) => ({
    type: 'ADD_TO_FAVORITES',
    payload: item,
});

export const removeFromFavorites = (id) => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: id,
});


