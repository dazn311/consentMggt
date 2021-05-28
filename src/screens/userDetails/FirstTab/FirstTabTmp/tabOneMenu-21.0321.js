import React,{ useState, useCallback,useEffect } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import _ from "lodash";

// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import RadioBtnMGGT from '../../../components/radioButtons';
import RadioBtnIW from '../../../components/radioBtnFow'; 

import DatePicker from './DatePicker';
import DatePickerEnd from './DatePickerEnd';
import SearchPanel from './SearchPanel';
import SearchPanelSec from './SearchPanelSecond';
import TabObjs from './TabObjs';
import StateElements from './stateElements';

  
  
import { fetchObjectsListAsync  } from '../../../store/adminPanelTrest/adminPanelTrest.actions'; 
 
// import { fetchDataForEventShortPoints } from '../../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { selectObjsPage, selectObjsInfoPage } from '../../../store/adminPanelTrest/StatisticPage.selectors';  

let rows = [];

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
    minWidth:1400,
  },
  amObjs:{alignSelf: 'center',marginLeft:10, padding: '4px 16px'},
  seeMore: {
    marginTop: theme.spacing(0),
  },
  datePick: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    margin: '10px 0px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  }
}));


function createData(color, objName, organization, objType,objID, objCreationDate,objRecsAmount,objStatus,objOwn) {
  return { color, objName, organization, objType, objID, objCreationDate, objRecsAmount, objStatus, objOwn};
}
 

const refactData = (objectsList) => {
  rows = [];
  if ( objectsList && objectsList.length === 0 ){
    return false}
    if ( !objectsList){ return false}

  // let nodeObjects = {};
  // // console.log('refactData -- nodeObjects',objectsList);
  // if (Array.isArray(objectsList) ) {
  //     // nodeObjects = _.orderBy(objectsList, ['objName'], ['asc']);
  //     nodeObjects = _.orderBy(objectsList, ['objCreationDate'], ['desc']);
  //     rows = nodeObjects;
  // }
  // if (nodeObjects == null) {
  //   rows = []
  // }

  // if ( objectsList.length === 0 ){return false}
  // console.log('rerender refactData');
  rows = [];
  objectsList.map((nodeE) => { 
    var options = {year: 'numeric',month: 'numeric',day: 'numeric',timezone: 'UTC'};
    // const dateCreateObj = nodeE.objCreationDate ? nodeE.objCreationDate.split('T')[0] + ' ('+ nodeE.objCreationDate.split('T')[1] + ')' : '20.03.20';
    const newDate = new Date(nodeE.objCreationDate).toLocaleString("ru", options);

    let newNode = createData('red', nodeE.objName, nodeE.organization.orgname, nodeE.objType, nodeE.objID, newDate, nodeE.objRecsAmount, nodeE.objStatus, nodeE.objOwn);
    rows.push(newNode);
    return newNode
  });
}

































 // {"objectType":"2", "organization":"0", "limit":"100" , "offset":"100", "startDate":"2021-02-19T22:00:00.000Z", "endDate":"2021-03-19T22:00:00.000Z", "objName": "", "orgName": "", "objType": "ОО","objKind":"","objStatus": "10", "sortCol":"date","sortType":"desc"}   
