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
    marginRight: theme.spacing(2),
    width: window.innerWidth < 500 ? 160 : 200,
  },
}));

const initional = () => {
    let newDate = new Date();//.toISOString().split('T')[0];
    newDate.setDate(newDate.getDate() - 7);
    return newDate.toISOString().split('T')[0];
}


///////////////////////////////////////////////


const DatePickers =({setDataStart}) => {
  const [Data] = useState(initional);
  const classes = useStyles();

  // console.log('DatePickers init');
  

  const setDate = (e) => {
    const eT = e.target.value.toString();
    // setData(eT);
    setDataStart(new Date(eT).toISOString());
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="dateStart"
        label="От"
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