import React,{ useState, useCallback,useEffect } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';



// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import MuiAlert from '@material-ui/lab/Alert';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";

import DatePicker from './DatePicker';
import DatePickerEnd from './DatePickerEnd';
import SearchPanel from './SearchPanel';
import TabObjsEvent from './TabObjsEvent';
import StateElements from './stateElements';
import { useStyles } from '../../../hoc/useStyleTab';
import { Alert } from '../../../components/componentsOfObjs/Alert';


import {
  // fetchObjectsListAsync,
  setMessageError
} from '../../../store/adminPanelTrest/adminPanelTrest.actions';

import {  selectObjsInfoPage } from '../../../store/adminPanelTrest/StatisticPage.selectors';
import {  selectCurObjRec } from '../../../store/objs/obj.selectors';
import { selectErrorFetch } from '../../../store/adminPanelTrest/adminPanelTrest.selectors';
import { objCurrentSelector } from '../../../store/adminPanelTrest/objspages.selectors';


import { setCurFilterSenderAsync, setCurFilterOwnAsync, setCurDateStartAsync, setCurDateEndAsync} from '../../../store/objs/obj.actions'


//
// const filterInitial = () => {
//   const endDate = new Date().toISOString().split('T')[0];
//   return { objectType: '2', organization: '0',limit: '15', offset: '0', dateStart: '2021-01-01', dateEnd: endDate,  objKind:'allKind', objStatus:'10', sortCol:'date', sortType:'desc'  }
// }

//selectCurObjRec={selectCurObjRec}
////////////////////////////////////////////////
const TabTwoMenu = ({ objCurrentSel, selectObjs,selectObjsInfoPage, selectErrorFetch, setMessageError, curObjRec, setCurFilterSender, setCurFilterOwn, setCurDateStart, setCurDateEnd }) => {

  const [amObjsValue, setAmObjsValue] = useState({totalAmount: 0, withRecs: 0, withoutRecs: 0, tabFiltValueLength: 0, tabValueLength: 0, inWork: 0,inEndWork: 0 }); // выводить статистику
  // const [amObjsValueCurrent, setAmObjsValueCurrent] = useState({totalAmount: 0, withRecs: 0, withoutRecs: 0, tabFiltValueLength: 0, tabValueLength: 0, inWork: 0,inEndWork: 0 }); // выводить статистику

  const [isLoading, setIsLoading] = useState(true); // выводить статистику

  const classes = useStyles();

  console.log('curObjRec',curObjRec)
  console.log('selectObjs',selectObjs)
  console.log('objCurrentSel',objCurrentSel)

  // React.useEffect(()=> {
  //   if(curObjRec){
  //     setIsLoading(false)
  //   }
  // },[curObjRec])

  useEffect(() => {
    if (selectObjsInfoPage.totalAmount > amObjsValue.totalAmount){
      setAmObjsValue(selectObjsInfoPage);
    }

    // setAmObjsValueCurrent(selectObjsInfoPage);

  }, [selectObjsInfoPage.totalAmount, amObjsValue.totalAmount, selectObjsInfoPage, setAmObjsValue])


  const handleClose = (event, reason) => {
    setMessageError('');
    setIsLoading(true);
  };

  ///////////////////////////////////////////

  const setSearchTextObj = useCallback((val) => {
    const lowText = val.toLowerCase();
    setCurFilterSender(lowText);
  } ,[setCurFilterSender]);

  const setSearchTextOrg = useCallback((val) => {
    const lowText = val.toLowerCase();
    setCurFilterOwn(lowText);
  } ,[setCurFilterOwn]);

  const setDateStart = useCallback((val) => {
    setCurDateStart(val);
  },[setCurDateStart]);
  const setDateEnd = useCallback((val) => {
    setCurDateEnd(val)
  },[setCurDateEnd]);

  return (
      <React.Fragment> 
        <div className={classes.seeMore}>
          <StateElements   objCurrentSel={objCurrentSel} curObjRec={curObjRec} />
          <div className={classes.datePick}>
            <SearchPanel  setSearchTextObj={setSearchTextObj} setSearchTextOrg={setSearchTextOrg} />

            <div  style={{display:'flex', justifyContent: 'flex-start', flexWrap: window.innerWidth < 500 ? 'nowrap': 'nowrap', width: '100%', maxWidth: 414}}  >
              <DatePicker setDateStart={setDateStart} />
              <DatePickerEnd setDateEnd={setDateEnd} />
            </div>

          </div>
            <TabObjsEvent tabValue={curObjRec}   isLoading={isLoading}   isOpenD={true}   />
           
        </div>
        <Grid item xs={12} style={{display: selectErrorFetch ? 'block': 'none'}} >
          <Paper className={classes.paper}>
            <Snackbar open={selectErrorFetch} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {selectErrorFetch}
              </Alert>
            </Snackbar>
          </Paper>
        </Grid>
      </React.Fragment>
  );
}


const mapStateToProps = createStructuredSelector ({
  curObjRec: selectCurObjRec, // события короткие данные для таблицы
  selectObjsInfoPage: selectObjsInfoPage, // события короткие данные для таблицы
  selectErrorFetch: selectErrorFetch,
  objCurrentSel: objCurrentSelector,
});

const mapDispatchToProps = (dispatch) => ({
    setCurFilterSender: (filter) => dispatch(setCurFilterSenderAsync(filter)),
    setCurFilterOwn: (filter) => dispatch(setCurFilterOwnAsync(filter)),
    setCurDateStart: (date) => dispatch(setCurDateStartAsync(date)),
    setCurDateEnd: (date) => dispatch(setCurDateEndAsync(date)),
    setMessageError: () => dispatch(setMessageError()),
});
export default connect(mapStateToProps,mapDispatchToProps)(TabTwoMenu);