const TabOneMenu = ({ fetchObjectsList, selectObjs,selectObjsInfoPage }) => {

  const [amObjsValue, setAmObjsValue] = useState({totalAmount: 0, withRecs: 0, withoutRecs: 0, tabFiltValueLength: 0, tabValueLength: 0, inWork: 0,inEndWork: 0 }); // выводить статистику
  const [tabValue, setTabValue] = useState([]); // выводить статистику
  // const [rowsPerPage, setRowsPerPage] = React.useState(15);
  // 19.03.21
  //objectType='2', organization='0', limit='100' , offset='0', startDate='01-01-2021', endDate='21-03-2021', objName='A',  orgName='' , objKind='' , objStatus=10, sortCol='date' , sortType='desc'
  const [stFilterVal, setStFilterVal] = useState({ objectType: 2, organization:0,limit:15, offset:0, dateStart: '01.01.2021', dateEnd: '01.05.2021' ,objName:'', orgName:'' , objType: "2",  objKind:'', objStatus:'10', sortCol:'date', sortType:'desc' }); // выводить статистику
 

  const setRowsPerPage = (rowsPerPage) => {
    setStFilterVal({...stFilterVal, limit:rowsPerPage})
  }


  const setPageT = useCallback((val) => {
    if ( val ===1){
      let newOffset = stFilterVal.offset + stFilterVal.limit;
      setStFilterVal({...stFilterVal, offset: newOffset })
    }
    },[stFilterVal]);

  useEffect(() => {

    setAmObjsValue(selectObjsInfoPage);

  }, [selectObjsInfoPage])
  
  
  
  
  
  useEffect(() => {

    const startDate = new Date(stFilterVal.dateStart).toISOString();
    const endDate = new Date().toISOString();
    const limitPlus = stFilterVal.limit;
    fetchObjectsList(stFilterVal.objectType, stFilterVal.organization, limitPlus, stFilterVal.offset, startDate, endDate, stFilterVal.objName, stFilterVal.orgName, stFilterVal.objType, stFilterVal.objKind, stFilterVal.objStatus, stFilterVal.sortCol, stFilterVal.sortType)

  }, [stFilterVal,fetchObjectsList])





  useEffect(() => {
    const startDate = new Date(stFilterVal.dateStart).toISOString();
    const endDate = new Date(stFilterVal.dateEnd).toISOString();
    const limitPlus = stFilterVal.limit + 1;
    fetchObjectsList(stFilterVal.objectType, stFilterVal.organization, limitPlus, stFilterVal.offset, startDate, endDate, stFilterVal.objName, stFilterVal.orgName, stFilterVal.objType, stFilterVal.objKind, stFilterVal.objStatus, stFilterVal.sortCol, stFilterVal.sortType)
  
  },[]);
  
  useEffect(() => {
    //if (selectObjs.length){
      //refactData(selectObjs);
      setTabValue(selectObjs); 

    //}
    
  },[selectObjs]);

  // console.log('TabOneMenu -- tabValue',tabValue);
  // console.log('TabOneMenu -- stFilterVal',stFilterVal);
  // console.log('TabOneMenu --  selectObjs',selectObjs);
  
  // useEffect(() => {
  //   // console.log('useEffect 3  : ');
  //   if (selectObjs.data.objects !== {}){
  //     refactData(selectObjs.data.objects);
  //     setTabValue(rows); 

  //     setAmObjsValue({...amObjsValue,totalAmount: selectObjs.totalAmount, withRecs: selectObjs.withRecs, withoutRecs: selectObjs.withoutRecs})
  //   }
  //   console.log('TabOneMenu -- useEffect selectObjs',selectObjs);
  // },[selectObjs]);
  
  

  //  useEffect(() => {
  //   //  console.log('stFilterVal',stFilterVal);
      
  //  }, [stFilterVal]);

  //  fetchObjectsList({objectType: 0, organization: 0, limit: 1000, offset: 0, startDate: "2021-01-01T00:00:00.000Z", endDate: endDate});
  // .filter((item, idx) => { return typeof item.objectType === 'string'  ? item.objectType.toLowerCase().includes(searchValObj.toLowerCase()) :' '})
          // .filter((item, idx) => { return typeof item.[fieldValue] === 'string'  ? item.[fieldValue].toLowerCase().includes(searchValue.toLowerCase()) :' '})
          // .filter((item, index) =>{ return index < rowsPerPage * page && index > rowsPerPage * (page -1)})
          // .filter((item, index) =>{  return index < rowsPerPage * page + rowsPerPage && index >= rowsPerPage * page})
          // .filter((item, index) =>{ return item.objCreationDate < new Date('2021-03-15') && item.objCreationDate > new Date('2021-03-10')})
          // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  
  const classes = useStyles();

  const valueForBtnMggt = {other:'0',mggt:'1',all:'2'};
  const valueForBtnInWork = {newIW:'0',rabIW:'1',endIW:'2',all:'10'};

  const setAmountObj = useCallback((val) => {setAmObjsValue(val)},[]);
  // const setRadioValue = useCallback((val) => {setRadioVal(val);console.log('setRadioValue',val)},[]);




  const setRadioValue = useCallback((val) => {setStFilterVal({...stFilterVal, objectType: val} );console.log('radObjOwnMggt :',val)},[stFilterVal]);
  const setRadioValInWork = useCallback((val) => {setStFilterVal({...stFilterVal, objStatus: val} );console.log('radObjStatusInWork :',val)},[stFilterVal]);

  const setSearchTextObj = useCallback((val) => {setStFilterVal({...stFilterVal, searchValObj: val} );console.log('searchValObj :',val)},[stFilterVal]);
  const setSearchTextOrg = useCallback((val) => {setStFilterVal({...stFilterVal, searchValOrg: val} );console.log('searchValOrg :',val)},[stFilterVal]);
  const setDateStart = useCallback((val) => {setStFilterVal({...stFilterVal, dateStart: val} );console.log('dateStart :',val)},[stFilterVal]);
  const setDateEnd = useCallback((val) => {setStFilterVal({...stFilterVal, dateEnd: val} );console.log('dateEnd :',val)},[stFilterVal]);
  
  // const setRadioValInWork = useCallback((val) => {setRadioValIW(val);console.log('setRadioValInWork :',val)},[]);
    
  return ( 
    <React.Fragment>
       <pre>{JSON.stringify(stFilterVal, null, 2)} </pre>
      <div className={classes.seeMore}>
        <StateElements amObjsValue={amObjsValue} />
        <div className={classes.datePick}>
            <SearchPanel  setSearchTextObj={setSearchTextObj} setSearchTextOrg={setSearchTextOrg} /> 
            <RadioBtnMGGT  defaultVal={stFilterVal.objType} setRadioValue={setRadioValue} valueForButtons={valueForBtnMggt} />
            <RadioBtnIW   defaultVal={stFilterVal.objStatus}  setRadioValueIW={setRadioValInWork}  valueForButtons={valueForBtnInWork}   />
            <DatePicker setDateStart={setDateStart} /> 
            <DatePickerEnd setDateEnd={setDateEnd} /> 
        </div>
      
      {/* const [rowsPerPage, setRowsPerPage] = React.useState(15); */}
         <TabObjs tabValue={tabValue} amObjsValue={amObjsValue} isOpenD={true}  rowsPerPage={stFilterVal.limit} setRowsPerPage={setRowsPerPage} setPageT={setPageT}  offset={stFilterVal.offset} /> 
        
        {/* <TabObjs fieldValue={fieldValue} searchValue={searchValue} setAmountObj={setAmountObj} radioValIW={radioValIW} radioValMggt={radioVal} searchValObj={stFilterVal.searchValObj} searchValOrg={stFilterVal.searchValOrg}   /> */}
       
      </div>
    </React.Fragment> 
  );
}


