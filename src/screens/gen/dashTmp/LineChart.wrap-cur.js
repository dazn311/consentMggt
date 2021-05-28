import React, {useState,useEffect, useCallback }  from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { concat, reduce } from 'lodash'; 


 
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

const setToData = (dataForBeginDay, objName, objEmty) => {

    const shortInterval = dataForBeginDay.slice(0,7);
    const reducerInterval = reduce(shortInterval,(sum,n)=>(sum + n),0);
    // const newObj = {name: '(00-07)', Events: null, Users: null, Closed: null, amt: 3};
    const obj = {...objEmty, [objName]: reducerInterval};

    const dataTmp = obj;
    let elemCount = reducerInterval;
    return {elemCount,dataTmp};
}



const setToDataForEndDay = (dataForBeginDay, objName, objEmty) => {

    const shortInterval = dataForBeginDay.slice(18);
    const reducerInterval = reduce(shortInterval,(sum,n)=>(sum + n),0);
   
    const dataTmp = {...objEmty, [objName]: reducerInterval};
 
    let elemCount = reducerInterval;
    return {elemCount,dataTmp};
}





const setDataToDay = (dataForBeginDay, objName, objEmty) => {

    let tmpArr = []
    let elemCount = 0;

    const curDay = new Date();
    const currentHours = parseInt(curDay.toISOString().split('T')[1].slice(0,2)) + 3;

    let max_hours = currentHours;
    
    for (let index = 8; index <= max_hours; index++) {

        const indexMinus = index -7;
        const obj = {...objEmty,name: indexMinus, [objName]: dataForBeginDay[index]};
        tmpArr.push(obj);

        elemCount = dataForBeginDay[index];
        
    }

    return {elemCount,tmpArr};

}

let usersCount = 0;
let eventsAmount = 0;
let endedAmount = 0;

let dataEmty = [];


