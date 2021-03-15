import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateDialogSlide(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
       <form className={props.classes.form} onSubmit={props.handleSubmit(props.userId)}>
        <Typography variant="h6" component="h2" style={{textAlign: 'center'}}>Edit User</Typography>
        <div className={props.classes.upForm}>
            <FormControl fullWidth variant="outlined" className={props.classes.formContral}>
                <InputLabel htmlFor="outlined-school-input">School</InputLabel>
                <OutlinedInput 
                id="outlined-school-input"
                type="text"
                value={props.values.school}
                onChange={props.handleChange("school")}
                labelWidth={70}
                /> 
            </FormControl> 
            <FormControl fullWidth variant="outlined" className={props.classes.formContral}>
                <InputLabel htmlFor="outlined-faculty-input">Faculty</InputLabel>
                <OutlinedInput 
                id="outlined-faculty-input"
                type="text"
                value={props.values.faculty}
                onChange={props.handleChange("faculty")}
                labelWidth={70}
                /> 
            </FormControl> 
            <FormControl fullWidth variant="outlined" className={props.classes.formContral}>
                <InputLabel htmlFor="outlined-level-input">Level</InputLabel>
                <OutlinedInput 
                id="outlined-level-input"
                type="text"
                value={props.values.level}
                onChange={props.handleChange("level")}
                labelWidth={70}
                /> 
            </FormControl> 
        </div>
        <Button type="submit" color="primary" variant="contained" className={props.classes.button}>Save</Button>
      </form>
      </Dialog>
    </div>
  );
}
