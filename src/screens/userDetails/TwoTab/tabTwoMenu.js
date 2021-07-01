import React,{ useState, useCallback,useEffect } from 'react';

import { useHistory, useRouteMatch } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';

import SelectorMggt from '../../../components/selectorMggt';


import DatePicker from './DatePicker';
import DatePickerEnd from './DatePickerEnd';
import SearchPanel from './SearchPanel';
import TabActive from './TabUserActive';
import StateElements from './stateElements';


import {
  selectCurrentUserShort,
  // selectUserAllStatsData,
  selectFilterRecStatus,
  selectUserActiveData
} from '../../../store/user/user.selectors';
import { setRecTypeActiveAsync, setFilterFieldObjActiveAsync, setFilterDateStartActiveAsync } from '../../../store/user/user.actions';




//
// const filterInitial = () => {
//   const endDate = new Date().toISOString().split('T')[0];
//   // console.log('endDate initial ', endDate)
//   return { objectType: '2', organization: '0',limit: '15', offset: '0', dateStart: '2021-01-01', dateEnd: endDate,  objKind:'allKind', objStatus:'10', sortCol:'date', sortType:'desc'  }
// }

const TabTwoMenu = ({ selectCurrentUserShort, selectUserActiveData, setRecTypeActive, filterRecStatus, setFilterFieldObjActive, setFilterDateStartActive }) => {

  const [isLoading] = useState(false); // выводить статистику
  const [offsetSt] = useState('0'); // выводить статистику
  const match = useRouteMatch();
  const history = useHistory();
   

  useEffect(() => {
    history.push({
      pathname: `${match.url}/active`
    })
  },[history, match.url])


  ///////////////////////////////////////////


  const setRadioValue = useCallback((val) => {

    setRecTypeActive(val);
  },[setRecTypeActive]);

  const setSearchTextObj = useCallback((val) => {
    // setStFilterSearch({...stFilterSearch, objName: val });
    // setStFilterVal({...stFilterVal, offset: '0' } );
  },[]);

  const setSearchTextOrg = useCallback((val) => {

    setFilterFieldObjActive(val);
  },[setFilterFieldObjActive]);

  const setDateStart = useCallback((val) => {
    console.log(val);
    setFilterDateStartActive(val);
    // setStFilterVal({...stFilterVal, dateStart: val, offset: '0' } );
  },[setFilterDateStartActive]);

  // const setDateEnd = useCallback((val) => {
  //   // setStFilterVal({...stFilterVal, dateEnd: val, offset: '0' } );
  // },[]);

  ///////////////////////////////////////////
  // const valueItems = {val:10, smeg: 'смежные'};
  return (
      <React.Fragment>
        <div style={{display: 'flex', flexDirection: 'column'}}>

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <StateElements curUser={selectCurrentUserShort}  />
          </div>

          <div style={{display: 'flex', flexDirection: window.innerWidth < 500 ? 'column' : 'row', justifyContent: 'flex-start', gap: 0,    alignItems: 'center'}}>
              <SearchPanel  setSearchTextObj={setSearchTextObj} setSearchTextOrg={setSearchTextOrg} />
            <div style={{display: 'flex' , flexWrap: 'nowrap', flexDirection:  'row', justifyContent: 'space-between', gap: 0}}>
              <div >
                <DatePicker setDateStart={setDateStart} />
              </div>
              <div >
                <DatePickerEnd  />
              </div>
            </div>

            <div style={{display: 'flex' , flexWrap: 'nowrap', flexDirection: window.innerWidth < 500 ? 'column' : 'row', justifyContent: 'flex-start', gap: 0}}>
              <SelectorMggt caption={'Тип'} defaultVal={filterRecStatus} valueItems={filterRecStatus} setType={setRadioValue}  />
              <Button  style={{height: '41px', marginTop: 8 , marginRight: 0, maxWidth: window.innerWidth < 500 ? '100%' : 200}} variant="contained" color="primary" disabled={isLoading} >
                Поиск
              </Button>
            </div>
          </div>

          <div style={{ marginTop: 4}}>
            <TabActive allStatsData={selectUserActiveData} isLoading={isLoading}  isOpenD={true}   offset={offsetSt} curUser={selectCurrentUserShort} />
          </div>
        </div>
      </React.Fragment>
  );
}


const mapStateToProps = createStructuredSelector ({
  selectCurrentUserShort: selectCurrentUserShort, // события короткие данные для таблицы
  selectUserActiveData: selectUserActiveData, // события короткие данные для таблицы
  filterRecStatus: selectFilterRecStatus, // for selectUserActiveData
});

const mapDispatchToProps = (dispatch) => ({
  setRecTypeActive: (type) => dispatch(setRecTypeActiveAsync(type)),
  setFilterFieldObjActive: (type) => dispatch(setFilterFieldObjActiveAsync(type)),
  setFilterDateStartActive: (date) => dispatch(setFilterDateStartActiveAsync(date)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TabTwoMenu);
