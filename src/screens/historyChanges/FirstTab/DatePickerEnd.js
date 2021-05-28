import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { dataEndforFetchEventsForPeriod, fetchEventFromPeriodAsync } from '../../../store/adminPanelTrest/adminPanelTrest.actions'; 
import { fetchDataForEventShortPoints } from '../../../store/adminPanelTrest/adminPanelTrest.selectors' //'./adminPanelTrest.selectors'; 

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
    //console.log('newDate',newDate); //2021-03-13T23:54:10.763Z // Sun Mar 14 2021 02:55:04 GMT+0300 (Moscow Standard Time)
    return newDate.toISOString().split('T')[0];
}



const DatePickerEnd =({setDataEndforFetchEvents, fetchEventFromPeriod,dataOfFetchForEventShort}) => {
  const [Data] = useState(initional);
  const classes = useStyles();



  useEffect(() => {
    setDataEndforFetchEvents(Data + 'T23:58:00.000Z');
  }, [setDataEndforFetchEvents, Data]);
 
  const setDate = (e) => {
    const eT = e.target.value.toString();
    // console.log('eT',eT);
    // setData(eT);
    let endDate   = eT + 'T23:59:00.000Z';//new Date(eT).toISOString();

    setDataEndforFetchEvents(endDate);

    let startDate = dataOfFetchForEventShort.startDate;
    fetchEventFromPeriod(startDate, endDate);
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

const mapStateToProps = createStructuredSelector ({
  dataOfFetchForEventShort: fetchDataForEventShortPoints, 
  });

const mapDispatchToProps = (dispatch) => ({
  setDataEndforFetchEvents: (startDate) => dispatch(dataEndforFetchEventsForPeriod(startDate)),
  fetchEventFromPeriod: (start, end) => dispatch(fetchEventFromPeriodAsync(start, end)),
});  
export default connect(mapStateToProps, mapDispatchToProps)(DatePickerEnd);