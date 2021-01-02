import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Button, CssBaseline, FormControl, InputLabel, makeStyles, OutlinedInput, Typography } from '@material-ui/core';
import { SET_ERROR, SET_LOADING, SET_USER_LOGIN } from '../../context/actions/types';
import toaster from '../../helpers/toast';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import { StudentContext } from '../../context/contexts/StudentContext';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#2196F3',
        height: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3),
        paddingTop: theme.spacing(2),
        background: '#fff',
        borderRadius: 15,
        marginTop: '20vh',
        width: 500,
        height: 300
    },
    formContral: {
        marginBottom:theme.spacing(2),
    },
    title: {
        fontFamily: `'Poppins', sans-serif;`,
        fontWeight: 400,
        textTransform: 'capitalize',
        paddingBottom: theme.spacing(1.2)
    },
    button: {
        marginTop: 50
    }
}))

const LoginForm = () => {
    const classes = useStyles();
    const [values, setValues] = useState({regNumber: ''});
    const { dispatch }  = useContext(StudentContext)

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { regNumber } = values

        const { REACT_APP_BACKEND_API_URL } = process.env;

        dispatch({type:SET_LOADING, payload: true})
        if (regNumber === '') {
            toaster('RegNumber is required!','warn')
            return false
        } else {
            axios
                .post(`${REACT_APP_BACKEND_API_URL}/users/login`, {regNumber})
                .then((result) => {
                    dispatch({type: SET_LOADING, payload: false})
                    dispatch({type: SET_USER_LOGIN, user: {regNumber}, token: result.data.token})
                    setUserAuthorization(result.data.token)
                    toaster(result.data.msg)
                })
                .catch((err) => {
                    dispatch({type: SET_LOADING, payload:false})
                    dispatch({type: SET_ERROR, payload: err.response.data.error})
                    toaster(err.response.data.error, 'error')
                })
        }
    }

    return ( 
        <div className={classes.root}>
            <ToastContainer 
            draggable={true} 
            transition={Zoom} 
            autoClose={3000} 
            position={toast.POSITION.TOP_CENTER}
            />
            <CssBaseline />
            <form className={classes.form} >
                <Typography variant="h6" component="h2" align="center" color="inherit" className={classes.title}>User Login Form</Typography>
                <FormControl fullWidth variant="outlined" className={classes.formContral}>
                    <InputLabel htmlFor="outlined-regNumber-input">Registration Number</InputLabel>
                    <OutlinedInput 
                    id="outlined-regNumber-input"
                    type="text"
                    value={values.regNumber}
                    onChange={handleChange("regNumber")}
                    labelWidth={70}
                    /> 
                </FormControl> 
                <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>Login</Button>
            </form>
        </div>
     );
}
 
export const setUserAuthorization = (token) => {
    const UserToken = token;
    localStorage.setItem("UserToken", UserToken);
    axios.defaults.headers.common["auth-token"] = UserToken;
} 
export default LoginForm;