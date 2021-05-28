'strick'
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
// import _ from "lodash";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

  
import MessAlert from './Messages.alert';
import TabUsersComponent from './TabUsers.component';
  
import { setObjCurrForDetailPageAsync  } from '../../../store/adminPanelTrest/adminPanelTrest.actions'; 
 
import { fetchDataForEventShortPoints } from '../../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { selectObjsPage, selectObjsInfoPage } from '../../../store/adminPanelTrest/StatisticPage.selectors';  
  
import { selectAllUsersFromDb } from '../../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import EventDetail from './EventDetail';
 

////////////////////////////

// let pageCoutnt = 0;
const TabObjs = ({ setObjCurrForDetailPage, tabValue, selectObjsInfo, isOpenD=true, setPageT,offset , selectUsersPage}) => {

  const [page, setPage] = React.useState(1);
  // const [amUsersDate, setAmUsersDate] = useState(0)
  // const [setPage] = React.useState(0);
  const [orgRow, setOrgName] = useState({});
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  // const [locale, setLocale] = React.useState('ruRU');
  
  const history = useHistory();
  
  // const {currentPage, totalPages, amount} = amObjsValue;
  // console.log('TabObjs -- currentPage, totalPages, amount',currentPage, totalPages, amount);
  // console.log('TabObjs -- page',page);
  console.log('TabObjs -- rerender:');
 
  useEffect(() => {
    // console.log('TabObjs --offset',offset);
    if (offset === '0'){
      setPage(1);
    }
    
  },[offset])

  useEffect(() => {
    let lastDay = new Date(); 
    lastDay.setDate(lastDay.getDate() - 1);
    let weekDay = new Date(); 
    weekDay.setDate(weekDay.getDate() - 7);
    let monthDay = new Date(); 
    monthDay.setDate(monthDay.getMonth() - 1);

    let lastDayVal = 0;
    let weekDayVal = 0;
    let monthDayVal = 0;
    console.log('rerender selectUsersPage : ',selectUsersPage);

    const amUsers =selectUsersPage.length && selectUsersPage.filter(element => {
      lastDayVal += new Date(element.user_reg_date) > lastDay ? 1 : 0;
      weekDayVal += new Date(element.user_reg_date) > weekDay ? 1 : 0;
      monthDayVal += new Date(element.user_reg_date) > monthDay ? 1 : 0;
      // objRecsAmount
      return new Date(element.user_reg_date) > monthDay ;
    });

    const amUsersLength = amUsers && amUsers.length;
    // setAmUsersDate({amUsersLength, lastDayVal, weekDayVal,monthDayVal});
    // console.log('amUsersDate -- lastDayVal, weekDayVal,monthDayVal: ',lastDayVal, weekDayVal,monthDayVal);
    // console.log('amUsers length',amUsers.length);
  }, [selectUsersPage])


   
  const handleChangePage = (event, newPage) => {
    // if (newPage === 1) {
      // pageCoutnt += newPage;
      setPageT(newPage);
      setPage(newPage);
   // }
     
    console.log('handleChangePage --newPage',newPage);
    // console.log('handleChangePage -- pageCoutnt',pageCoutnt);
  }; 

 
  // для детальной информации
  const closeDetail = () => {
    setIsOpenDetail(false);
  }


  const showEvents = (row) => { 
 
      setOrgName(row);
      setObjCurrForDetailPage(row); 
      // history.push(`/stats/objs/${row.objID}`); 
      
      history.push({
        pathname: `/stats/objs/${row.objID}`,
        // search: '?query=obj',
         row: row
      });
  }

//   const someEventHandler = event => {
//     history.push({
//         pathname: '/stats/objs',
//         search: '?query=obj',
//         state: { row: row }
//     });
//  };
    

  let openRed = false, openGreen = false;

 
  if (!tabValue) { 
    openRed = true;
    // openGreen = false;
    // return (<><div >Нет данных с таким фильтом</div><MessAlert  openRed={openRed} openGreen={openGreen} /></>);
    // return (<BackDrop isOpen={true} />);
  }else {
    openRed = false;
    // openGreen = true;
  }
  
  return ( 
    <>
      <TabUsersComponent
          tabValue={tabValue}
          selectObjsInfo={selectObjsInfo}
          openRed={openRed}
          openGreen={openGreen}
          showEvents={showEvents}
          closeDetail={closeDetail}
          handleChangePage={handleChangePage}
          isOpenDetail={isOpenDetail}
          orgRow={orgRow}
          page={page} />
      {/*<EventDetail  orgRow={orgRow}  isOpen={isOpenDetail} closeDetail={closeDetail} />*/}
      {/*<MessAlert  openRed={openRed} openGreen={openGreen} />*/}
    </>
  );
}
 
const mapStateToProps = createStructuredSelector ({
    selectObjs: selectObjsPage, // события короткие данные для таблицы
    selectObjsInfo: selectObjsInfoPage, // события короткие данные для таблицы
    datesOfFetchForEvent: fetchDataForEventShortPoints, //  дата начала и конца для запроса
    selectUsersPage: selectAllUsersFromDb, // hjk
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setObjCurrForDetailPage: (object ) => dispatch(setObjCurrForDetailPageAsync(object )),
  });  
  
  export default connect(mapStateToProps,mapDispatchToProps)(TabObjs); 