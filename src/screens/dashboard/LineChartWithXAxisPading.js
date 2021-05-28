import React, { PureComponent } from 'react';

import Avatar from '@material-ui/core/Avatar';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

class LineChartWithXAxisPading extends PureComponent {

render() {
    const {fetchAll, data, isFetchingUserOnline,  isToday,dateLabel ,usersCount, eventsAmount, endedAmount} = this.props;

 
    const winWidth = window.innerWidth; 
    let windthLine = 500 - 20;
    let leftLine = 20;
    let rightLine = 20;
    let displayVal = 'flex';
    let mleft = -25, mbottom = -10, mright = 0;

    if (winWidth === 320){
      windthLine = 280;
      leftLine = 15;
      rightLine = 15;
      displayVal = 'none';
      mleft = -35; mbottom = -0; mright = 20;
    }else if (winWidth === 375){
      windthLine = 340;
      leftLine = 10;
      rightLine = 20;
      displayVal = 'none';
      mleft = -35; mbottom = -0; mright = 10;
    }else if (winWidth === 414){
      windthLine = 370;
      leftLine = 10;
      rightLine = 20;
      displayVal = 'none';
      mleft = -35; mbottom = -0; mright = 0;
    }else if (winWidth === 412){ // Samsung A51
      windthLine = 360;
      leftLine = 10;
      rightLine = 20;
      displayVal = 'none';
      mleft = -35; mbottom = -0; mright = 0;
    } else if (winWidth === 360){ // Samsung A51
      windthLine = 320;
      leftLine = 10;
      rightLine = 20;
      displayVal = 'none';
      mleft = -35; mbottom = -0; mright = 0;
    } else if (winWidth === 1024){ // Samsung A51
      windthLine = 450;
      leftLine = 10;
      rightLine = 20;
      displayVal = 'none';
      mleft = -35; mbottom = -0; mright = 0; 
    } 
    //  else if (winWidth < 360){ // Samsung A51
    //   windthLine = 280;
    //   leftLine = 10;
    //   rightLine = 10;
    //   displayVal = 'none';
    //   mleft = -35; mbottom = -35; mright = 10;
    // } 

    const styleLblUsersGraphicDate = !isFetchingUserOnline
        ? {position: 'relative',  color:'green',display: displayVal, alignItems: 'flex-start',justifyContent: 'center',maxHeight: 25}
        : {position: 'relative' , color:'#ccc',display: displayVal, alignItems: 'flex-start',justifyContent: 'center',maxHeight: 25}
    
    const styleLblUsersGraphic = !isFetchingUserOnline
        ? {position: 'relative', color:'white',display: displayVal, backgroundColor:'#8884d8',width:'30px',height: 30, margin: '4px 25px'}
        : {position: 'relative', color:'#ccc',display: displayVal,width:'30px',height: 30, margin: '4px 25px', backgroundColor:'#8884d8'};

    const styleLblEventsGraphic = !isFetchingUserOnline
        ? {position: 'relative',  color:'black',display: displayVal, backgroundColor:'rgb(130, 202, 157)',width:'30px',height: 30, margin: '4px 25px'}
        : {position: 'relative',  backgroundColor:'#91c1b4', color:'#ccc',display: displayVal,width:'30px',height: 30, margin: '4px 25px'};

    
    const styleLblEndedGraphic = !isFetchingUserOnline
        ? {position: 'relative', color:'black',display: displayVal, backgroundColor:'#FFc000',width:'30px',height: 30, margin: '4px 25px'}
        : {position: 'relative',  color:'#ccc',display: displayVal,width:'30px',height: 30, margin: '4px 25px', backgroundColor:'#FFc000'};


    const styleBtnUpdateUsersGraphic = isFetchingUserOnline
        ? {position: 'relative',display: displayVal, cursor:'pointer', transition: 'transform 0.2s'}
        :{position: 'relative',display: displayVal, cursor:'pointer', transform: 'rotate(-45deg)', color:'red'};

    return (
      <div id='graphics' style={{ position:'relative', display:'flex',   justifyContent: 'space-between',width:'100%' }}>
        <LineChart  width={windthLine} height={200} data={data} margin={{ top: 8, left: mleft, bottom: mbottom, right: mright}}  >
          <CartesianGrid strokeDasharray="8 3" />
          <XAxis dataKey="name" padding={{ left: leftLine, right: rightLine }} />
          <YAxis padding={{ top: 5, bottom: 5}} />
          <Tooltip />
          <Legend  margin={{bottom:0}} />
          <Line type="monotone" dataKey='Users' stroke="#8884d8" name='Польз. он-лайн'  activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Events" name='Новые события' stroke="#82ca9d" />
          <Line type="monotone" dataKey="Closed" name='Закрытые событ.' stroke="#FFc000" />
          
        </LineChart>
        
        <div style={{ position: 'relative',display: displayVal, flexWrap: 'wrap',  maxWidth: 80, justifyContent: 'center', marginLeft: 20}} >
            <div style={{position: 'absolute', right:'12px', transform: 'rotate(270deg)', top: '100px', whiteSpace: 'nowrap'}}>Текущие данные</div>
            <div style={styleLblUsersGraphicDate}>
              <ArrowLeftIcon className='arrow-prev' fontSize="default"  onClick={() => {fetchAll(-1)}} color="secondary" />
              <div style={{alignSelf:'center'}} >{dateLabel.toISOString().slice(8,10)}/{dateLabel.toISOString().slice(5,7)} </div> 
              <ArrowRightIcon className={!isToday && 'arrow-prev'} disabled={isToday} onClick={() => {fetchAll(1)}}  color={isToday ? 'disabled' : 'error'}/>
        </div>
            
            <Avatar  style={styleLblUsersGraphic}>{usersCount}</Avatar>
            <Avatar  style={styleLblEventsGraphic}>{eventsAmount}</Avatar> 
            <Avatar style={styleLblEndedGraphic}>{endedAmount}</Avatar> 
            
            
            <IconButton color="secondary" aria-label="add an alarm">
              <RefreshIcon  id='btnUpdateGraphicUsers'  style={styleBtnUpdateUsersGraphic} onClick={() => {fetchAll(0)}}/>
            </IconButton>
        </div>
      </div>
    );
  } 
} 

 
export default LineChartWithXAxisPading;
 