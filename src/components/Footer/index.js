import React from 'react';
import { CssBaseline, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        height: 60,
        width: '100%',
        position: 'fixed',
        bottom: 0,
        textAlign: 'center',
        background: 'whitesmoke',
        color: theme.palette.common.black
    },
    footer: {
        marginTop: 20
    }
}))

const Footer = () => {
    const classes = useStyles();

    return ( 
        <footer className={classes.root}>
            <CssBaseline />
            <Typography className={classes.footer}>
                {
                   `©${new Date().getFullYear()} All rights reserved.`
                }
            </Typography>
        </footer>
     );
}
 
export default () => {
    const {pathname} = window.location;
    if(pathname === '/' ){
        return <Footer />
    } else {
        return null
    }
};