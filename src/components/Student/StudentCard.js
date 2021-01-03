import React, { useContext } from 'react';
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
        width: 125
    },
    icon: {
        margin: theme.spacing(1.02)
    }
}))
const StudentCard = () => {
    const classes = useStyles()
    const {studentAuth} = useContext(StudentContext);
    const { users } = studentAuth;

    const handleEdit = (id) => {
        toaster(id, 'success')
    }

    const handleDelete = (id) => {
        toaster(id, 'success')
    }
    return ( 
        <>
        {users.map((user) => (
            <Card key={user._id} className={classes.card}>
                <CardContent style={{alignSelf: 'center'}}>
                    <Typography className={classes.paragraph}><span className={classes.span}>Firstname:</span>{user.firstName}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Lastname:</span>{user.lastName}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>RegNumber:</span>{user.regNumber}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>School:</span>{user.address.school}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Faculty:</span>{user.address.faculty}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Level:</span>{user.address.level}</Typography>
                </CardContent>
                <CardActions className={classes.action}>
                    <Fab aria-label="Edit" variant="extended" color="primary" className={classes.actionBtn} onClick={() => handleEdit(user._id)} style={{background: '#2196F3'}}><EditIcon className={classes.icon}/>Edit</Fab>
                    <Fab aria-label="Delete" variant="extended" color="secondary" className={classes.actionBtn} onClick={() => handleDelete(user._id)}><DeleteIcon className={classes.icon}/>Delete</Fab>
                </CardActions>
            </Card>
           ))}
        </>
     );
}
 
export default StudentCard;