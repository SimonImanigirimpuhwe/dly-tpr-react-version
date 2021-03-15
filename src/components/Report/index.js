import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ReportCard from './ReportCard';
import Typography from '@material-ui/core/Typography';
import SearchBox from '../SearchBox';
import toaster from '../../helpers/toast';
import { toast, ToastContainer, Zoom } from 'react-toastify';

const Report = ({token}) => {
    const [reportResult, setReportResult] = useState([])

    const { REACT_APP_BACKEND_API_URL } = process.env;

    const HandleSearch = () => {
        //do some implementations
    };

   useEffect(() => {
    axios
    .get(`${REACT_APP_BACKEND_API_URL}/report/all`, {headers:{'authentication': token}})
    .then(result => { 
        setReportResult(result.data)
    })
    .catch(err => {
        toaster(err.response.statusText, 'error') 
    })
   },[])

    return ( 
        <>
        <ToastContainer 
        draggable={true} 
        transition={Zoom} 
        autoClose={3000} 
        position={toast.POSITION.TOP_CENTER}
        />
        <Typography 
        style={{
            textAlign: 'center', 
            textTransform: 'uppercase',
            fontWeight: 800, 
            fontFamily: `'Poppins', sans-serif;`,
            padding: 30
        }}>All Submitted Reports</Typography>
        <SearchBox HandleSearch={HandleSearch} prop={'Search report'} value={''}/>
        <ReportCard reportResult={reportResult}/>
        </>
    );
}
 
export default Report;



