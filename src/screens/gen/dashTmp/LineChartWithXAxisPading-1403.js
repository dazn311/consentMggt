import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { concat, reduce } from 'lodash'; 

import Avatar from '@material-ui/core/Avatar';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RefreshIcon from '@material-ui/icons/Refresh';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import { selectCountUsersGraph, selectIsFetchingUserOnline, selectAmountEventGraph, selectAmountEndEventGraph, selectCountUsersOfStartDayGraph , selectCountUsersOfEndDayGraph } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { fetchAmountUsersForGraphicsAsync,fetchAmountNewEventsForGraphicAsync,fetchAmountEndEventsForGraphicAsync,fetchAmountUsersOfStartDayGraphicsAsync, fetchAmountUsersOfEndDayGraphicsAsync } from '../../store/adminPanelTrest/adminPanelTrest.actions'; 



 

let data = [
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

class LineChartWithXAxisPading extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/g03265a4/';

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      date: new Date()
    };
    this.fetchAll = this.fetchAll.bind(this);
    this.setOffset = this.setOffset.bind(this);
  }

  componentDidMount() {
    // const { fetchCollectionsStartAsync } = this.props;
    this.fetchAll();
  }



  setOffset(ofs) {
    const dd = new Date();
    const ofsss = ofs + this.state.offset;
    dd.setDate(dd.getDate() + ofsss);

    this.setState(({offset}) => ({
      date: dd,
      offset: offset + ofs
    }))
    console.log('this.state.offset',this.state.offset);
  }

  fetchAll(ofss=0) {
    const{fetchAmountUsersForGraphicsAsync,fetchAmountUsersOfStartDayGraphicsAsync,fetchAmountUsersOfEndDayGraphicsAsync, fetchAmountNewEventsForGraphicAsync,fetchAmountEndEventsForGraphicAsync} = this.props;

    let ofs = 0;
    const today = new Date();
    // if (ofss === 1 && this.state.offset === 0){return}
    if (ofss === 1 && this.state.offset === -1){
        console.log('today ofs',ofs);
    }else {
      ofs = ofss + this.state.offset;
      // console.log('ofs',ofs);
      
      this.setOffset(ofss);
      today.setDate(today.getDate() + ofs);
    }

    
    
    

     
    
    
    const currentHours = parseInt(today.toISOString().split('T')[1].slice(0,2)) + 3;
    console.log('currentHours',currentHours);

    const todayStartDay = today.toISOString().split('T')[0] + 'T00:00:00.000Z';
    const todayStartDay2 = today.toISOString().split('T')[0] + 'T07:00:00.000Z';

    const todayStart = today.toISOString().split('T')[0] + 'T08:00:00.000Z';
    let todayEnd = today.toISOString().split('T')[0] + 'T19:00:00.000Z';

    const StartDay = today.toISOString().split('T')[0] + 'T00:00:00.000Z';
    let EndDay = today.toISOString().split('T')[0] + 'T23:00:00.000Z';
    

    
    fetchAmountUsersOfStartDayGraphicsAsync(todayStartDay,todayStartDay2);

    if (currentHours > 18){
      const todayEndDay = today.toISOString().split('T')[0] + 'T20:00:00.000Z';
      const todayEndDay2 = today.toISOString().split('T')[0] + 'T23:00:00.000Z';
      fetchAmountUsersOfEndDayGraphicsAsync(todayEndDay,todayEndDay2);
    }else {
      todayEnd = today;
      todayEnd.setDate(today.getDate() + 2);
      // console.log('todayEnd',todayEnd);

      EndDay = todayEnd;
    }

    fetchAmountUsersForGraphicsAsync(todayStart,todayEnd);
    
    fetchAmountNewEventsForGraphicAsync(StartDay,EndDay);
    fetchAmountEndEventsForGraphicAsync(StartDay,EndDay);
  }


