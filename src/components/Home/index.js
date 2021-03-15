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
        height: 310,
        padding: theme.spacing(1),
        border: '1px solid #2196F3',
        color: theme.palette.common.black,
        '@media(max-width: 1168px)': {
            height: 500
        },
        '@media(max-width: 853px)': {
            height: 570
        },
        '@media(max-width: 707px)': {
            height: 600
        },
        '@media(max-width: 675px)': {
            height: 650
        },
        '@media(max-width: 647px)': {
            height: 670
        },
        '@media(max-width: 623px)': {
            height: 703
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
        marginTop: 20,
        textAlign: 'center',
    },
    h6: {
        paddingBottom: 10, 
        color: '#2196F3',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: '1rem',
        fontFamily: `'Poppins', sans-serif;`,
        color: theme.palette.common.black
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
                    <Paper className={classes.paper} elevation={5}>
                        <Typography variant="h6" color="inherit" className={classes.h6}>Staff in charge of teaching and learning enhancement</Typography>
                        <Typography paragraph align="left" className={classes.paragraph}>
                        As an Administrator by loging in, you will be able to add class representatives with thier respective classes, 
                        so that they can have access to this platform in order to submit reports.
                        <br />
                        </Typography>
                        <Typography paragraph align="left" className={classes.paragraph}>
                        You will be the admin of the platform which means you will have controll to all class representatives, 
                        by managing them through editing their statuses as they get promoted from one level to another.
                        <br />
                        <br />
                        Therefore, you'll also be able to delete the account of any class representatives if his/her studies 
                        completed or if they elected new representatives.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={8} sm={6}>
                    <Paper className={classes.paper} elevation={5}>
                        <Typography variant="h6" className={classes.h6}>
                        Class representative
                        </Typography>
                        <Typography paragraph align="left" className={classes.paragraph}>
                        If you are a class representative,
                        you only need to login by clicking on students at the top-right corner.
                        <br />
                        <Typography>
                        You will only need your registration number as you will be added on the 
                        platform by the staff in charge of teaching and learning enhancement.
                        </Typography>
                        You will only have access to the report sheet so that you can fill it and submit it.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid> 
            )}
        </div>
     );
}
 
export default Home;