import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { dataStartforFetchEventsForPeriod, fetchEventFromPeriodAsync } from '../../../store/adminPanelTrest/adminPanelTrest.actions'; 
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
    newDate.setDate(newDate.getDate() - 7);
    return newDate.toISOString().split('T')[0];
}



const DatePickers =({setDataStartforFetchEvents, fetchEventFromPeriod,dataOfFetchForEventShort}) => {
  const [Data] = useState(initional);
  const classes = useStyles();

  
  useEffect(() => {
    setDataStartforFetchEvents(new Date(Data).toISOString());
    // console.log('useEffect setDataStartforFetchEvents');
  }, [setDataStartforFetchEvents,Data]);
 
  const setDateOnBlur = async(e) => {
    const eT = e.target.value.toString();
    console.log('eT',eT);
    // setData(eT);
    await setDataStartforFetchEvents(new Date(eT).toISOString());

    let endDate   = dataOfFetchForEventShort.endDate;
    let startDate = new Date(eT).toISOString();
    console.log('startDate',startDate);
    console.log('endDate',endDate);
    fetchEventFromPeriod(startDate, endDate);
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
        
        onChange={setDateOnBlur}
      />
    </form>
  );
}

const mapStateToProps = createStructuredSelector ({
  dataOfFetchForEventShort: fetchDataForEventShortPoints, 
  });

const mapDispatchToProps = (dispatch) => ({
  // Для  
  setDataStartforFetchEvents: (startDate) => dispatch(dataStartforFetchEventsForPeriod(startDate)),
  fetchEventFromPeriod: (start, end) => dispatch(fetchEventFromPeriodAsync(start, end)),
});  
export default connect(mapStateToProps, mapDispatchToProps)(DatePickers);