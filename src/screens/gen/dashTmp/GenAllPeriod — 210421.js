import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment/moment';

// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import Title from './Title';

import { selectAmountOGH } from '../../store/adminPanelTrest/adminPanelTrest.selectors';
import { selectObjsInfoPage } from '../../store/adminPanelTrest/StatisticPage.selectors';
// import { selectObjsPage, selectObjsInfoPage } from '../../store/adminPanelTrest/StatisticPage.selectors';

import { selectEventShortPoints, selectAmountUsers } from '../../store/adminPanelTrest/adminPanelTrest.selectors';
import { fetchEventsPointShortAsync, fetchObjectsListAsync } from '../../store/adminPanelTrest/adminPanelTrest.actions';



// import BackdropForAllPage from '../../components/blackDrop/black-drop.component';
// import { Loader } from 'semantic-ui-react';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
        fontSize: 11,
        padding: '8px 0'
    },
});





const GenAllPeriod = ({ data, selectAmountUsers, amountOGH,selectEvent ,selectObjsInfo, fetchEventsPointShort, fetchObjectsList}) => {
    const classes = useStyles();
    let tt = moment(amountOGH.dataTime).toISOString();
    let lastDate = tt.split('T')[0].split('-');

    const {total_recs,total_messages, total_sogl_objects, total_sogl_recs} = data;

    // console.log('total_recs, total_messages, total_mggt_objects, total_users', total_recs, total_messages, total_mggt_objects, total_users);
    //all
    let amountAllMessage = selectEvent.length;
    let amountEventsAll = 0;

    // console.log('selectEvent[0]',selectEvent[0]);
 
    React.useEffect(() => {
        fetchEventsPointShort();
        let endDate = new Date();
        endDate = endDate.toISOString();
        // (objectType='2', organization='0', limit='100' , offset='0', startDate='2021-01-01T10:00:00.000Z', endDate='2021-05-15T22:00:00.000Z', objName='',  orgName='',  objKind='' , objStatus=10, sortCol='date' , sortType='desc')
        fetchObjectsList('2', '0', '10' , '0', '2021-01-01T10:00:00.000Z', endDate, '',  '',  '' , '2', 'date' , 'desc');

        // console.log('fetchEventsPointShort');
    },[fetchEventsPointShort, fetchObjectsList])


    useEffect(()=> {
        if (selectAmountUsers.amountEventsEnded){
            let nDate = new Date().toISOString();
            nDate = nDate.split('T')[0];
            // console.log('nDate',nDate);

            let nDate2 = new Date();
            nDate2.setDate(nDate2.getDate() - 1);
            nDate2 = nDate2.toISOString(); 
            nDate2 = nDate2.split('T')[0];
            // console.log('nDate2',nDate2);

            let isUpdate = false;

            const newNote = [{dateCreate: nDate, amEvents: parseInt(selectAmountUsers.amountEventsEnded)}];
            // const newNote2 = [{dateCreate: '2021-04-18', amEvents: 20}];
            let eventsEndedArr = null;
            let eventsEndedArr2 = null;
            // localStorage.setItem('eventsEnded', JSON.stringify(newNote2) );

            if (localStorage.getItem('eventsEnded')) {
                eventsEndedArr = JSON.parse(localStorage.getItem('eventsEnded'));
                // console.log('3222 eventsEndedArr',eventsEndedArr);

                if (eventsEndedArr.length && typeof eventsEndedArr === 'object'){
                    let d1 = 0;
                    let d2 = 0;

                    eventsEndedArr2 = eventsEndedArr.map((item, index)=> {

                        if(nDate === item.dateCreate){
                            isUpdate = true;
                            d1 = parseInt(item.amEvents);
                            return  {dateCreate: nDate, amEvents: parseInt(selectAmountUsers.amountEventsEnded)};
                        }else if(nDate2 === item.dateCreate){
                            // console.log('3222 if(nDate2 === item.dateCreate)',item.amEvents);
                            d2 = parseInt(item.amEvents);
                            return item
                        }else {
                            // console.log('if (item.dateCreate)');
                            return item
                        }
                    })
                    if (!isUpdate){
                        eventsEndedArr2.push(newNote[0]);
                    }

                    if (d1 > 0){
                        const evEnded = d1 - d2; //Всего согласованых событий за сегодняшний день
                        localStorage.setItem('eventsEndedToDay', JSON.stringify(evEnded) );
                    }else {
                        const evEnded = parseInt(selectAmountUsers.amountEventsEnded) - d2; //Всего согласованых событий за сегодняшний день
                        localStorage.setItem('eventsEndedToDay', JSON.stringify(evEnded) );
                    }


                    localStorage.setItem('eventsEnded', JSON.stringify(eventsEndedArr2) );

                }else {
                    eventsEndedArr.push(newNote);
                    localStorage.setItem('eventsEnded', JSON.stringify(eventsEndedArr) );
                }

            }else {
                localStorage.setItem('eventsEnded', JSON.stringify(newNote) );
            }
        }
    },[selectAmountUsers.amountEventsEnded])

    if ( selectEvent.length === 0  ) {
        // console.log('if ( selectEvent.length == 0 -- loading' );
        return (<div style={{width:'100%', display:'flex', justifyContent:'center'}}>  <CircularProgress size={34} color="secondary" /> </div>)

    }

    selectEvent.map((nodeE,index) => {
        if (nodeE.type === 'new_rec'){
            amountEventsAll += 1;
        }
        return 'newNode'
    });



    // console.log('selectObjsInfoPage.data.objects',selectObjsInfoPage.data.objects);
    // console.log('selectObjsInfo.totalAmount',selectObjsInfo.totalAmount);
    return (
        <React.Fragment>
            <Title>Данные за весь период</Title>
            <hr color="blue" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}} />
            <Typography component="p" variant="h6">
                {amountEventsAll}
            </Typography>
            <Typography component="p"  >
                Всего событий
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="p" variant="h6">
                {amountAllMessage}
            </Typography>
            <Typography component="p"  >
                Всего сообщений
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="p" variant="h6">
                {selectObjsInfo.totalAmount}
            </Typography>
            <Typography component="p"  >
                Всего согласовано объектов
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: '4px'}}/>
            <Typography component="p" variant="h6">
                {/* {73+43} */}
                {selectAmountUsers.amountEventsEnded}
            </Typography>
            <Typography component="p"  >
                Всего согласованых событий
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: '4px'}}/>
            <Typography color="textSecondary" className={classes.depositContext}>
                Данные на {lastDate[2]}/{lastDate[1]}/{lastDate[0]}
            </Typography>

        </React.Fragment>
    );
}


const mapStateToProps = createStructuredSelector ({
    amountOGH: selectAmountOGH,
    selectEvent: selectEventShortPoints, // события короткие данные для таблицы
    selectObjsInfo: selectObjsInfoPage, // события короткие данные для таблицы
    // selectObjs: selectObjsPage, // события короткие данные для таблицы
    selectAmountUsers: selectAmountUsers, //
});

const mapDispatchToProps = (dispatch) => ({
    fetchEventsPointShort: () => dispatch(fetchEventsPointShortAsync()),
    fetchObjectsList: (objectType, organization, limit, offset, startDate, endDate, objName, orgName, objKind, objStatus, sortCol, sortType) =>
        dispatch(fetchObjectsListAsync(objectType, organization, limit, offset, startDate, endDate, objName, orgName, objKind, objStatus, sortCol, sortType)),
});
export default connect(mapStateToProps,mapDispatchToProps)(GenAllPeriod);


// const now = new Date();
// const start = new Date(now.getFullYear(), 0, 0);
// const diff = now - start;
// const oneDay = 1000 * 60 * 60 * 24;
// const day = Math.floor(diff / oneDay);
// console.log('Day of year: ' + day);