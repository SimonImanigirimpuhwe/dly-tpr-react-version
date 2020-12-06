import React from 'react';
import {Link } from 'react-router-dom';
import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import logo from '../../assets/images/logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        background: '#2196F3',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo: {
        marginLeft: theme.spacing(1),
        width: 40,
        height: 40
    },
    links: {
        color: theme.palette.common.white,
        textDecoration: 'none',
        fontFamily: `'Poppins', sans-serif;`
    }
}))

const Header = () => {
    const classes = useStyles();

    return ( 
        <div className={classes.root}>
            <AppBar >
                <Toolbar className={classes.toolbar} >
                    <IconButton >
                        <img src={logo} alt="logo" className={classes.logo}/>
                    </IconButton>
                    <div >
                        <Button style={{marginRight: 20}}><Link to="/staff" className={classes.links}>Staff</Link></Button>
                        <Button ><Link to="/students" className={classes.links}>Students</Link></Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
     );
}
 
export default Header;