import * as constants from '../actions/types';

const initialState = {
    loading: null,
    userInfo: null,
    token: null,
    error: null,
};

export const studentReducer = (state={initialState}, action) => {
    switch (action.type) {
        case constants.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case constants.SET_USER_LOGIN:
            return {
                ...state,
                userInfo: action.userInfo,
                token: action.token
            };
        case constants.SET_LOGOUT:
            return {
                ...state,
                token: null,
                loading: false,
            }
        case constants.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};



