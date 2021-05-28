import React, {useEffect, useState} from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import {  setFilterDateEndActiveAsync } from '../../../store/user/user.actions';
import { selectFilterRecDateEnd } from '../../../store/user/user.selectors';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    // border:'1px solid rgb(228 228 228)',
    borderRadius: 4,
    padding: 6,
    // width: '45%',
    minWidth: 160,
    maxWidth: 185,
    marginRight: window.innerWidth < 500 ? 0 : theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    // width: 200,
  },
}));
//
// const initional = () => {
//     let newDate = new Date();//.toISOString().split('T')[0];
//     // console.log('initional endDate',newDate); //2021-03-13T23:54:10.763Z // Sun Mar 14 2021 02:55:04 GMT+0300 (Moscow Standard Time)
//     return newDate.toISOString().split('T')[0];
// }


const DatePickerEnd =({setFilterDateEndActive, filterRecDateEnd}) => {
  const [Data, setData] = useState(filterRecDateEnd);
  const classes = useStyles();

  const setDateOnBlur = async(e) => {
    setFilterDateEndActive(e.target.value);
  }

  useEffect(() => {setData(filterRecDateEnd)},[filterRecDateEnd]);

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
        onBlur={setDateOnBlur}
      />
    </form>
  );
}
//

const mapStateToProps = createStructuredSelector ({
  filterRecDateEnd: selectFilterRecDateEnd,
});


const mapDispatchToProps = (dispatch) => ({
  setFilterDateEndActive: (date) => dispatch(setFilterDateEndActiveAsync(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerEnd);
// export default  DatePickerEnd;