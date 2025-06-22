const initialStore = {
    user: JSON.parse(localStorage.getItem("user")) || null
};

export default function userReducer(state = initialStore, action) {
    if (action.type === 'SET_USER') {
        localStorage.setItem("user", JSON.stringify(action.payload));
        return { ...state, user: action.payload };
    }
    if (action.type === 'LOGOUT_USER') {
        localStorage.removeItem("user");
        return { ...state, user: null };
    }

    return state;
}

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
});

export const logoutUser = () => ({
    type: 'LOGOUT_USER',
});
