import React, { createContext, useReducer } from 'react';
import { studentReducer } from '../reducers/studentReducer';


export const StudentContext = createContext();

const initialState = {
    loading: null,
    userInfo: null,
    token: null,
    error: null,
};
const StudentContextProvider = (props) => {
    const [studentAuth, dispatch] = useReducer(studentReducer, initialState)
    return ( 
        <StudentContext.Provider value={{studentAuth, dispatch}}>
            {props.children}
        </StudentContext.Provider>
     );
}
 
export default StudentContextProvider;