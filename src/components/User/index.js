import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography'; 
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar' ;
import Toolbar from '@material-ui/core/Toolbar'; 
import Button from '@material-ui/core/Button'; 
import TextField from '@material-ui/core/TextField';
import LoginForm from '../userLogin';
import logo from '../../assets/images/logo.png';
import toaster from '../../helpers/toast';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import { StudentContext } from '../../context/contexts/StudentContext';
import { ReportContext } from '../../context/contexts/ReportContext';
import { SET_ERROR, SET_LOADING, SET_LOGOUT, SET_REPORT_RESPONSE } from '../../context/actions/types';
import Progress from '../Progress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    drawerHeader: {
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    formContral: {
        marginBottom: theme.spacing(2)
    },
    main: {
        marginRight: '10%',
        marginLeft: '10%',
        marginBottom: '15vh'
    },
    paragraph: {
        color: theme.palette.grey,
        fontWeight: 800,
        fontFamily: `'Poppins', sans-serif;`,
        textAlign: 'center',
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(4)
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    upForm: {
        width: '50%',
        alignSelf: 'center',
        '@media (max-width: 600px)': {
            width: '70%'
        }
    },
    button: {
        marginTop: 50,
        textTransform: 'capitalize',
        width: '50%',
        alignSelf: 'center',
        background: '#2196F3'
    },
    textField: {
        width: '100%',
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    progess: {
        marginLeft:'50%'
    }
}))

