import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, makeStyles, OutlinedInput, Typography } from '@material-ui/core';
import toaster from '../../helpers/toast';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import { SET_ERROR, SET_LOADING, SET_USER_SIGNUP } from '../../context/actions/types';
import { UserContext } from '../../context/contexts/UserContext';


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
        marginTop: '10vh',
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
    regNumber: '',
    school: '',
    faculty: '',
    level: '',
};
const AddUser = () => {
    const classes = useStyles()
    const [values, setValues] = useState(initialState);

    const { dispatch } = useContext(UserContext);

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const { firstName, lastName, regNumber, school, faculty, level} = values;

        const { REACT_APP_BACKEND_API_URL } = process.env;

        dispatch({type: SET_LOADING, payload: true})
        if (firstName === '') {
            toaster('Fistname is required!', 'warn')
            return false
        } else if (lastName === '') {
            toaster('Lasname is required!', 'warn')
            return false
        } else if (regNumber === '') {
            toaster('RegNumber is required!', 'warn')
            return false
        } else if (regNumber.length < 9) {
            toaster('RegNumber should be 9 chrs long', 'warn')
            return false
        }else if (school === '') {
            toaster('School is required!', 'warn')
            return false
        } else if (faculty === '') {
            toaster('Faculty is required', 'warn')
            return false
        } 
        else if (level === '') {
            toaster('Level is required', 'warn')
            return false
        } 
        else {
            axios
                .post(`${REACT_APP_BACKEND_API_URL}/users/register`, values)
                .then(result => {
                    dispatch({type: SET_LOADING, payload: false})
                    dispatch({type: SET_USER_SIGNUP, user: result.data.savedCp})
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
            <form className={classes.form} >            
                <Typography variant="h6" component="h2" align="center" color="inherit" className={classes.title}>Create User Account</Typography>
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
                    <InputLabel htmlFor="outlined-regNumber-input">RegNumber</InputLabel>
                    <OutlinedInput 
                    id="outlined-regNumber-input"
                    type="text"
                    value={values.regNumber}
                    onChange={handleChange("regNumber")}
                    labelWidth={70}
                    /> 
                </FormControl> 
                <FormControl fullWidth variant="outlined" className={classes.formContral}>
                    <InputLabel htmlFor="outlined-school-input">School</InputLabel>
                    <OutlinedInput 
                    id="outlined-school-input"
                    type="text"
                    value={values.school}
                    onChange={handleChange("school")}
                    labelWidth={70}
                    /> 
                </FormControl> 
                <FormControl fullWidth variant="outlined" className={classes.formContral}>
                    <InputLabel htmlFor="outlined-faculty-input">Faculty</InputLabel>
                    <OutlinedInput 
                    id="outlined-faculty-input"
                    type="email"
                    value={values.faculty}
                    onChange={handleChange("faculty")}
                    labelWidth={70}
                    /> 
                </FormControl> 
                <FormControl fullWidth variant="outlined" className={classes.formContral}>
                    <InputLabel htmlFor="outlined-level-input">Level</InputLabel>
                    <OutlinedInput 
                    id="outlined-level-input"
                    type="email"
                    value={values.level}
                    onChange={handleChange("level")}
                    labelWidth={70}
                    /> 
                </FormControl> 
                <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>Add User</Button>
            </form>
        </div>
     );
}
 
export default AddUser;