const mapStateToProps = createStructuredSelector ({
  selectObjs: selectObjsPage, // события короткие данные для таблицы
  selectObjsInfoPage: selectObjsInfoPage, // события короткие данные для таблицы
});

const mapDispatchToProps = (dispatch) => ({
  // Для  {"objectType":"2", "organization":"0", "limit":"100" , "offset":"100", "startDate":"2021-02-19T22:00:00.000Z", "endDate":"2021-03-19T22:00:00.000Z", "objName": "", "orgName": "", "objType": "ОО"}

  // {"objectType":"2", "organization":"0", "limit":"100" , "offset":"100", "startDate":"2021-02-19T22:00:00.000Z", "endDate":"2021-03-19T22:00:00.000Z", "objName": "", "orgName": "", "objType": "ОО","objKind":"","objStatus": "10", "sortCol":"date","sortType":"desc"}
  fetchObjectsList: (objectType, organization, limit, offset, startDate, endDate,objName, orgName, objType, objKind, objStatus, sortCol, sortType) => dispatch(fetchObjectsListAsync(objectType, organization, limit, offset, startDate, endDate, objName, orgName, objType, objKind, objStatus, sortCol, sortType)),
});  
export default connect(mapStateToProps,mapDispatchToProps)(TabOneMenu); 
