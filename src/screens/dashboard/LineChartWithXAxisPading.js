import React, {PureComponent} from 'react';

import Avatar from '@material-ui/core/Avatar';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import LineChartStyles from "./LineChartWithXAxisPading.styles";

class LineChartWithXAxisPadding extends PureComponent {

    render() {
        const { fetchAll, data,  isFetchingUserOnline, isToday = false, dateLabel, usersCount, eventsAmount,  endedAmount  } = this.props;


        let { styleLblUsers2, styleLblUsers,  styleLblEvents, styleLblEnded, styleBtnUpdateUsers, displayVal, widthLine, leftLine, rightLine,  mLeft, mBottom,  mRight } = LineChartStyles
        // console.log('isFetchingUserOnline',isFetchingUserOnline)
        //winWidth = window.innerWidth;
        const styleLblUsersGraphicDate = isFetchingUserOnline  ? styleLblUsers2 : {...styleLblUsers2, color: '#ccc', opacity: 0.1  }
        const styleLblUsersGraphic = isFetchingUserOnline ? styleLblUsers : {...styleLblUsers,color: '#ccc',backgroundColor: '#8884d8' };
        const styleLblEventsGraphic = isFetchingUserOnline  ?styleLblEvents: {...styleLblEvents, backgroundColor: '#91c1b4', color: '#ccc' }
        const styleLblEndedGraphic = isFetchingUserOnline ? styleLblEnded : {...styleLblEnded,  color: '#ccc'};
        const styleBtnUpdateUsersGraphic = isFetchingUserOnline ? styleBtnUpdateUsers  : {...styleBtnUpdateUsers,   transform: 'rotate(-45deg)', color: 'red'  };

        // console.log('widthLine',widthLine)
        return (
            <div id='line-chart-with-axis-padding-f' style={{position: 'relative', display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <div className='line-chart-wrap' style={{width: widthLine, minWidth: widthLine  }} >
                    <LineChart width={widthLine} height={200} data={data} margin={{top: 8, left:  mLeft, bottom: mBottom, right:  mRight}}>
                        <CartesianGrid strokeDasharray="8 3"/>

                        <XAxis dataKey="name" padding={{left: leftLine, right: rightLine}}/>
                        <YAxis padding={{top: 5, bottom: 5}}/>

                        <Tooltip/>
                        <Legend margin={{bottom: 0}}/>

                        <Line type="monotone" dataKey='Users' stroke="#8884d8" name='Польз. он-лайн' activeDot={{r: 8}}/>
                        <Line type="monotone" dataKey="Events" name='Новые события' stroke="#82ca9d"/>
                        <Line type="monotone" dataKey="Closed" name='Закрытые событ.' stroke="#FFc000"/>

                    </LineChart>
                </div>


                <div className='line-chart__panel' style={{ position: 'relative', display: displayVal, flexWrap: 'wrap', maxWidth: 80,  justifyContent: 'center',  marginLeft: 20  }}>

                    <div style={{ position: 'absolute', right: '12px', transform: 'rotate(270deg)',  top: '100px', whiteSpace: 'nowrap' }}>Текущие данные</div>

                    <div className='line-chart__panel-change-date' style={styleLblUsersGraphicDate} >
                        <ArrowLeftIcon  className='arrow-prev' fontSize="default" onClick={() => { isFetchingUserOnline && fetchAll(-1) }} color="secondary"/>
                        <div style={{alignSelf: 'center'}}>{dateLabel.slice(8, 10)}/{dateLabel.slice(5, 7)} </div>
                        <ArrowRightIcon className={isToday ? 'none': 'arrow-prev'} disabled={isToday} onClick={() => { isFetchingUserOnline &&  fetchAll(1)  }} color={isToday ? 'disabled' : 'error'}/>
                    </div>

                    <Avatar style={styleLblUsersGraphic}>{usersCount}</Avatar>
                    <Avatar style={styleLblEventsGraphic}>{eventsAmount}</Avatar>
                    <Avatar style={styleLblEndedGraphic}>{endedAmount}</Avatar>


                    <IconButton color="secondary" aria-label="add an alarm" onClick={() => { fetchAll(0)  }} >
                        <RefreshIcon id='btnUpdateGraphicUsers' style={styleBtnUpdateUsersGraphic}  />
                    </IconButton>

                </div>





            </div>
        );
    }
}


export default LineChartWithXAxisPadding;
 