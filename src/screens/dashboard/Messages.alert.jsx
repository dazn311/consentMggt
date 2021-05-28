import React, { useEffect } from 'react';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} 

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MessagesAlert({ openGreen, currentMess,setOpenGreen}) {
  const classes = useStyles(); 

  

  useEffect(() => {
       
      if (openGreen) {
        setOpenGreen(true);
      }
    
  }, [openGreen,setOpenGreen ]) 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenGreen(false); 
  };

  return (
    <div className={classes.root}> 
      <Snackbar open={openGreen} autoHideDuration={6000} onClose={handleClose}>

        <Alert onClose={handleClose} severity="info">
          {currentMess}
        </Alert>

      </Snackbar>
      
    </div>
  );
}