const LineChartWrap = ({fetchAmountUsers,fetchAmountNewEventsForGraphicAsync,fetchAmountEndEventsForGraphicAsync,selectCountUsers,selectAmountEndedEvent,selectAmountNewEvent}) => { 
  
  const [offSet,setOffset] = useState(0);
  const [data,setData] = useState(dataInit);
  const [isToDay,setIsToDay] = useState(true);
  const [curDate,setCurDate] = useState(new Date())
  const [isFetchingUserOnline, setisFetchingUserOnline] = useState(false)


  const fetchAll = useCallback((ofss=0) => {
     
    // console.log('fetchAll -- ofss: ', ofss);
    let ofs = 0;
    const curDay = new Date();
    currentHours = parseInt(curDay.toISOString().split('T')[1].slice(0,2)) + 3;

    if (ofss === 1 && offSet === 0){ // оста
      setIsToDay(true);
        return
    } 
    if (ofss === 1 && offSet === -1){ // оста
      setIsToDay(true);
    }else if(offSet < 0){
      setIsToDay(false);
    }
  
    ofs = ofss + offSet;
    
    ofs = parseInt(ofs);
    setOffset(ofs);
    curDay.setDate(curDay.getDate() + ofs);
    // console.log('curDay',curDay);

    setCurDate(curDay);

    
    
    const todayStart = curDay.toISOString().split('T')[0] + 'T00:00:00.000Z';

    let todayEnd = curDay.toISOString().split('T')[0] + 'T23:00:00.000Z';

    // console.log('todayEnd 1',todayEnd);
    if(isToDay){
      const currentHoursPlusOne = currentHours + 1;
      todayEnd = curDay.toISOString().split('T')[0] +'T'+ currentHoursPlusOne + ':00:00.000Z';
      // console.log('todayEnd 2',todayEnd);
      // console.log('currentHours 2',currentHours);
      // console.log('dataInit0 2',dataInit0);
    }
    
    console.log('todayEnd',todayEnd);
    console.log('dataInit0 2',dataInit0);

    fetchAmountUsers(todayStart,todayEnd);
    fetchAmountNewEventsForGraphicAsync(todayStart,todayEnd);
    fetchAmountEndEventsForGraphicAsync(todayStart,todayEnd);
     
  },[offSet]);
 

  console.log('isToDay',isToDay);

   
  
  useEffect(() => {
    fetchAll(0);

  }, [fetchAll])
  
  
  useEffect(() => {

    dataEmty = [];
    let objEmty = {name: '(00-07)', Events: null, Users: null, Closed: null, amt: 3};
    let objEmty2 = {name: '(00-07)', Events: null, Users: null, Closed: null, amt: 3};
    let objEmty3 = {name: '(00-07)', Events: null, Users: null, Closed: null, amt: 3};
    
    const usersLine = selectCountUsers.data.chartData;

    const eventsLine = selectAmountNewEvent.data.chartData;
    const endedLine = selectAmountEndedEvent.data.chartData;
    // console.log('usersLine 6',usersLine);
    // console.log('eventsLine 6',eventsLine);
    // console.log('endedLine 6',endedLine);

    // let usersCount = 0;
    // let eventsAmount = 0;
    // let endedAmount = 0;

    ///name: '(00-07)', Events: null, Users: null, Closed: null, amt: 3,

    const {elemCount,dataTmp} = setToData(usersLine, 'Users',objEmty );
    usersCount = elemCount;
    objEmty = dataTmp;
    
    const tmpObj = setToData(eventsLine, 'Events',objEmty );
    eventsAmount = tmpObj.elemCount;
    objEmty = tmpObj.dataTmp;

    const tmpEndObj = setToData(endedLine, 'Closed',objEmty );
    endedAmount = tmpEndObj.elemCount;
    objEmty = tmpEndObj.dataTmp;

    dataEmty.push(objEmty);
    


    if (isToDay) {

      const tmpData = setDataToDay(usersLine, 'Users', objEmty);
      usersCount = tmpData.elemCount;
      dataEmty.concat(tmpData.tmpArr);
      
      const tmpObj2 = setToData(eventsLine, 'Events',objEmty );
      eventsAmount = tmpObj2.elemCount;
      dataEmty.concat(tmpObj2.tmpArr);

      const tmpObj3 = setToData(endedLine, 'Closed',objEmty );
      endedAmount = tmpObj3.elemCount;
      dataEmty.concat(tmpObj3.tmpArr);

      if(currentHours > 18) {

        const tmpObj4 = setToDataForEndDay(usersLine, 'Users', objEmty);
        usersCount = tmpObj4.elemCount;
        objEmty2 = tmpObj4.dataTmp;

        const tmpObj5 = setToDataForEndDay(eventsLine, 'Events',objEmty );
        usersCount = tmpObj5.elemCount;
        objEmty2 = tmpObj5.dataTmp;

        const tmpObj6 = setToDataForEndDay(endedLine, 'Closed',objEmty );
        usersCount = tmpObj6.elemCount;
        objEmty2 = tmpObj6.dataTmp;

        dataEmty.push(objEmty2);
      }
      
    }
    

    // console.log('isToDay',isToDay);
    
    
    
    
    







    
    // //пользователи в середине дня
    // let max_hours = 18;
    // if(isToDay) {
      
    //   max_hours = currentHours;
    //   if(max_hours > 18){
    //     max_hours = 18;
    //   }
    //   // max_hours = parseInt(nowHours) -6;
    // }
    // // console.log('max_hours',max_hours);
    // // for (let index = 1; index < 12; index++) {
    // for (let index = 8; index <= max_hours; index++) {

    //   const indexMinus = index -7;
    //   // const newObjDay = {...dataTmp[indexMinus], Users: usersLine[index]};
    //   const newObjDay = {name: `(${index})`, Events: null, Users: usersLine[index], Closed: null, amt: 3};
    //   dataTmp[indexMinus] = newObjDay;
    //   usersCount = usersLine[index];
    //   // console.log('usersCount',usersCount);
    // }







    if (currentHours > 17){
      // //пользователи в конце дня
      // const usersLine4 = usersLine.slice(18);
      // const usersLine5 = reduce(usersLine4,(sum,n)=>(sum + n),0);
      // const newUsrEndDay = {...dataTmp[12], Users: usersLine5};
      // dataTmp[12] = newUsrEndDay;
      // usersCount = usersLine5;



    // const allArray = concat(usersLine, usersLineStartDay, usersLineEndDay);
    // usersCount = Math.max.apply(Math, usersLine);
    // var max_of_array = Math.max.apply(Math, array);
    // // console.log('data',data);
    
     

    // _.reduce([1, 2], function(sum, n) {
    //   return sum + n;
    // }, 0);
    // => 3

    }



    

    //////////////////////////////////////

    const startDataNewEvent = eventsLine.slice(0,7);
    const startDataNewEventSum = reduce(startDataNewEvent,(sum,n)=>(sum + n),0);
    const newObjs = {...dataTmp[0], Events: startDataNewEventSum};
    dataTmp[0] = newObjs;
    eventsAmount = startDataNewEventSum;
    

    const startNewEvent = eventsLine.slice(8,max_hours+1);
    startNewEvent.forEach((el,index) => {
      const indexPlus = index +1;
      const newObj = {...dataTmp[indexPlus], Events: el};
      dataTmp[indexPlus] = newObj;
      
        eventsAmount = el
      
    });
    
    // eventsLine.forEach((el,index) => {
    //   eventsAmount += el
    // });

    //////////////////////////////////////
    
    if (currentHours > 17){
    // event end day
    const endDataNewEvent = eventsLine.slice(18);
    const endDataNewEventSum = reduce(endDataNewEvent,(sum,n)=>(sum + n),0);
    const newObjn = {...dataTmp[12], Events: endDataNewEventSum};
    dataTmp[12] = newObjn;
    eventsAmount = endDataNewEventSum;
    }

    //close startDay
    const startDataClose = endedLine.slice(0,7);
    const startDataCloseSum = reduce(startDataClose,(sum,n)=>(sum + n),0);
    const newObjc = {...dataTmp[0], Closed: startDataCloseSum};
    dataTmp[0] = newObjc;
    endedAmount = startDataCloseSum;

    const startClose = endedLine.slice(8,max_hours+1);
    startClose.forEach((el,index) => {
      const indexPlus = index +1;
      const newObj = {...dataTmp[indexPlus], Closed: el};
      dataTmp[indexPlus] = newObj;

        endedAmount = el
      
    });

     

    if (currentHours > 17){
    const endDataClose = endedLine.slice(19,23);
    const endDataCloseSum = reduce(endDataClose,(sum,n)=>(sum + n),0);
    const newObjcs = {...dataTmp[12], Closed: endDataCloseSum};
    dataTmp[12] = newObjcs;
    endedAmount = endDataCloseSum
    }

    dataInit0 = dataTmp;

  }, [selectCountUsers, selectAmountNewEvent, selectAmountEndedEvent])
  


    
    // setData(dataTmp);


    // setCurDate(curDate); 
      
    return (
      <LineChartComp data={dataTmp}  isFetchingUserOnline={isFetchingUserOnline} isToday={isToDay} dateLabel={curDate} usersCount={usersCount} eventsAmount={eventsAmount} endedAmount={endedAmount}  fetchAll={fetchAll} />
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
 