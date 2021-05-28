import React, { useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(4),
    width: 200,
  },
}));

const initional = () => {
    let newDate = new Date();//.toISOString().split('T')[0];
    return newDate.toISOString().split('T')[0];
}



const DatePickers =({setDataEndforFetchEvents}) => {
  const [Data] = useState(initional);
  const classes = useStyles();

  // console.log('DatePickerEnd init');

  
 
  const setDate = (e) => {
    const eT = e.target.value.toString();
    // setData(eT);
    setDataEndforFetchEvents(eT);
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="До"
        type="date"
        defaultValue={Data}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={setDate}
      />
    </form>
  );
}

 
export default DatePickers;