import 'date-fns'; 
import React, {useEffect} from 'react';

// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
//
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from "@material-ui/core/DialogContentText";
import {TextField} from "@material-ui/core";
//
// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
// }));

///////////////////////
export default function DialogMarkerMap({caption, bodyTxt, newBodyTxt, setSelectedDate ,openMarker, isOpen}) {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const [age, setAge] = React.useState('');
//   const [selectedDate, setSelectedDate] = React.useState('2021-05-05');
//   const [selectedDate, setSelectedDate] = React.useState(new Date());

  useEffect(() => {
    setOpen(openMarker)
  },[openMarker])

  useEffect(() => {
    setOpen(isOpen)
  },[isOpen])
  //
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // const handleChange = (event) => {
  //   setAge(Number(event.target.value) || '');
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  return (
    <div>
      <Button onClick={handleClickOpen}>{ caption }</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>{ caption }</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-marker">
              {bodyTxt}
            </DialogContentText>
          <TextField id="standard-basic" label="новое название" defaultValue={bodyTxt} value={bodyTxt}
                     // onChange={newBodyTxt}
                     onChange={(e) => newBodyTxt( e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
