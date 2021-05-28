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

export default function MessagesAlert({openRed, openGreen}) {
  const classes = useStyles();
  const [openRedf, setOpenRed] = React.useState(false);
  const [openGreenf, setOpenGreen] = React.useState(false);

  

  useEffect(() => {
      if (openRed) {
        setOpenRed(true);
      }
      if (openGreen) {
        setOpenGreen(true);
      }
    
  }, [openRed,openGreen ])

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenGreen(false);
    setOpenRed(false);
  };

  return (
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar open={openGreenf} autoHideDuration={6000} onClose={handleClose}>

        <Alert onClose={handleClose} severity="success">
          Успешная загрузка!
        </Alert>

      </Snackbar>
      <Snackbar open={openRedf} autoHideDuration={6000} onClose={handleClose}>

        <Alert onClose={handleClose} severity="error">
          Нет соединение с сервером!
        </Alert>

      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert> */}
      {/* <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}
