import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Card, CardContent, Typography } from '@material-ui/core';
import overview from '../../helpers/Dashboard.content';

const usestyles = makeStyles(theme => ({
    content: {
        fontWeight: 800,
        fontFamily: `'Poppins', sans-serif;`,
        '@media only screen and (max-width: 700px)':{
            fontSize: '0.5rem',
        }
    }
}))
const Dashboard = () => {
    const classes = usestyles()
    return ( 
        <>
        {overview.map((content,index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
                <Card>
                <CardContent style={{display: 'flex', justifyContent: 'space-between', }}>
                    <Typography variant="h6" component="h2" className={classes.content}>{content.title}</Typography>
                    <Typography variant="h6" component="h3" color="primary" style={{color: '#2196F3'}} className={classes.content} >{content.nmber}</Typography>
                </CardContent>
                </Card>
             </Grid>
        ))}
        </>
     );
}
 
export default Dashboard;