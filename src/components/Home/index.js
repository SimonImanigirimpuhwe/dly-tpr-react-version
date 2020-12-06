import React, { useState } from 'react';
import { Grid, makeStyles, Typography, Button, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: '15vh',
    },
    grid: {
        padding: theme.spacing(6),
    },
    paper: {
        height: 300,
        padding: theme.spacing(1),
        background: '#2196F3',
        color: theme.palette.common.black,
        '@media(max-width: 808px)': {
            height: 400
        },
        '@media(max-width: 630px)': {
            height: 450
        },
        '@media(max-width: 598px)': {
            height: 'auto'
        },
        
    },
    btn: {
        marginTop: 100,
        width: 300,
        height: 45,
        background:'#2196F3',
        alignSelf: 'center'
    },
    title: {
        marginTop: 30,
        textAlign: 'center',
    },
    h6: {
        paddingBottom: 30, 
        color: 'white',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: '1rem',
        fontFamily: `'Poppins', sans-serif;`,
        lineHeight: 1
    }
}))

const Home = () => {
    const classes = useStyles();
    const [guideline, setGuideline] = useState(false);

    const handleGuidelineDisplay = () => {
        setGuideline(!guideline)
    }
    return ( 
        <div className={classes.root}>
            <Typography className={classes.title}>DIGITAL DAILY TEACHING PROGRESS REPORT</Typography>
            <Button 
            variant="contained" 
            color="primary" 
            className={classes.btn}
            onClick={handleGuidelineDisplay}
            >
            Guidelines
            </Button>
            {guideline && (
                <Grid container className={classes.grid} spacing={4} justify="center">
                <Grid item xs={8} sm={6} >
                    <Paper className={classes.paper}>
                        <Typography variant="h6" color="inherit" className={classes.h6}>Staff in charge of teaching and learning enhancement</Typography>
                        <Typography variant="paragraph" align="left" className={classes.paragraph}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat.
                        </Typography>
                        <br />
                        <Typography variant="paragraph" align="left" className={classes.paragraph}>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse 
                        cillum dolore eu fugiat nulla pariatur. 
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={8} sm={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" className={classes.h6}>
                        Class representative
                        </Typography>
                        <Typography variant="paragraph" align="left" className={classes.paragraph}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        </Typography>
                    </Paper>
                </Grid>
            </Grid> 
            )}
        </div>
     );
}
 
export default Home;