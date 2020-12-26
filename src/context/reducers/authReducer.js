import * as constants from '../actions/types';

const initialState = {
    loading: null,
    token: null,
    user: null,
    error: null
};

export const authReducer = (state={initialState}, action) => {
    switch (action.type) {
        case constants.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case constants.SET_LOGIN:
            return {
                ...state,
                token: action.token,
                user: action.user
            };
        case constants.SET_LOGOUT:
            return {
                ...state,
                token: null,
                user: null
            };
        case constants.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state
    }
}