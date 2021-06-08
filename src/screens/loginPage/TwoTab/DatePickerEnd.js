import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

 

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    border:'1px solid rgb(228 228 228)',
    borderRadius: 4,
    padding: 6,
    width: window.innerWidth > 500 ? '45%' : '100%',
    minWidth: 160,
    marginRight: theme.spacing(0),
    marginTop: 4,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    marginTop: 4,
    // width: 200,
  },
}));

const initional = () => {
    let newDate = new Date();//.toISOString().split('T')[0];
    // console.log('initional endDate',newDate); //2021-03-13T23:54:10.763Z // Sun Mar 14 2021 02:55:04 GMT+0300 (Moscow Standard Time)
    return newDate.toISOString().split('T')[0];
}

 
const DatePickerEnd =({setDateEnd}) => {
  const [Data] = useState(initional);
  const classes = useStyles();
 
  const setDate = (e) => {
    setDateEnd(e.target.value); 
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        // label="До"
        type="date"
        defaultValue={Data}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onBlur={setDate}
      />
    </form>
  );
}
//
// const mapStateToProps = createStructuredSelector ({
//   });
//
// const mapDispatchToProps = (dispatch) => ({
//
// });
// export default connect(mapStateToProps, mapDispatchToProps)(DatePickerEnd);
export default  DatePickerEnd;