render() {
    const {countUsersGraph, isFetchingUserOnline, selectAmountNewEvent, selectAmountEndedEvent,selectCountUsersOfStartDay , selectCountUsersOfEndDay} = this.props;

    console.log('render LineChartWithXAxisPading');
    const { date } = this.state;
    const today = new Date();
    const stateDate = date.getDate().toString();
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
   
    const newObj = {...data[0], Users: usersLineStartDay};
    data[0] = newObj;

    let max_hours = 12;
    if(isToday) {
      max_hours = parseInt(nowHours) -6;
    }

    // for (let index = 1; index < 12; index++) {
    for (let index = 1; index < max_hours; index++) {

      const indexMinus = index -1;
      const newObjDay = {...data[index], Users: usersLine[indexMinus]};
      data[index] = newObjDay;
      
    }

    const newObjEndDay = {...data[12], Users: usersLineEndDay};
    data[12] = newObjEndDay;

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
    const newObjs = {...data[0], Events: startDataNewEventSum};
    data[0] = newObjs;

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
      const newObj = {...data[indexPlus], Events: el};
      data[indexPlus] = newObj;
      if(nowD === data[indexPlus].name.slice(0,2)){
        // eventsAmount = el
      }
    });
    
    eventsLine.forEach((el,index) => {
      eventsAmount += el
    });

    //////////////////////////////////////

    const endDataNewEvent = eventsLine.slice(19,23);
    const endDataNewEventSum = reduce(endDataNewEvent,(sum,n)=>(sum + n),0);
    const newObjn = {...data[12], Events: endDataNewEventSum};
    data[12] = newObjn;


    //close
    const startDataClose = endedLine.slice(0,7);
    const startDataCloseSum = reduce(startDataClose,(sum,n)=>(sum + n),0);
    const newObjc = {...data[0], Closed: startDataCloseSum};
    data[0] = newObjc;

    const startClose = endedLine.slice(8,max_hours);
    startClose.forEach((el,index) => {
      const indexPlus = index +1;
      const newObj = {...data[indexPlus], Closed: el};
      data[indexPlus] = newObj;

      if(nowD === data[indexPlus].name.slice(0,2)){
        // endedAmount = el
      }
    });

    endedLine.forEach((el,index) => {
      endedAmount += el
    });

    const endDataClose = endedLine.slice(19,23);
    const endDataCloseSum = reduce(endDataClose,(sum,n)=>(sum + n),0);
    const newObjcs = {...data[12], Closed: endDataCloseSum};
    data[12] = newObjcs;

    


    // // console.log(window.innerWidth);
    const styleLblUsersGraphic3 = !isFetchingUserOnline ? {position: 'absolute', top: '-40px', right: '-15px', color:'#483d93',display: 'flex', alignItems: 'center'}
    : {position: 'absolute', top: '-30px', right: '0px', color:'#ccc',display: 'flex', alignItems: 'center'};
    
    const styleLblUsersGraphic = !isFetchingUserOnline ? {position: 'absolute', top: '25px', right: '10px', color:'white', backgroundColor:'rgb(136, 132, 216)',width:'30px',height: 30}
    : {position: 'absolute', top: '25px', right: '10px', color:'#ccc',width:'30px',height: 30};

    const styleLblEventsGraphic = !isFetchingUserOnline ? {position: 'absolute', top: '60px', right: '10px', color:'black', backgroundColor:'rgb(130, 202, 157)',width:'30px',height: 30}
    : {position: 'absolute', top: '60px', right: '10px', backgroundColor:'#91c1b4', color:'#ccc',width:'30px',height: 30};

    
    const styleLblEndedGraphic = !isFetchingUserOnline ? {position: 'absolute', top: '100px', right: '10px', color:'black', backgroundColor:'rgb(255, 192, 0)',width:'30px',height: 30}
    : {position: 'absolute', top: '100px', right: '10px', color:'#ccc',width:'30px',height: 30};


    const styleBtnUpdateUsersGraphic = isFetchingUserOnline ? {position: 'absolute', bottom: '10px', right: '18px', cursor:'pointer', transition: 'transform 0.2s'}
    :{position: 'absolute', bottom: '10px', right: '15px', cursor:'pointer', transform: 'rotate(-45deg)', color:'red'};
    
    
    const winWidth = window.innerWidth;
    let windthLine = 500;
    let leftLine = 30;
    let rightLine = 30;

    if (winWidth < 400){
      windthLine = 250;
      leftLine = 10;
      rightLine = 10;
    }
     
    return (
      <div id='graphics' style={{ position:'relative'}}>
        <LineChart width={windthLine} height={200} data={data} >
          <CartesianGrid strokeDasharray="8 1" />
          <XAxis dataKey="name" padding={{ left: leftLine, right: rightLine }} />
          <YAxis />
          <Tooltip />
          <Legend  style={{bottom: '0px'}}/>
          <Line type="monotone" dataKey='Users' stroke="#8884d8" name='Польз. он-лайн' activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Events" name='Новые события' stroke="#82ca9d" />
          <Line type="monotone" dataKey="Closed" name='Закрытые событ.' stroke="#FFc000" />
          
        </LineChart>
       
        <div style={styleLblUsersGraphic3}>
          <ArrowLeftIcon onClick={() => {this.fetchAll(-1)}} color="secondary" />
            {date.toISOString().slice(8,10)}/{date.toISOString().slice(5,7)} 
          <ArrowRightIcon disabled={isToday} onClick={() => {this.fetchAll(1)}}  color={isToday ? 'disabled' : 'error'}/>
        </div>
        
        <div><Avatar  style={styleLblUsersGraphic}>{usersCount}</Avatar></div>
        <div><Avatar  style={styleLblEventsGraphic}>{eventsAmount}</Avatar></div>
        <div ><Avatar style={styleLblEndedGraphic}>{endedAmount}</Avatar></div>
        <RefreshIcon id='btnUpdateGraphicUsers'  style={styleBtnUpdateUsersGraphic} onClick={() => {this.fetchAll(0)}}/>
      </div>
    );
  } 
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
export default connect(mapStateToProps, mapDispatchToProps)(LineChartWithXAxisPading);
 