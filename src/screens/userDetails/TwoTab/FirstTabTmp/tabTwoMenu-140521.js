import React,{ useState, useCallback,useEffect } from 'react';

import { useHistory, useRouteMatch } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';  
import Button from '@material-ui/core/Button';

import SelectorMggt from '../../../components/selectorMggt';

import DatePicker from './DatePicker';
import DatePickerEnd from './DatePickerEnd';
import SearchPanel from './SearchPanel';
import TabActive from './TabActive';
import StateElements from './stateElements';


import { fetchObjectsListAsync  } from '../../../store/adminPanelTrest/adminPanelTrest.actions';

import { selectObjsPage, selectObjsInfoPage } from '../../../store/adminPanelTrest/StatisticPage.selectors';
import { selectCurrentUserShort } from '../../../store/user/user.selectors';


  
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
    // minWidth:1400,
  },
  amObjs:{alignSelf: 'center',marginLeft:10, padding: '4px 16px'},
  seeMore: {
    marginTop: theme.spacing(1),
    display:'flex',
    flexDirection: 'column',
    
  },
  datePick: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
    borderRadius: '4px',
    margin: '10px 0px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  }
}));

const valueForBtnMggt = {'Сообщение':'0','Новое событие':'1','Все':'2'};
const valueForBtnInWork = {'Новые':'0','В работе':'1','согласованные':'2','Все':'10'};
const valueForBtnOgh = {'ОДХ':'ОДХ','ОО':'ОО','ДТ':'ДТ','Все':'allKind'};


const filterInitial = () => {
  const endDate = new Date().toISOString().split('T')[0];
  console.log('endDate initial ', endDate)
  return { objectType: '2', organization: '0',limit: '15', offset: '0', dateStart: '2021-01-01', dateEnd: endDate,  objKind:'allKind', objStatus:'10', sortCol:'date', sortType:'desc'  }
}

