import React, {PureComponent} from 'react';

import Avatar from '@material-ui/core/Avatar';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

class LineChartWithXAxisPadding extends PureComponent {

    winWidth = window.innerWidth;
    widthLine = 500 - 20;
    leftLine = 20;
    rightLine = 20;
    displayVal = 'flex';
    mleft = -25;
    mbottom = -10;
    mright = 0;



    fetchAll  = this.props.fetchAll;

    render() {
        const {
            // fetchAll,
            data,
            isFetchingUserOnline,
            isToday,
            dateLabel,
            usersCount,
            eventsAmount,
            endedAmount
        } = this.props;


        // const winWidth = window.innerWidth;
        // let widthLine = 500 - 20;
        // let leftLine = 20;
        // let rightLine = 20;
        // let displayVal = 'flex';
        // let mleft = -25, mbottom = -10, mright = 0;

        if (this.winWidth === 320) {
            this.widthLine = 280;
            this.leftLine = 15;
            this.rightLine = 15;
            this.displayVal = 'none';
            this.mleft = -35;
            this.mbottom = -0;
            this.mright = 20;
        } else if (this.winWidth === 375) {
            this.widthLine = 340;
            this.leftLine = 10;
            this.rightLine = 20;
            this.displayVal = 'none';
            this.mleft = -35;
            this.mbottom = -0;
            this.mright = 10;
        } else if (this.winWidth === 414) {
            this.widthLine = 370;
            this.leftLine = 10;
            this.rightLine = 20;
            this.displayVal = 'none';
            this.mleft = -35;
            this.mbottom = -0;
            this.mright = 0;
        } else if (this.winWidth === 412) { // Samsung A51
            this.widthLine = 360;
            this.leftLine = 10;
            this.rightLine = 20;
            this.displayVal = 'none';
            this.mleft = -35;
            this.mbottom = -0;
            this.mright = 0;
        } else if (this.winWidth === 360) { // Samsung A51
            this.widthLine = 320;
            this.leftLine = 10;
            this.rightLine = 20;
            this.displayVal = 'none';
            this.mleft = -35;
            this.mbottom = -0;
            this.mright = 0;
        } else if (this.winWidth === 1024) { // Samsung A51
            this.widthLine = 450;
            this.leftLine = 10;
            this.rightLine = 20;
            this.displayVal = 'none';
            this.mleft = -35;
            this.mbottom = -0;
            this.mright = 0;
        }
        //  else if (winWidth < 360){ // Samsung A51
        //   widthLine = 280;
        //   leftLine = 10;
        //   rightLine = 10;
        //   displayVal = 'none';
        //   mleft = -35; mbottom = -35; mright = 10;
        // }

        const styleLblUsersGraphicDate = !isFetchingUserOnline
            ? {
                position: 'relative',
                color: 'green',
                display: this.displayVal,
                alignItems: 'flex-start',
                justifyContent: 'center',
                maxHeight: 25
            }
            : {
                position: 'relative',
                color: '#ccc',
                display: this.displayVal,
                alignItems: 'flex-start',
                justifyContent: 'center',
                maxHeight: 25
            }

        const styleLblUsersGraphic = !isFetchingUserOnline
            ? {
                position: 'relative',
                color: 'white',
                display: this.displayVal,
                backgroundColor: '#8884d8',
                width: '30px',
                height: 30,
                margin: '4px 25px'
            }
            : {
                position: 'relative',
                color: '#ccc',
                display: this.displayVal,
                width: '30px',
                height: 30,
                margin: '4px 25px',
                backgroundColor: '#8884d8'
            };

        const styleLblEventsGraphic = !isFetchingUserOnline
            ? {
                position: 'relative',
                color: 'black',
                display: this.displayVal,
                backgroundColor: 'rgb(130, 202, 157)',
                width: '30px',
                height: 30,
                margin: '4px 25px'
            }
            : {
                position: 'relative',
                backgroundColor: '#91c1b4',
                color: '#ccc',
                display: this.displayVal,
                width: '30px',
                height: 30,
                margin: '4px 25px'
            };


        const styleLblEndedGraphic = !isFetchingUserOnline
            ? {
                position: 'relative',
                color: 'black',
                display: this.displayVal,
                backgroundColor: '#FFc000',
                width: '30px',
                height: 30,
                margin: '4px 25px'
            }
            : {
                position: 'relative',
                color: '#ccc',
                display: this.displayVal,
                width: '30px',
                height: 30,
                margin: '4px 25px',
                backgroundColor: '#FFc000'
            };


        const styleBtnUpdateUsersGraphic = isFetchingUserOnline
            ? {position: 'relative', display: this.displayVal, cursor: 'pointer', transition: 'transform 0.2s'}
            : {
                position: 'relative',
                display: this.displayVal,
                cursor: 'pointer',
                transform: 'rotate(-45deg)',
                color: 'red'
            };

        return (
            <div id='graphics'
                 style={{position: 'relative', display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <LineChart width={this.widthLine} height={200} data={data} margin={{top: 8, left: this.mleft, bottom: this.mbottom, right: this.mright}}>
                    <CartesianGrid strokeDasharray="8 3"/>
                    <XAxis dataKey="name" padding={{left: this.leftLine, right: this.rightLine}}/>
                    <YAxis padding={{top: 5, bottom: 5}}/>

                    <Tooltip/>
                    <Legend margin={{bottom: 0}}/>

                    <Line type="monotone" dataKey='Users' stroke="#8884d8" name='Польз. он-лайн' activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="Events" name='Новые события' stroke="#82ca9d"/>
                    <Line type="monotone" dataKey="Closed" name='Закрытые событ.' stroke="#FFc000"/>

                </LineChart>

                <div style={{ position: 'relative', display: this.displayVal, flexWrap: 'wrap', maxWidth: 80,  justifyContent: 'center',  marginLeft: 20  }}>
                    <div style={{ position: 'absolute', right: '12px', transform: 'rotate(270deg)',  top: '100px', whiteSpace: 'nowrap' }}>Текущие данные </div>
                    <div style={styleLblUsersGraphicDate} >
                        <ArrowLeftIcon className='arrow-prev' fontSize="default" onClick={() => { this.fetchAll(-1) }} color="secondary"/>
                        <div style={{alignSelf: 'center'}}>{dateLabel.toISOString().slice(8, 10)}/{dateLabel.toISOString().slice(5, 7)} </div>
                        <ArrowRightIcon className={isToday ? 'none': 'arrow-prev'} disabled={isToday} onClick={() => { this.fetchAll(1)  }} color={isToday ? 'disabled' : 'error'}/>
                    </div>

                    <Avatar style={styleLblUsersGraphic}>{usersCount}</Avatar>
                    <Avatar style={styleLblEventsGraphic}>{eventsAmount}</Avatar>
                    <Avatar style={styleLblEndedGraphic}>{endedAmount}</Avatar>


                    <IconButton color="secondary" aria-label="add an alarm" onClick={() => { this.fetchAll(0)  }} >
                        <RefreshIcon id='btnUpdateGraphicUsers' style={styleBtnUpdateUsersGraphic}  />
                    </IconButton>
                </div>
            </div>
        );
    }
}


export default LineChartWithXAxisPadding;
 