import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: 30,
        marginLeft: '20%',
        marginRight: '20%',
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
        fontWeight: 800,
        paddingRight: theme.spacing(1.5)
    },
    paragraph: {
        lineHeight: 2,
    }
}))
const ReportCard = ({ reportResult }) => {
    const classes = useStyles()
    return ( 
        <>
        {reportResult.map((item) => (
            <Card key={item._id} className={classes.card}>
                <CardContent>
                    <Typography className={classes.paragraph}><span className={classes.span}>School:</span>{item.school}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Faculty:</span>{item.faculty}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Level:</span>{item.level}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Student Number:</span>{item.studentsNumber}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Day:</span>{item.days}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Date:</span>{item.date}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Hour:</span>{item.body.hours}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Module:</span>{item.body.module}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Component:</span>{item.body.component}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Activity:</span>{item.body.activity}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Lecturer:</span>{item.body.lecturer}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Observation:</span>{item.body.observation}</Typography>
                    <Typography className={classes.paragraph}><span className={classes.span}>Submission Date:</span>{item.submittedAt}</Typography>
                </CardContent>
            </Card>
           ))}
        </>
     );
}
 
export default ReportCard;