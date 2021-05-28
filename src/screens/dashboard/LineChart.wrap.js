import React, {useState,useEffect, useCallback }  from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { reduce } from 'lodash'; 


 
import LineChartComp from './LineChartWithXAxisPading';

import { selectCountUsersGraph, selectIsFetchingUserOnline, selectAmountEventGraph, selectAmountEndEventGraph } from '../../store/adminPanelTrest/adminPanelTrest.selectors';

import { fetchAmountUsersForGraphicsAsync,fetchAmountNewEventsForGraphicAsync,fetchAmountEndEventsForGraphicAsync  } from '../../store/adminPanelTrest/adminPanelTrest.actions'; 



 

let dataInit0 = [
  {
    name: '(00-07)', Events: null, Users: null, Closed: null, amt: 3,
  },
  {
    name: '08:00', Events: null, Users: null, Closed: null, amt: 3,
  },
  {
    name: '09:00', Events: null, Users: null, Closed: null, amt: 3,
  },
  {
    name: '10:00', Events: null, Users: null, Closed: null, amt: 4,
  },
  {
    name: '11:00', Events: null, Users: null, Closed: null, amt: 40,
  },
  {
    name: '12:00', Events: null, Users: null, Closed: null, amt: 14,
  },{
    name: '13:00', Events: null, Users: null, Closed: null, amt: 14,
  },
  {
    name: '14:00', Events: null, Users: null, Closed: null, amt: 21,
  },
  {
    name: '15:00', Events: null, Users: null, Closed: null, amt: 21,
  },
  {
    name: '16:00', Events: null, Users: null, Closed: null, amt: 32,
  },
  {
    name: '17:00', Events: null, Users: null, Closed: null, amt: 30,
  },
  {
    name: '18:00', Events: null, Users: null, Closed: null, amt: 0,
  },
  {
    name: '(19-23)', Events: null, Users: null, Closed: null, amt: 0,
  },
];
const dataInit = [
  {
    name: '(00-07)', Events: null, Users: null, Closed: null, amt: 3,
  },
  {
    name: '08:00', Events: null, Users: null, Closed: null, amt: 3,
  },
  {
    name: '09:00', Events: null, Users: null, Closed: null, amt: 3,
  },
  {
    name: '10:00', Events: null, Users: null, Closed: null, amt: 4,
  },
  {
    name: '11:00', Events: null, Users: null, Closed: null, amt: 40,
  },
  {
    name: '12:00', Events: null, Users: null, Closed: null, amt: 14,
  },{
    name: '13:00', Events: null, Users: null, Closed: null, amt: 14,
  },
  {
    name: '14:00', Events: null, Users: null, Closed: null, amt: 21,
  },
  {
    name: '15:00', Events: null, Users: null, Closed: null, amt: 21,
  },
  {
    name: '16:00', Events: null, Users: null, Closed: null, amt: 32,
  },
  {
    name: '17:00', Events: null, Users: null, Closed: null, amt: 30,
  },
  {
    name: '18:00', Events: null, Users: null, Closed: null, amt: 0,
  },
  {
    name: '(19-23)', Events: null, Users: null, Closed: null, amt: 0,
  },
];

let dataTmp = [
  {
    name: '(00-07)', Events: null, Users: null, Closed: null, amt: 3,
  },
  {
    name: '08:00', Events: null, Users: null, Closed: null, amt: 3,
  },
  {
    name: '09:00', Events: null, Users: null, Closed: null, amt: 3,
  },
  {
    name: '10:00', Events: null, Users: null, Closed: null, amt: 4,
  },
  {
    name: '11:00', Events: null, Users: null, Closed: null, amt: 40,
  },
  {
    name: '12:00', Events: null, Users: null, Closed: null, amt: 14,
  },{
    name: '13:00', Events: null, Users: null, Closed: null, amt: 14,
  },
  {
    name: '14:00', Events: null, Users: null, Closed: null, amt: 21,
  },
  {
    name: '15:00', Events: null, Users: null, Closed: null, amt: 21,
  },
  {
    name: '16:00', Events: null, Users: null, Closed: null, amt: 32,
  },
  {
    name: '17:00', Events: null, Users: null, Closed: null, amt: 30,
  },
  {
    name: '18:00', Events: null, Users: null, Closed: null, amt: 0,
  },
  {
    name: '(19-23)', Events: null, Users: null, Closed: null, amt: 0,
  },
];
 