const TabOneMenu = ({ fetchObjectsList, selectObjs,selectObjsInfoPage, selectCurrentUserShort }) => {

  const [amObjsValue, setAmObjsValue] = useState({totalAmount: 0, withRecs: 0, withoutRecs: 0, tabFiltValueLength: 0, tabValueLength: 0, inWork: 0,inEndWork: 0 }); // выводить статистику
  const [amObjsValueCurrent, setAmObjsValueCurrent] = useState({totalAmount: 0, withRecs: 0, withoutRecs: 0, tabFiltValueLength: 0, tabValueLength: 0, inWork: 0,inEndWork: 0 }); // выводить статистику
  // const [tabValue, setTabValue] = useState([]); // выводить статистику
  const [isLoading, setIsLoading] = useState([]); // выводить статистику
  const [offsetSt, setOffsetSt] = useState('0'); // выводить статистику
  // 19.03.21
  const [stFilterVal, setStFilterVal] = useState(filterInitial()); // выводить статистику
  const [stFilterSearch, setStFilterSearch] = useState({ objName:'', orgName:''}); // выводить статистику

  const classes = useStyles();


  const match = useRouteMatch();
  const history = useHistory();
   

  useEffect(() => {
    history.push({
      pathname: `${match.url}/active`
    })
  },[])

  const setPageT = useCallback((val) => {

    setOffsetSt(val.toString());
    setIsLoading(true);

    const startDate = new Date(stFilterVal.dateStart).toISOString();
    const endDate = new Date(stFilterVal.dateEnd).toISOString();
    const endDatePlus = endDate.split("T")[0] + 'T22:22:00.000Z';

    const limitPlus = stFilterVal.limit;
    let newOffset = (val -1) * stFilterVal.limit;
    let newAllKind = stFilterVal.objKind === 'allKind' ? '' : stFilterVal.objKind;
    // console.log('88888 stFilterSearch.objName, stFilterSearch.orgName',stFilterSearch.objName, stFilterSearch.orgName);
    fetchObjectsList(stFilterVal.objectType, stFilterVal.organization, limitPlus, newOffset, startDate, endDatePlus, stFilterSearch.objName, stFilterSearch.orgName, newAllKind , stFilterVal.objStatus, stFilterVal.sortCol, stFilterVal.sortType)


  },[stFilterVal,stFilterSearch,fetchObjectsList]);


  useEffect(() => {

    if (selectObjsInfoPage.totalAmount > amObjsValue.totalAmount){
      setAmObjsValue(selectObjsInfoPage);
    }

    setAmObjsValueCurrent(selectObjsInfoPage);

  }, [selectObjsInfoPage.totalAmount, amObjsValue.totalAmount, selectObjsInfoPage, setAmObjsValue, setAmObjsValueCurrent])


///////////////////////////////////////////
  const fetchSearchObj = useCallback((offset) => {
    setIsLoading(true);
    const startDate = new Date(stFilterVal.dateStart).toISOString();
    const endDate = new Date(stFilterVal.dateEnd).toISOString();
    const endDatePlus = endDate.split("T")[0] + 'T22:22:00.000Z';
    const limitPlus = stFilterVal.limit;
    setOffsetSt('0');
    let newOffset = '0';
    if (offset !== '0'){newOffset = offset;}
    let newAllKind = stFilterVal.objKind === 'allKind' ? '' : stFilterVal.objKind;
    fetchObjectsList(stFilterVal.objectType, stFilterVal.organization, limitPlus, newOffset, startDate, endDatePlus, stFilterSearch.objName, stFilterSearch.orgName, newAllKind , stFilterVal.objStatus, stFilterVal.sortCol, stFilterVal.sortType)
    // console.log('TabOneMenu -- 4  fetchObjectsList  offset',offset);
  },[stFilterVal.objectType, stFilterVal.organization, stFilterVal.limit,   stFilterVal.dateStart, stFilterVal.dateEnd, stFilterSearch.objName, stFilterSearch.orgName, stFilterVal.objKind, stFilterVal.objStatus, stFilterVal.sortCol, stFilterVal.sortType, fetchObjectsList]);

  ///////////////////////////////////////////
  useEffect(() => {
 
    // setTabValue(selectObjs);
    setIsLoading(false);
  },[selectObjs]);

///////////////////////////////////////////
  useEffect(() => {

    if ( selectObjs && selectObjs.length < 1){
      // console.log('TabOneMenu -- 444  fetchObjectsList  offset');
      setIsLoading(true);
      fetchSearchObj('0');
    }

  },[fetchSearchObj,selectObjs]);

  ///////////////////////////////////////////


  const setRadioValue = useCallback((val) => {
    setStFilterVal({...stFilterVal, objectType: val, offset: '0' } );
  },[stFilterVal]);

  const setRadioValInWork = useCallback((val) => {
    setStFilterVal({...stFilterVal, objStatus: val, offset: '0' } );
  },[stFilterVal]);

  const setRadioValOdh = useCallback((val) => {
    setStFilterVal({...stFilterVal, objKind: val, offset: '0' } );
  },[stFilterVal]);

  const setSearchTextObj = useCallback((val) => {
    setStFilterSearch({...stFilterSearch, objName: val });
    setStFilterVal({...stFilterVal, offset: '0' } );
  },[stFilterSearch,stFilterVal]);

  const setSearchTextOrg = useCallback((val) => {
    setStFilterSearch({...stFilterSearch, orgName: val } );
    setStFilterVal({...stFilterVal, offset: '0' } );
  },[stFilterSearch,stFilterVal]);

  const setDateStart = useCallback((val) => {
    setStFilterVal({...stFilterVal, dateStart: val, offset: '0' } );
  },[stFilterVal]);

  const setDateEnd = useCallback((val) => {
    setStFilterVal({...stFilterVal, dateEnd: val, offset: '0' } );
  },[stFilterVal]);

  ///////////////////////////////////////////
  // const valueItems = {val:10, smeg: 'смежные'};
  return (
      <React.Fragment> 
        <div className={classes.seeMore}>
              <StateElements curUser={selectCurrentUserShort}  />
              <div className={classes.datePick}>
                  <SearchPanel  setSearchTextObj={setSearchTextObj} setSearchTextOrg={setSearchTextOrg} />
                  <div style={{display: 'flex'}} >
                      <div  style={{display:'flex', flexWrap:'nowrap', width:'100%', justifyContent: 'center'}}  >
                        <SelectorMggt caption={'Тип'} defaultVal={stFilterVal.objectType} valueItems={valueForBtnMggt} setType={setRadioValue}  />
                      </div>
                  </div>
                  <div  style={{display:'flex', flexWrap:'wrap',margin:'4px 8px'}}  >
                    <DatePicker setDateStart={setDateStart} />
                    <DatePickerEnd setDateEnd={setDateEnd} />
                  </div>
                  <Button onClick={()=>{fetchSearchObj('0')}} style={{height: '43px'}} variant="contained" color="primary" disabled={isLoading} >
                    Поиск
                  </Button>

              </div>
              <TabActive tabValue={selectObjs} isLoading={isLoading} amObjsValue={amObjsValue} isOpenD={true}   setPageT={setPageT}  offset={offsetSt} />
        </div>
      </React.Fragment>
  );
}


const mapStateToProps = createStructuredSelector ({
  selectObjs: selectObjsPage, // события короткие данные для таблицы
  selectObjsInfoPage: selectObjsInfoPage, // события короткие данные для таблицы
  selectCurrentUserShort: selectCurrentUserShort, // события короткие данные для таблицы
});

const mapDispatchToProps = (dispatch) => ({
    fetchObjectsList: (objectType, organization, limit, offset, startDate, endDate,objName, orgName,   objKind, objStatus, sortCol, sortType) => dispatch(fetchObjectsListAsync(objectType, organization, limit, offset, startDate, endDate, objName, orgName,   objKind, objStatus, sortCol, sortType)),
});
export default connect(mapStateToProps,mapDispatchToProps)(TabOneMenu); 
