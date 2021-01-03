import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import toaster from '../../helpers/toast';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import StudentCard from './StudentCard';
import { StudentContext } from '../../context/contexts/StudentContext';
import { SET_ERROR, SET_LOADING, SET_USER_INFO } from '../../context/actions/types';


const UserPage = () => {
    const { dispatch } = useContext(StudentContext)
    const { REACT_APP_BACKEND_API_URL } = process.env;
    const token = localStorage.getItem("AdminToken")
    useEffect(() => {
        dispatch({type: SET_LOADING, payload: true})
        axios.get(`${REACT_APP_BACKEND_API_URL}/users/all`, {
            headers: {
                'authentication': token
            }
        })
        .then((result) => {
            dispatch({type: SET_LOADING, payload: false})
            dispatch({type:SET_USER_INFO, payload: result.data})
            toaster(result.data.msg, 'success')
            console.log(result)
        })
        .catch((err) => {
            dispatch({type: SET_LOADING, payload: false})
            dispatch({type: SET_ERROR, payload: err.response.data.error})
            toaster(err.response.statusText, 'error')
        })
    },[dispatch])
    return ( 
        <>
        <ToastContainer 
            draggable={true} 
            transition={Zoom} 
            autoClose={3000} 
            position={toast.POSITION.TOP_CENTER}
        />
        <StudentCard />
        </>
     );
}
 
export default UserPage;