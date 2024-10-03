// src/reducers/userReducer.ts
const initialState = {
    isAuthenticated: false,
    user: null,
};

interface Action {
    type: string;
    payload?: any;
}

const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;