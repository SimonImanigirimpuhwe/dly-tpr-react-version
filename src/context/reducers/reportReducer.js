import * as constants from '../actions/types';

const initialState = {
    loading: null,
    report: [],
    error: null
};

export const reportReducer = (state={initialState}, action) => {
    switch (action.type) {
        case constants.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case constants.SET_REPORT_RESPONSE:
            return {
                ...state,
                report: action.payload
            };
        case constants.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}