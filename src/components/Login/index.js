import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Button, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { AuthContext } from '../../context/contexts/AuthContext';
import { SET_ERROR, SET_LOADING, SET_LOGIN } from '../../context/actions/types';
import toaster from '../../helpers/toast';
import { toast, ToastContainer, Zoom } from 'react-toastify';


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

const LoginAdmin = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false
    });
    const { dispatch }  = useContext(AuthContext)

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value})
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { password, username } = values

        const { REACT_APP_BACKEND_API_URL } = process.env;

        dispatch({type:SET_LOADING, payload: true})
        if (username === '') {
            toaster('Username is required!','warn')
            return false
        } else if (password === '') {
            toaster('Password is required', 'warn')
            return false
        } else {
            axios
                .post(`${REACT_APP_BACKEND_API_URL}/admins/login`, { username, password })
                .then((result) => {
                    dispatch({type: SET_LOADING, payload: false})
                    dispatch({type: SET_LOGIN, user: {username, password}, token: result.data.token})
                    setAdminAuthorization(result.data.token)
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
                <Typography variant="h6" component="h2" align="center" color="inherit" className={classes.title}>Login form</Typography>
                <FormControl fullWidth variant="outlined" className={classes.formContral}>
                    <InputLabel htmlFor="outlined-username-input">Username</InputLabel>
                    <OutlinedInput 
                    id="outlined-username-input"
                    type="text"
                    value={values.username}
                    onChange={handleChange("username")}
                    labelWidth={70}
                    /> 
                </FormControl> 
                <FormControl  fullWidth variant="outlined">
                    <InputLabel htmlFor="password-input">Password</InputLabel>
                    <OutlinedInput 
                    id="outlined-password-input"
                    type={ values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange("password")}
                    labelWidth={70}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    />
                </FormControl>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>Login</Button>
            </form>
        </div>
     );
}
 
export const setAdminAuthorization = (token) => {
    const AdminToken = token;
    localStorage.setItem("AdminToken", AdminToken);
    axios.defaults.headers.common["authentication"] = AdminToken;
} 
export default LoginAdmin;