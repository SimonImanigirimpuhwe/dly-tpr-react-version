import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [auth, dispatch] = useReducer(authReducer, {
        loading: null,
        token: null,
        user: '',
        error: null
    })
    return ( 
        <AuthContext.Provider value={{auth, dispatch}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;