let currentHours = 0;
let max_hours = 18;

let usersCount = 0;
let eventsAmount = 0;
let endedAmount = 0;

let offSet = 0;
let isToDay = true;

//220421
// const dataBig = [];

const initational = () => {
  const cDate = new Date();
  return cDate.getDate() + '-' + (cDate.getMonth() + 1) + '-' + cDate.getFullYear()
}

///////////////////// Line Chart /////////////////////////////
const LineChartWrap = ({fetchAmountUsers,fetchAmountNewEventsForGraphicAsync,fetchAmountEndEventsForGraphicAsync,selectCountUsers,selectAmountEndedEvent,selectAmountNewEvent}) => { 
   
  const [curDate2,setCurDate2] = useState(initational);
  const [dataBig,setDataBig] = useState([]); 
  const [curDate,setCurDate] = useState(new Date())
  const [isFetchingUserOnline, setIsFetchingUserOnline] = useState(3)
 
    
  // console.log('curDate2', curDate2);

  /////////////////////////// - fetchAll - ///////////////////////////////////
  const fetchAll = useCallback((ofsParam=0) => {
    // console.log('fetchAll -- ofsParam',ofsParam);
    max_hours = 18; 
    let ofs = 0;
    const curDay = new Date();

    if (ofsParam === -1 && offSet === 0){ // оста
      isToDay = false; 
        
    }else if (ofsParam === 0 && offSet < 0){ // оста
      isToDay = false;
        
    }else if (ofsParam === 1 && offSet === -1){ // оста
      isToDay = true;
        
    }else if (ofsParam === 0 && offSet === 0){ // оста
      isToDay = true;
        
    }else if (ofsParam === 1 && offSet === 0){ // оста
        // setIsToDay(true);
        return
    } 
    

    ofs = ofsParam + offSet;

    // console.log('ofsParam',ofsParam);
    // console.log('offSet',offSet);
    
    ofs = parseInt(ofs);
    offSet =ofs; 
    curDay.setDate(curDay.getDate() + ofs); 

    setCurDate(curDay);

    // 220421
    setCurDate2(curDay.getDate() + '-' + (curDay.getMonth() + 1) + '-' + curDay.getFullYear());
    

    currentHours = parseInt(curDay.toISOString().split('T')[1].slice(0,2)) + 3;
    
    const todayStart = curDay.toISOString().split('T')[0] + 'T00:00:00.000Z';

    let todayEnd = curDay.toISOString().split('T')[0] + 'T23:00:00.000Z';  

    setIsFetchingUserOnline(3);

    const isData = dataBig.find(elem => { return elem[curDate2]})

    // console.log('isData',isData);
    if(!isData){
      fetchAmountUsers(todayStart,todayEnd);
      fetchAmountNewEventsForGraphicAsync(todayStart,todayEnd);
      fetchAmountEndEventsForGraphicAsync(todayStart,todayEnd);

    }else {
      setIsFetchingUserOnline(0);
    }
    
     

    dataInit0 = dataTmp;

  },[fetchAmountUsers, fetchAmountNewEventsForGraphicAsync, fetchAmountEndEventsForGraphicAsync, dataBig, curDate2]);
  
  /////////////////////////// - end fetchAll - ///////////////////////////////////


   
  useEffect(() => {

    dataTmp = dataInit;
    dataInit0 = dataInit;
    
    for (let index = 8; index <= 19; index++) { 
      const indexMinus = index -7;
      dataTmp[indexMinus] = {...dataInit[indexMinus], Events: null, Users: null, Closed: null};
      dataInit0[indexMinus] = {...dataTmp[indexMinus], Events: null, Users: null, Closed: null};
    }

    setTimeout(() => {
      fetchAll(0);
    }, 500);
    
    
  }, [fetchAll])
  
////////// -- User Online -- ////////////////////////////////////
  const getUsers = useCallback(() => {

    const usersLine = selectCountUsers.data.chartData;
    // console.log('selectCountUsers.data.chartData',selectCountUsers);
    if(isToDay) {
      max_hours = currentHours;
    }else {
      max_hours = 18;
    } 

    for (let index = 7; index <= 19; index++) {
      const indexMinus = index -7;
      dataTmp[indexMinus] = {...dataInit[indexMinus],  Users: null };
      dataInit0[indexMinus] = {...dataTmp[indexMinus],  Users: null };
    }
    //пользователи в начале дня
    const usersLine2 = usersLine.slice(0,7);
    const usersLine3 = reduce(usersLine2,(sum,n)=>(sum + n),0);
    const newObj = {...dataInit[0], Users: usersLine3};
    // dataTmp[0] = newObj;
    dataInit0[0] = newObj;
    if (isToDay){usersCount = usersLine3};

    

    //пользователи в середине дня
    for (let index = 8; index <= max_hours; index++) {
      const indexMinus = index -7;
      const newObjDay = {...dataTmp[indexMinus], Users: usersLine[index]};
      dataInit0[indexMinus] = newObjDay;
      // usersCount = usersLine[index];
      if (isToDay){
        usersCount = usersLine[index];
      }
    }
    // if(!isToDay) {usersCount = null;}

    //пользователи в конце дня
    if (currentHours > 17 || !isToDay){
      // console.log('if (currentHours > 17 || !isToDay)');
      const usersLine4 = usersLine.slice(18);
      const usersSumm = reduce(usersLine4,(sum,n)=>(sum + n),0);
      const newUsrEndDay = {...dataTmp[12], Users: usersSumm};
      dataInit0[12] = newUsrEndDay;
      if (isToDay){usersCount = usersSumm;}
    }

    // dataBig[curDate2] = dataInit0;
    // console.log('setDataBig1 -- dataInit0',dataInit0);
    setDataBig(prev => prev[curDate2] = dataInit0);
    // console.log('getUsers1 -- setDataBig',setDataBig);

  },[selectCountUsers, curDate2]);

  ////////////////// -- NewEvents -- ////////////////////
  const getNewEvents = useCallback(() => {
    const eventsLine = selectAmountNewEvent.data.chartData;
    if(isToDay) {
      max_hours = currentHours;
    }else {
      max_hours = 18;
    }

    const startDataNewEvent = eventsLine.slice(0,7);
    const startDataNewEventSum = reduce(startDataNewEvent,(sum,n)=>(sum + n),0);
    const newObjs = {...dataTmp[0], Events: startDataNewEventSum};
    dataInit0[0] = newObjs;
    if (isToDay){
      eventsAmount = startDataNewEventSum;
    }
    
    for (let index = 8; index <= 19; index++) {
      const indexMinus = index -7;
      dataTmp[indexMinus] = {...dataInit[indexMinus],  Events: null };
      dataInit0[indexMinus] = {...dataTmp[indexMinus],  Events: null };
    }
    
    const startNewEvent = eventsLine.slice(8,max_hours+1);
    startNewEvent.forEach((el,index) => {
      const indexPlus = index +1;
      const newObj = {...dataTmp[indexPlus], Events: el};
      dataInit0[indexPlus] = newObj;
      if (isToDay){
        eventsAmount = el;
      }
      
    });
    // if(!isToDay) { eventsAmount = null;}

    // NewEvents end day
    if (currentHours > 17 || !isToDay){
        const endDataNewEvent = eventsLine.slice(18);
        const endDataNewEventSum = reduce(endDataNewEvent,(sum,n)=>(sum + n),0);
        const newObjn = {...dataTmp[12], Events: endDataNewEventSum};
        dataInit0[12] = newObjn;
        if (isToDay){eventsAmount = endDataNewEventSum};
    }
    // console.log('setDataBig2 -- dataInit0',dataInit0);
    setDataBig(prev => prev[curDate2] = dataInit0);
    // console.log('getNewEvents2 -- setDataBig',setDataBig);
  },[selectAmountNewEvent,curDate2]);
  
  const getEndedEvents = useCallback(() => {
    const endedLine = selectAmountEndedEvent.data.chartData;
    if(isToDay) {
      max_hours = currentHours;
    }else {
      max_hours = 18;
    }

    //Ended Events start Day
    const startDataClose = endedLine.slice(0,7);
    const startDataCloseSum = reduce(startDataClose,(sum,n)=>(sum + n),0);
    const newObjc = {...dataTmp[0], Closed: startDataCloseSum};
    dataInit0[0] = newObjc;
    if (isToDay){
       endedAmount = startDataCloseSum;
    }

    for (let index = 8; index <= 19; index++) {
      const indexMinus = index -7;
      dataTmp[indexMinus] = {...dataInit[indexMinus],  Closed: null };
      dataInit0[indexMinus] = {...dataTmp[indexMinus],  Closed: null };
    }
    //Ended Events middle Day
    const startClose = endedLine.slice(8,max_hours+1);
    startClose.forEach((el,index) => {
      const indexPlus = index +1;
      const newObj = {...dataTmp[indexPlus], Closed: el};
      dataInit0[indexPlus] = newObj;
      if (isToDay){
        endedAmount = el;
      }
    });
    // if(!isToDay) { endedAmount = null;}
     
    //Ended Events ended Day 
    if (currentHours > 17 || !isToDay){
      const endDataClose = endedLine.slice(19,23);
      const endDataCloseSum = reduce(endDataClose,(sum,n)=>(sum + n),0);
      const newObjcs = {...dataTmp[12], Closed: endDataCloseSum};
      dataInit0[12] = newObjcs;
      if (isToDay){
        endedAmount = endDataCloseSum;
      }
    
    }
    // console.log('setDataBig3 -- dataInit0',dataInit0);
    setDataBig(prev => prev[curDate2] = dataInit0);
    // console.log('getEndedEvents3 -- dataTmp',dataTmp);
    // console.log('getEndedEvents3 -- dataBig',dataBig);
  },[selectAmountEndedEvent,curDate2]);
    
  useEffect(() => {
    setIsFetchingUserOnline(prev => prev -1);
    getUsers();
  },[selectCountUsers.data.chartData,getUsers])   

  useEffect(() => {
    setIsFetchingUserOnline(prev => prev -1);
    getNewEvents();
  },[selectAmountNewEvent.data.chartData,getNewEvents])  
  
  useEffect(() => {
      setIsFetchingUserOnline(prev => prev -1);
      getEndedEvents();
  },[selectAmountEndedEvent.data.chartData,getEndedEvents])  

  if(isFetchingUserOnline ){
    setIsFetchingUserOnline(0);
    return (<LineChartComp data={dataInit}  isFetchingUserOnline={isFetchingUserOnline} isToday={isToDay} dateLabel={curDate} usersCount={usersCount} eventsAmount={eventsAmount} endedAmount={endedAmount}  fetchAll={fetchAll} />)
  }

  return (
      <LineChartComp data={dataBig[curDate2]}  isFetchingUserOnline={isFetchingUserOnline} isToday={isToDay} dateLabel={curDate} usersCount={usersCount} eventsAmount={eventsAmount} endedAmount={endedAmount}  fetchAll={fetchAll} />
    )
     
} 

 
const mapStateToProps = createStructuredSelector ({
  selectCountUsers: selectCountUsersGraph,
  isFetchingUserOnline: selectIsFetchingUserOnline,
  selectAmountNewEvent: selectAmountEventGraph,
  selectAmountEndedEvent: selectAmountEndEventGraph,
});
 

const mapDispatchToProps = (dispatch) => ({
  fetchAmountUsers: (startDate, endDate) => dispatch(fetchAmountUsersForGraphicsAsync(startDate, endDate)),
  fetchAmountNewEventsForGraphicAsync: (startDate, endDate) => dispatch(fetchAmountNewEventsForGraphicAsync(startDate, endDate)),
  fetchAmountEndEventsForGraphicAsync: (startDate, endDate) => dispatch(fetchAmountEndEventsForGraphicAsync(startDate, endDate)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LineChartWrap);
 