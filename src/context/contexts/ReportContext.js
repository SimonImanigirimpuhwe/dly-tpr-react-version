import React, { createContext, useReducer } from 'react';
import { reportReducer } from '../reducers/reportReducer';

export const ReportContext = createContext();

const ReportContextProvider = (props) => {
    const [reportInfo, dispatch] = useReducer(reportReducer, {loading: null, report: {}, error: null})
    return ( 
        <ReportContext.Provider value={{reportInfo, dispatch}}>
            {props.children}
        </ReportContext.Provider>
     );
}
 
export default ReportContextProvider;