import React from 'react';
import { Fab } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const StickyBtn = () => {
    const history = useHistory();
    const handleClick = () => {
        history.goBack();
    };
    return ( 
        <Fab 
        aria-label="Back" 
        variant="extended" 
        color="secondary"
        style={{
            width: 50,
            Height: 50,
            borderRadius: 100,
            position: 'absolute',
            bottom: 20,
            right: 20
        }}
        onClick={handleClick}
        >
        <ArrowBackIosIcon style={{marginLeft: '10px'}}/>
        </Fab>
    );
}
 
export default StickyBtn;