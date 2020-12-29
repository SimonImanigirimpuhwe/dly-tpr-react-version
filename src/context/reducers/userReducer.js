import React from 'react';
import * as constants from '../actions/types';

const initialState = {
    loading: null,
    user: null,
    err: null
};

export const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case constants.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case constants.SET_USER_SIGNUP:
            return {
                ...state,
                user: action.payload
            };
        case constants.SET_ERROR:
            return {
                ...state,
                err: action.payload
            }
    }
}