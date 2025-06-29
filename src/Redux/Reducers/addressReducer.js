const initialState = {
    addresses: []
};

export default function addressReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ADDRESSES':
            return {
                ...state,
                addresses: action.payload
            };

        case 'ADD_ADDRESS':
            return {
                ...state,
                addresses: [...state.addresses, action.payload]
            };

        case 'CLEAR_ADDRESSES':
            return {
                ...state,
                addresses: []
            };

        default:
            return state;
    }
}

export const fetchAddresses = () => async (dispatch) => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        return;
    }

    try {
        const res = await fetch('http://localhost:8080/api/address/all', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await res.json();
        dispatch(setAddresses(data));
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
    }
};

export const setAddresses = (addresses) => ({
    type: 'SET_ADDRESSES',
    payload: addresses,
});

export const addAddress = (address) => ({
    type: 'ADD_ADDRESS',
    payload: address,
});

export const clearAddresses = () => ({
    type: 'CLEAR_ADDRESSES',
});

