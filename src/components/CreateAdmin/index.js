import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import toaster from '../../helpers/toast';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import { AuthContext } from '../../context/contexts/AuthContext';
import { SET_ERROR, SET_LOADING, SET_SIGNUP } from '../../context/actions/types';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3),
        paddingTop: theme.spacing(2),
        borderRadius: 15,
        marginTop: '5vh',
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
        marginTop: 50,
        textTransform: 'capitalize',
        width: '50%',
        alignSelf: 'center',
        background: '#2196F3'
    }
}))
const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false
};
const AddAdmin = () => {
    const classes = useStyles()
    const [values, setValues] = useState(initialState);

    const { REACT_APP_BACKEND_API_URL } = process.env;

    const { dispatch } = useContext(AuthContext);

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
        const { firstName, lastName, username, email, password} = values;
        event.preventDefault()
        dispatch({type: SET_LOADING, payload: true})
        if (firstName === '') {
            toaster('Fistname is required!', 'warn')
            return false
        } else if (lastName === '') {
            toaster('Lasname is required!', 'warn')
            return false
        } else if (username === '') {
            toaster('Username is required!', 'warn')
            return false
        } else if (username.length < 5) {
            toaster('Username should be at least 5 chrs long', 'warn')
            return false
        }else if (email === '') {
            toaster('Email is required!', 'warn')
            return false
        } else if (password === '') {
            toaster('Password is required!', 'warn')
            return false
        } else if (password.length < 8) {
            toaster('Password should be at least 8 chrs long', 'warn')
            return false
        } 
        else {
            axios
                .post(`${REACT_APP_BACKEND_API_URL}/admins/signup`, { firstName, lastName, username, email, password})
                .then(result => {
                    dispatch({type: SET_LOADING, payload: false})
                    dispatch({type: SET_SIGNUP, user: result.data.body})
                    toaster(result.data.msg, 'success')
                    setValues(initialState)
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
            <form className={classes.form} onSubmit={handleSubmit}>            
                <Typography variant="h6" component="h2" align="center" color="inherit" className={classes.title}>Create Admin</Typography>
                <FormControl fullWidth autoClose variant="outlined" className={classes.formContral}>
                    <InputLabel htmlFor="outlined-firstname-input">First Name</InputLabel>
                    <OutlinedInput 
                    id="outlined-firstname-input"
                    type="text"
                    value={values.firstName}
                    onChange={handleChange("firstName")}
                    labelWidth={70}
                    /> 
                </FormControl> 
                <FormControl fullWidth variant="outlined" className={classes.formContral}>
                    <InputLabel htmlFor="outlined-lastname-input">Last Name</InputLabel>
                    <OutlinedInput 
                    id="outlined-lastname-input"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange("lastName")}
                    labelWidth={70}
                    /> 
                </FormControl> 
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
                <FormControl fullWidth variant="outlined" className={classes.formContral}>
                    <InputLabel htmlFor="outlined-email-input">Email</InputLabel>
                    <OutlinedInput 
                    id="outlined-email-input"
                    type="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    labelWidth={70}
                    placeholder="eg. johndoe@gmail.com"
                    endAdornment={<InputAdornment position="end">{'@'}</InputAdornment>}
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
                <Button type="submit" variant="contained" color="primary" className={classes.button}>Create Admin</Button>
            </form>
        </div>
     );
}
 
export default AddAdmin;