const initialState = {
    school: '',
    faculty: '',
    level: '',
    studentsNumber: '',
    days: '',
    date: '',
    hours: '',
    module: '',
    component: '',
    activity: '',
    lecturer: '',
    observation: '',
}
const User = () => {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState(initialState);
    const {reportInfo: { loading }, dispatch } = useContext(ReportContext);
    const studentContext = useContext(StudentContext);
    const { REACT_APP_BACKEND_API_URL } = process.env

    const token = localStorage.getItem('UserToken');

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value})
    }

    const handleLogout = () => {
        studentContext.dispatch({type: SET_LOGOUT})
        toaster('Logged out successfully', 'success');
        setTimeout(() => {
            localStorage.removeItem("UserToken");
            history.push('/')
        },3500)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const {
            school,
            faculty,
            level,
            studentsNumber,
            days,
            date,
            hours,
            module,
            component,
            activity,
            lecturer,
            observation,

        } = values;
        dispatch({type: SET_LOADING, payload: true})
        if (school === '') {
            toaster('School is required!', 'warn')
            dispatch({type: SET_LOADING, payload: false})
            return false;
        } else if (faculty === '') {
            toaster('Faculty is required!', 'warn')
            dispatch({type: SET_LOADING, payload: false})
            return false
        } else if (level === '') {
            toaster('Level is required!', 'warn') 
            dispatch({type: SET_LOADING, payload: false})
            return false
        } else if (studentsNumber === '') {
            toaster('StudentsNumber is required!', 'warn')
            dispatch({type: SET_LOADING, payload: false})
            return false
        } else if (days === '') {
            toaster('Day is required!', 'warn')
            dispatch({type: SET_LOADING, payload: false})
            return false
        } else if (date === '') {
            toaster('Date is required!', 'warn')
            dispatch({type: SET_LOADING, payload: false})
            return false
        } else if (hours === '') {
            toaster('Hour is required!', 'warn')
            dispatch({type: SET_LOADING, payload: false})
            return false
        } else if (module === '') {
            toaster('Module is required!', 'warn')
            dispatch({type: SET_LOADING, payload: false})
            return false
        } else if (component === '') {
            toaster('Component is required!', 'warn')
            dispatch({type: SET_LOADING, payload: false})
            return false
        } else if (activity === '') {
            toaster('Activity is required!', 'warn')
            dispatch({type: SET_LOADING, payload: false})
            return false
        } else if (lecturer === '') {
            toaster('Lecturer is required!', 'warn')
            dispatch({type: SET_LOADING, payload: false})
            return false
        } else if (observation === '') {
            toaster('Observation is required!', 'warn')
            dispatch({type: SET_LOADING, payload: false})
            return false
        } else {
            axios.post(`${REACT_APP_BACKEND_API_URL}/report`, values, {
                headers: { 'auth-token': token }
            })
            .then((result) => {
                dispatch({type: SET_LOADING, payload: false})
                dispatch({type: SET_REPORT_RESPONSE, payload:result.data})
                toaster(result.data.msg, 'success')
                setValues(initialState)
            })
            .catch((err) => {
                dispatch({type: SET_LOADING, payload: false})
                if (err.request) {
                    dispatch({type: SET_ERROR, payload: err.message})
                    toaster(err.message, 'error')
                } else {
                    dispatch({type: SET_ERROR, payload: err.response.data.error})
                    toaster(err.response.data.error, 'error')
                }
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
            <AppBar position="fixed" style={{background: '#2196F3',}}>
                <Toolbar className={classes.toolbar} >    
                    <img src={logo} alt="logo" className={classes.logo}/>
                    <div style={{marginLeft: 'auto'}}>
                        <Button style={{color: 'white',}} onClick={handleLogout}>
                            <Typography variant="subtitle1" color="inherit" className={classes.logout}>
                                Logout
                            </Typography>
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <main className={classes.main}> 
                <div className={classes.drawerHeader} />
                <Typography variant="h4" component="h2" style={{paddingTop: 50, paddingBottom: 50}}>CENTER FOR TEACHING AND LEARNING ENHANCEMENT</Typography>
                <Typography variant="h5" component="p" style={{padding: 20, textAlign: 'center'}}>ACADEMIC YEAR: 2020-2021</Typography>
                {loading ? <div className={classes.progess}><Progress /></div> : (
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.upForm}>
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
                        type="text"
                        value={values.faculty}
                        onChange={handleChange("faculty")}
                        labelWidth={70}
                        /> 
                    </FormControl> 
                    <FormControl fullWidth variant="outlined" className={classes.formContral}>
                        <InputLabel htmlFor="outlined-level-input">Level</InputLabel>
                        <OutlinedInput 
                        id="outlined-level-input"
                        type="text"
                        value={values.level}
                        onChange={handleChange("level")}
                        labelWidth={70}
                        /> 
                    </FormControl> 
                    <FormControl fullWidth variant="outlined" className={classes.formContral}>
                        <InputLabel htmlFor="outlined-studentsNumber-input">Student Number</InputLabel>
                        <OutlinedInput 
                        id="outlined-studentsNumber-input"
                        type="text"
                        value={values.studentsNumber}
                        onChange={handleChange("studentsNumber")}
                        labelWidth={100}
                        /> 
                    </FormControl> 
                    </div>
                    <Typography variant="subtitle1" component="p" className={classes.paragraph}>Daily Teaching Progress Report</Typography>
                    <div className={classes.inputWrapper}>
                    <TextField 
                        id="startd-basic"
                        variant="standard"
                        label="Days"
                        onChange={handleChange("days")}
                        value={values.days}
                        className={classes.textField}
                    />
                    <TextField 
                        id="date"
                        type="date"
                        defaultValue=""
                        variant="standard"
                        label="Date"
                        InputLabelProps={{
                            shrink: true
                        }}
                        onChange={handleChange("date")}
                        value={values.date}
                        className={classes.textField}
                    />
                    </div>
                    <div className={classes.inputWrapper}>
                    <TextField 
                        id="startd-basic"
                        variant="standard"
                        type="time"
                        label="Hour"
                        onChange={handleChange("hours")}
                        value={values.hours}
                        className={classes.textField}
                    />
                    <TextField 
                        id="startd-basic"
                        variant="standard"
                        label="Module"
                        onChange={handleChange("module")}
                        value={values.module}
                        className={classes.textField}
                    />
                    </div>
                    <dv className={classes.inputWrapper}>
                    <TextField 
                        id="startd-basic"
                        variant="standard"
                        label="Component"
                        onChange={handleChange("component")}
                        value={values.component}
                        className={classes.textField}
                    />
                    <TextField 
                        id="startd-basic"
                        variant="standard"
                        label="Activity"
                        onChange={handleChange("activity")}
                        value={values.activity}
                        className={classes.textField}
                    />
                    </dv>
                    <div className={classes.inputWrapper}>
                    <TextField 
                        id="startd-basic"
                        variant="standard"
                        label="Lecturer"
                        onChange={handleChange("lecturer")}
                        value={values.lecturer}
                        className={classes.textField}
                    />
                    <TextField 
                        id="startd-basic"
                        variant="standard"
                        label="Observation"
                        onChange={handleChange("observation")}
                        value={values.observation}
                        className={classes.textField}
                    />
                    </div>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>Submit</Button>
                </form>
                )}
            </main>
        </div>
     );
}
 


export default () => {
    const { studentAuth } = useContext(StudentContext);
    const { token } = studentAuth;
    const userToken = token || localStorage.getItem("UserToken");
    if (userToken) {
        return <User />
    }
    return <LoginForm />
};


