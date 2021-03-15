import React, { useContext, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { StudentContext } from '../../context/contexts/StudentContext';
import toaster from '../../helpers/toast';
import Axios from 'axios';
import { SET_ERROR, SET_LOADING, SET_USER_INFO } from '../../context/actions/types';
import UpdateDialogSlide from '../Dialog';
import { Height } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 30,
        marginLeft: '25%',
        marginRight: '25%',
        padding: theme.spacing(4),
        paddingTop: theme.spacing(1.4),
        '@media (max-width: 600px)': {
            marginLeft: '5%',
            marginRight: '5%',
            padding: theme.spacing(1.4)
        }
    },
    span: {
        fontFamily: `'Poppins', sans-serif;`,
        fontSize: 20,
        fontWeight: 800,
        paddingRight: theme.spacing(1.5)
    },
    paragraph: {
        lineHeight: 2,
        fontSize: 20
    },
    action: {
        justifyContent: 'space-around',
        marginTop: theme.spacing(3)
    },
    actionBtn: {
        width: 50,
        Height: 50,
        borderRadius: 100
    },
    icon: {
        margin: theme.spacing(1.02)
    },
    slider: {
        marginTop: 50,
        
    },
    formContral: {
        marginBottom: theme.spacing(2)
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: theme.spacing(6),
        paddingBottom: 20
    },
    upForm: {
        width: '70%',
        alignSelf: 'center',
        '@media (max-width: 600px)': {
            width: '80%'
        }
    },
    button: {
        marginTop: 50,
        textTransform: 'capitalize',
        width: '50%',
        alignSelf: 'center',
        background: '#2196F3'
    },
}));

const token = localStorage.getItem("AdminToken")
const StudentCard = () => {
    const classes = useStyles()
    const {studentAuth, dispatch } = useContext(StudentContext);
    const { users } = studentAuth;
    const [newUsers, setNewUsers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useState({
        school: '',
        faculty: '',
        level: '',
    })
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        setNewUsers(users.map((user) => {
            const newObj = Object.assign(user, {open: false})
            return newObj
        }))
    },[users])


    const handleExpandClick = (id) => {
        const data = users.filter(user => user._id === id)
        const { address: {school, faculty, level} } = data[0];
        setOpen(!open)
        setUserId(id)
        setValues({
            school,
            faculty,
            level
        })
      };
    const { REACT_APP_BACKEND_API_URL } = process.env;

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value})
    }

    const handleSubmit = (id) =>  (event) => {
        event.preventDefault()
        Axios.put(`${REACT_APP_BACKEND_API_URL}/users/edit/${id}`, values, {
            headers: {
                'authentication': token
            }
        })
        .then((res) => {
            dispatch({type: SET_LOADING, payload: false})
            const filteredUsers =  users.filter(user => user._id !== res.data.newUser._id)
            dispatch({type: SET_USER_INFO, payload: [...filteredUsers, res.data.newUser]})
            setValues({ school: '', faculty: '', level: ''})
            setOpen(false)
            toaster(res.data.msg, 'success');
        })
        .catch((err) => {
            dispatch({type: SET_LOADING, payload: false})
            if (err.request) {
                toaster(err.message,  'error');
            }
            dispatch({type: SET_ERROR, payload: err.response.data.error})
            toaster(err.response.data, 'error');
        })
    }
    const handleDelete = (id) => {
        Axios.delete(`${REACT_APP_BACKEND_API_URL}/users/abolish/${id}`, {
            headers: {
                'authentication': token
            }
        })
        .then((result) => {
            toaster(`CP with regNumber ${result.data.regNumber} was deleted successfully`, 'success')
            setTimeout(() => {
                dispatch({type: SET_USER_INFO, payload: users.filter((user) => user._id != id)})
            },3500)
        })
        .catch((err) => {
            toaster(err.request, 'error')
        })
    }

    return ( 
        <>
        <Typography 
            style={{
                textAlign: 'center', 
                textTransform: 'uppercase',
                fontWeight: 800, 
                fontFamily: `'Poppins', sans-serif;`,
                padding: 30
            }}>All Class Representatives
        </Typography>
        {users.map((user) => (
            <>
            <Card key={user._id} className={classes.card} elevation={6}>
                <CardContent style={{alignSelf: 'center'}}>
                    <Typography className={classes.paragraph}><span className={classes.span}>Firstname:</span>{user.firstName}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Lastname:</span>{user.lastName}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>RegNumber:</span>{user.regNumber}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>School:</span>{user.address.school}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Faculty:</span>{user.address.faculty}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Level:</span>{user.address.level}</Typography>
                </CardContent>
                <CardActions className={classes.action}>
                    <Fab aria-label="Edit" variant="extended" color="primary" className={classes.actionBtn} onClick={() =>handleExpandClick(user._id)} style={{background: '#2196F3'}}><EditIcon className={classes.icon}/></Fab>
                    <Fab aria-label="Delete" variant="extended" color="secondary" className={classes.actionBtn} onClick={() => handleDelete(user._id)}><DeleteIcon className={classes.icon}/></Fab>
                </CardActions>
            </Card>
            <UpdateDialogSlide setOpen={setOpen} open={open} classes={classes} values={values} handleChange={handleChange} userId={userId} handleSubmit={handleSubmit}/>
            </>
           ))}
        </>
     );
}
 
export default StudentCard;