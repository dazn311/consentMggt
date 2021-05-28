import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Avatar from '@material-ui/core/Avatar';

import { selectCountUsersGraph, selectIsFetchingUserOnline, selectAmountEventGraph, selectAmountEndEventGraph } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { fetchAmountUsersForGraphicsAsync,fetchAmountNewEventsForGraphicAsync,fetchAmountEndEventsForGraphicAsync } from '../../store/adminPanelTrest/adminPanelTrest.actions'; 
import RefreshIcon from '@material-ui/icons/Refresh';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';



let data = [
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
];

class LineChartWithXAxisPading extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/g03265a4/';
 


render() {
    const {countUsersGraph, fetchAmountUsersForGraphics, isFetchingUserOnline, selectAmountNewEvent, selectAmountEndedEvent,fetchAmountNewEventsForGraphic,fetchAmountEndEventsForGraphic} = this.props;

    const fetchDataForGraphics = () => {


      const currentHours = new Date().getHours();

      if ((currentHours < 8 && currentHours >= 0) ) {
        // отобразить за вчерашний день
        const currentDayOfWeek = new Date().getDay(); //.toLocaleString()//.toISOString();

        let offsetDay = 0;
        if ( currentDayOfWeek === 1) {
          offsetDay += 3
        }else if ( currentDayOfWeek === 7) {
          offsetDay += 2
        }else if ( currentDayOfWeek === 6) {
          offsetDay += 1
        }

        const yestoday = new Date();
        yestoday.setDate(yestoday.getDate() - offsetDay); 
         
        const yestodayStart = yestoday.toISOString().split('T')[0] + 'T08:00:00.000Z';
        const yestodayEnd = yestoday.toISOString().split('T')[0] + 'T19:00:00.000Z';

        fetchAmountNewEventsForGraphic(yestodayStart,yestodayEnd);
        fetchAmountEndEventsForGraphic(yestodayStart,yestodayEnd);
        fetchAmountUsersForGraphics(yestodayStart,yestodayEnd);
      } else {
        const today = new Date();

        const todayStart = today.toISOString().split('T')[0] + 'T08:00:00.000Z';
        const todayEnd = today.toISOString().split('T')[0] + 'T19:00:00.000Z';

        fetchAmountNewEventsForGraphic(todayStart,todayEnd);
        fetchAmountEndEventsForGraphic(todayStart,todayEnd);
        fetchAmountUsersForGraphics(todayStart,todayEnd);
      }

      
    }

    let usersCount = 0;
    let eventsAmount = 0;
    let endedAmount = 0;
    const usersLine = countUsersGraph.data.chartData;
    const eventsLine = selectAmountNewEvent.data.chartData;
    const endedLine = selectAmountEndedEvent.data.chartData;

    usersLine.forEach((el,index) => {
      const newObj = {...data[index], Users: el};
      usersCount = el;
      
      data[index] = newObj;
    }); 

    eventsLine.forEach((el,index) => {
      const newObj = {...data[index], Events: el};
      eventsAmount = el;
      
      data[index] = newObj;
    });
    endedLine.forEach((el,index) => {
      const newObj = {...data[index], Closed: el};
      endedAmount = el;
      
      data[index] = newObj;
    }); 

    // console.log(window.innerWidth);
    const styleLblUsersGraphic3 = !isFetchingUserOnline ? {position: 'absolute', top: '0px', right: '0px', color:'#483d93'}
    : {position: 'absolute', top: '0px', right: '0px', color:'#ccc'};
    
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
          <Legend  style={{bottom: '10px'}}/>
          <Line type="monotone" dataKey='Users' stroke="#8884d8" name='Польз. он-лайн' activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Events" name='Новые события' stroke="#82ca9d" />
          <Line type="monotone" dataKey="Closed" name='Закрытые событ.' stroke="#FFc000" />
          
        </LineChart>
        <div style={styleLblUsersGraphic3}>Текущие</div>
        <div><Avatar  style={styleLblUsersGraphic}>{usersCount}</Avatar></div>
        <div><Avatar  style={styleLblEventsGraphic}>{eventsAmount}</Avatar></div>
        <div ><Avatar style={styleLblEndedGraphic}>{endedAmount}</Avatar></div>
        <RefreshIcon id='btnUpdateGraphicUsers' onClick={fetchDataForGraphics} style={styleBtnUpdateUsersGraphic}/>
      </div>
    );
  } 
} 

 
const mapStateToProps = createStructuredSelector ({
  countUsersGraph: selectCountUsersGraph,
  isFetchingUserOnline: selectIsFetchingUserOnline,
  selectAmountNewEvent: selectAmountEventGraph,
  selectAmountEndedEvent: selectAmountEndEventGraph,
});
 
const mapDispatchToProps = (dispatch) => ({
  fetchAmountUsersForGraphics: (startDate, endDate) => dispatch(fetchAmountUsersForGraphicsAsync(startDate, endDate)),
  fetchAmountNewEventsForGraphic: (startDate, endDate) => dispatch(fetchAmountNewEventsForGraphicAsync(startDate, endDate)),
  fetchAmountEndEventsForGraphic: (startDate, endDate) => dispatch(fetchAmountEndEventsForGraphicAsync(startDate, endDate)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LineChartWithXAxisPading);
 