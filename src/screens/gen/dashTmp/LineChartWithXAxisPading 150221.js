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
      fetchAmountUsersForGraphics();
      fetchAmountNewEventsForGraphic();
      fetchAmountEndEventsForGraphic();
    }
    // const classes = myStyles();
    const MinTime = 8;
    // const MaxTime = 18;
    //countUsersGraph.data.chartData.slice(7,17);
    const currentDate = new Date();
    const cD = currentDate.toString().split(' ')[4].split(':')[0];
    // console.log(('cD',cD));
    // const dl = MaxTime - dd
    let dl2 = +cD - MinTime +2;
    // console.log('dl2',dl2);
    if (dl2 > 8){
      // dl2 = 8;
    }
    // console.log('countUsersGraph.data.chartData.slice(-dl2)', countUsersGraph.data.chartData.slice(-dl2));
    let usersCount = 0;
    let eventsAmount = 0;
    let endedAmount = 0;
    const usersLine = countUsersGraph.data.chartData.slice(-dl2);
    const eventsLine = selectAmountNewEvent.data.chartData.slice(-dl2);
    const endedLine = selectAmountEndedEvent.data.chartData.slice(-dl2);

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
      <div id='graphics' style={{ position:'relative',overflow: 'hidden'}}>
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
  fetchAmountUsersForGraphics: () => dispatch(fetchAmountUsersForGraphicsAsync()),
  fetchAmountNewEventsForGraphic: () => dispatch(fetchAmountNewEventsForGraphicAsync()),
  fetchAmountEndEventsForGraphic: () => dispatch(fetchAmountEndEventsForGraphicAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LineChartWithXAxisPading);
