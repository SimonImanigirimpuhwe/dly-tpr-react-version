import React, { createContext, useReducer } from 'react';
import { userReducer } from '../reducers/userReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userAuth, dispatch] = useReducer(userReducer, {loading: null, user: null, err: null });

    return ( 
        <UserContext.Provider value={{userAuth, dispatch}}>
            {props.children}
        </UserContext.Provider>
     );
}
 
export default UserContextProvider;