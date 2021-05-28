import React, {useState,useEffect, useCallback }  from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { concat, reduce } from 'lodash'; 



import LineChartComp from './LineChartWithXAxisPading';

import { selectCountUsersGraph, selectIsFetchingUserOnline, selectAmountEventGraph, selectAmountEndEventGraph, selectCountUsersOfStartDayGraph , selectCountUsersOfEndDayGraph } from '../../store/adminPanelTrest/adminPanelTrest.selectors';

import { fetchAmountUsersForGraphicsAsync,fetchAmountNewEventsForGraphicAsync,fetchAmountEndEventsForGraphicAsync,fetchAmountUsersOfStartDayGraphicsAsync, fetchAmountUsersOfEndDayGraphicsAsync  } from '../../store/adminPanelTrest/adminPanelTrest.actions'; 



 

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
 

const LineChartWrap = ({fetchAmountUsersForGraphicsAsync,fetchAmountUsersOfStartDayGraphicsAsync,fetchAmountUsersOfEndDayGraphicsAsync, fetchAmountNewEventsForGraphicAsync,fetchAmountEndEventsForGraphicAsync,countUsersGraph,selectCountUsersOfStartDay,selectAmountEndedEvent,selectAmountNewEvent,selectCountUsersOfEndDay}) => { 
  
  const [offSet,setOffset] = useState(0);
  const [data,setData] = useState(dataInit);
  const [curDate,setCurDate] = useState(new Date())
  const [isFetchingUserOnline,setisFetchingUserOnline] = useState(false)
    
  
 
  useEffect(() => {
    fetchAll(0);
  }, [])
  

  const setOffs = React.useCallback(
    
    (ofs) => {
      // console.log('setOffs start');
      const newCurDate = new Date();
      let ofsss = ofs + offSet;
      newCurDate.setDate(newCurDate.getDate() + ofsss);

      ofsss = parseInt(ofsss);

      
      if (ofs === 1) {
        setOffset(prevOffSet => prevOffSet +1);
      }
      if (ofs === -1) {
        setOffset(prevOffSet => prevOffSet -1);
      }
      
      // console.log('ofsss',ofsss);

      // console.log('newCurDate',newCurDate);
      setCurDate(newCurDate);


    },
    [offSet],
  )

  const fetchAll = (ofss=0) => {
     
    // console.log('fetchAll', ofss);
    // console.log('offSet',offSet);
    let ofs = 0;
    const curDay = new Date();
    // if (ofss === 1 && offSet === 0){return}
    if (ofss === 1 && offSet === 0){ // останавливает в будущее время
        // console.log('curDay ofs',ofs);
        return
    } 
  
    ofs = ofss + offSet;
    // console.log('offSet',offSet);
    // console.log('ofs',ofs);
    
    ofs = parseInt(ofs);
    setOffs(ofss);
    curDay.setDate(curDay.getDate() + ofs);
       

    
    
    const currentHours = parseInt(curDay.toISOString().split('T')[1].slice(0,2)) + 3;
    // console.log('currentHours',currentHours);

    const todayStartDay = curDay.toISOString().split('T')[0] + 'T00:00:00.000Z';
    const todayStartDay2 = curDay.toISOString().split('T')[0] + 'T07:00:00.000Z';

    const todayStart = curDay.toISOString().split('T')[0] + 'T08:00:00.000Z';
    let todayEnd = curDay.toISOString().split('T')[0] + 'T19:00:00.000Z';

    const StartDay = curDay.toISOString().split('T')[0] + 'T00:00:00.000Z';
    let EndDay = curDay.toISOString().split('T')[0] + 'T23:00:00.000Z';
    

    fetchAmountUsersOfStartDayGraphicsAsync(todayStartDay,todayStartDay2);

    if (currentHours > 18){
      const todayEndDay = curDay.toISOString().split('T')[0] + 'T20:00:00.000Z';
      const todayEndDay2 = curDay.toISOString().split('T')[0] + 'T23:00:00.000Z';
      fetchAmountUsersOfEndDayGraphicsAsync(todayEndDay,todayEndDay2);
    }else {
      todayEnd = curDay;
      todayEnd.setDate(curDay.getDate() + 2);
      // todayEnd.setDate(curDay.getDate() + 2);
      // console.log('todayEnd',todayEnd);

      EndDay = todayEnd;
    }
    // console.log('todayEnd',todayEnd);
    fetchAmountUsersForGraphicsAsync(todayStart,todayEnd);
    
    fetchAmountNewEventsForGraphicAsync(StartDay,EndDay);
    fetchAmountEndEventsForGraphicAsync(StartDay,EndDay);
  }

  
 
 
    // console.log('curDate',curDate);
    const today = new Date();
    const stateDate = curDate.getDate().toString();
    const today3=today.getDate().toString();
    const nowHours=today.getHours().toString();
    // console.log('nowHours',nowHours);
    let isToday = false;
    if (stateDate === today3) {
      isToday = true;
    }
    let usersCount = 0;
    let eventsAmount = 0;
    let endedAmount = 0;

    const usersLine = countUsersGraph.data.chartData;
    const usersLineStartDay = selectCountUsersOfStartDay.online;
    const usersLineEndDay = selectCountUsersOfEndDay.online;

    const eventsLine = selectAmountNewEvent.data.chartData;
    const endedLine = selectAmountEndedEvent.data.chartData;

   let ddddd = new Date().toISOString();
   let nowD = ddddd.split('T')[1].slice(0,2);

  //  // console.log('ddddd',ddddd.split('T')[1].slice(0,2)); 
   
    const newObj = {...dataTmp[0], Users: usersLineStartDay};
    dataTmp[0] = newObj;

    let max_hours = 12;
    if(isToday) {
      max_hours = parseInt(nowHours) -6;
    }

    // for (let index = 1; index < 12; index++) {
    for (let index = 1; index < max_hours; index++) {

      const indexMinus = index -1;
      const newObjDay = {...dataTmp[index], Users: usersLine[indexMinus]};
      dataTmp[index] = newObjDay;
      
    }

    const newObjEndDay = {...dataTmp[12], Users: usersLineEndDay};
    dataTmp[12] = newObjEndDay;

    const allArray = concat(usersLine, usersLineStartDay, usersLineEndDay);
    usersCount = Math.max.apply(Math, allArray);
    // var max_of_array = Math.max.apply(Math, array);
    // // console.log('data',data);
    
     

    // _.reduce([1, 2], function(sum, n) {
    //   return sum + n;
    // }, 0);
    // => 3

    //////////////////////////////////////

    const startDataNewEvent = eventsLine.slice(0,7);
    const startDataNewEventSum = reduce(startDataNewEvent,(sum,n)=>(sum + n),0);
    const newObjs = {...dataTmp[0], Events: startDataNewEventSum};
    dataTmp[0] = newObjs;

    if(isToday) {
      max_hours = parseInt(nowHours) +1;
      if (max_hours >19){
        max_hours = 19;
      }
    }else {
      max_hours = 19;
    }

    const startNewEvent = eventsLine.slice(8,max_hours);
    startNewEvent.forEach((el,index) => {
      const indexPlus = index +1;
      const newObj = {...dataTmp[indexPlus], Events: el};
      dataTmp[indexPlus] = newObj;
      if(nowD === dataTmp[indexPlus].name.slice(0,2)){
        // eventsAmount = el
      }
    });
    
    eventsLine.forEach((el,index) => {
      eventsAmount += el
    });

    //////////////////////////////////////

    const endDataNewEvent = eventsLine.slice(19,23);
    const endDataNewEventSum = reduce(endDataNewEvent,(sum,n)=>(sum + n),0);
    const newObjn = {...dataTmp[12], Events: endDataNewEventSum};
    dataTmp[12] = newObjn;


    //close
    const startDataClose = endedLine.slice(0,7);
    const startDataCloseSum = reduce(startDataClose,(sum,n)=>(sum + n),0);
    const newObjc = {...dataTmp[0], Closed: startDataCloseSum};
    dataTmp[0] = newObjc;

    const startClose = endedLine.slice(8,max_hours);
    startClose.forEach((el,index) => {
      const indexPlus = index +1;
      const newObj = {...dataTmp[indexPlus], Closed: el};
      dataTmp[indexPlus] = newObj;

      if(nowD === dataTmp[indexPlus].name.slice(0,2)){
        // endedAmount = el
      }
    });

    endedLine.forEach((el,index) => {
      endedAmount += el
    });

    const endDataClose = endedLine.slice(19,23);
    const endDataCloseSum = reduce(endDataClose,(sum,n)=>(sum + n),0);
    const newObjcs = {...dataTmp[12], Closed: endDataCloseSum};
    dataTmp[12] = newObjcs;
    

    return (
      <LineChartComp data={dataTmp}  isFetchingUserOnline={isFetchingUserOnline} isToday={isToday} dateLabel={curDate} usersCount={usersCount} eventsAmount={eventsAmount} endedAmount={endedAmount}  fetchAll={fetchAll} />
    )

     
} 

 
const mapStateToProps = createStructuredSelector ({
  countUsersGraph: selectCountUsersGraph,
  selectCountUsersOfStartDay: selectCountUsersOfStartDayGraph,
  selectCountUsersOfEndDay: selectCountUsersOfEndDayGraph,
  isFetchingUserOnline: selectIsFetchingUserOnline,
  selectAmountNewEvent: selectAmountEventGraph,
  selectAmountEndedEvent: selectAmountEndEventGraph,
});
 

const mapDispatchToProps = (dispatch) => ({
  fetchAmountUsersForGraphicsAsync: (startDate, endDate) => dispatch(fetchAmountUsersForGraphicsAsync(startDate, endDate)),
  fetchAmountUsersOfStartDayGraphicsAsync: (startDate, endDate) => dispatch(fetchAmountUsersOfStartDayGraphicsAsync(startDate, endDate)),
  fetchAmountUsersOfEndDayGraphicsAsync: (startDate, endDate) => dispatch(fetchAmountUsersOfEndDayGraphicsAsync(startDate, endDate)),
  fetchAmountNewEventsForGraphicAsync: (startDate, endDate) => dispatch(fetchAmountNewEventsForGraphicAsync(startDate, endDate)),
  fetchAmountEndEventsForGraphicAsync: (startDate, endDate) => dispatch(fetchAmountEndEventsForGraphicAsync(startDate, endDate)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LineChartWrap);
 