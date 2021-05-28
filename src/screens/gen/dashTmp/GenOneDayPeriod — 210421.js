import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import moment from 'moment/moment';

// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import Title from './Title';

import { selectEventShortPoints } from '../../store/adminPanelTrest/adminPanelTrest.selectors';

import { selectObjsPage, selectObjsInfoPage } from '../../store/adminPanelTrest/StatisticPage.selectors';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
        fontSize: 11,
        padding: '8px 0'
    },
});

let endDate = new Date();
endDate = endDate.toISOString();
let lastDate = endDate.split('T')[0].split('-');

let thisDate = new Date();
thisDate = thisDate.toISOString();
thisDate = thisDate.split('T')[0];
let amountEventsEndedOfLastDay = 0;// Всего согласованых событий за сегодняшний день

const GenOneDayPeriod = ({ selectObjsInfo, selectEvent }) => {

    const classes = useStyles();

    let amountAllMessagesOfLastDay = 0;
    let amountEventsOfLastDay = 0;

    useEffect(()=> {
        if (localStorage.getItem('eventsEndedToDay')) {
            amountEventsEndedOfLastDay = JSON.parse(localStorage.getItem('eventsEndedToDay'));
        }else {
            // localStorage.setItem('eventsEnded', JSON.stringify(newNote) );
        }
    },[])

    // console.log('selectEvent[0]',selectEvent[0]);
    // console.log('selectObjsInfo',selectObjsInfo);
    // console.log('selectObjsPage',selectObjsPage);

    if ( selectObjsInfo  === undefined) {
        return(<div>loading...</div>)
    }
    selectEvent.map((nodeE,index) => {
        const dateForStatics =  nodeE.date.split('T')[0];

        if ( dateForStatics === thisDate){
            amountAllMessagesOfLastDay += 1;
            if (nodeE.type === 'new_rec'){
                amountEventsOfLastDay += 1;
            }
            // else if (nodeE.type === 'done_rec'){
            //   amountEventsEndedOfLastDay += 1;
            // }
        }
        return 'newNode'
    });

    // console.log('amountEventsEndedOfLastDay',amountEventsEndedOfLastDay)

    return (
        <React.Fragment>
            {/* <Title>Количество ОГХ ({moment(amountOGH.data.objTotal).format("dddd, MMM DD at HH:mm a")})</Title> */}

            <Title>Данные за последние сутки</Title>
            <hr color="blue" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}} />
            {/* {Object.keys(amountOGH.data).map(keyObj => {
        console.log(amountOGH.data.[keyObj]);
        console.log(keyObj);
      })} */}
            <Typography component="span" variant="h6">
                {amountEventsOfLastDay}
            </Typography>
            <Typography component="span"  >
                Всего новых событий за сегодняшний день
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="span" variant="h6">
                {amountAllMessagesOfLastDay}
            </Typography>
            <Typography component="span"  >
                Всего сообщений за сегодняшний день
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="span" variant="h6">
                {amountEventsEndedOfLastDay}
            </Typography>
            <Typography component="span"  >
                Всего согласованых событий за сегодняшний день
            </Typography>

            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: '4px'}}/>
            <Typography color="textSecondary" className={classes.depositContext}>
                Данные на {lastDate[2]}/{lastDate[1]}/{lastDate[0]}
            </Typography>

        </React.Fragment>
    );
}


const mapStateToProps = createStructuredSelector ({
    selectEvent: selectEventShortPoints, // события короткие данные для таблицы
    selectObjsPage: selectObjsPage, // события короткие данные для таблицы
    selectObjsInfo: selectObjsInfoPage, // события короткие данные для таблицы

});

// const mapDispatchToProps = (dispatch) => ({
// fetchObjectsList: () => dispatch(fetchObjectsListAsync()),

// });  
export default connect(mapStateToProps)(GenOneDayPeriod);