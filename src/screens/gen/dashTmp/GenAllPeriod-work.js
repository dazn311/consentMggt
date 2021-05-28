import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment/moment';

// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import Title from './Title';

import { selectAmountOGH } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { selectObjsPage, selectObjsInfoPage } from '../../store/adminPanelTrest/StatisticPage.selectors';  

import { selectEventShortPoints } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { fetchEventsPointShortAsync, fetchObjectsListAsync } from '../../store/adminPanelTrest/adminPanelTrest.actions'; 

 

import BackdropForAllPage from '../../components/blackDrop/black-drop.component';
import { Loader } from 'semantic-ui-react';
 
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
    fontSize: 11,
    padding: '8px 0'
  },
});


 

 
const GenAllPeriod = ({ amountOGH,selectEvent ,selectObjsInfo, selectObjs,fetchEventsPointShort, fetchObjectsList}) => {
  const classes = useStyles();
  let tt = moment(amountOGH.dataTime).toISOString(); 
  let lastDate = tt.split('T')[0].split('-'); 


  //all
  let amoutAllMessage = selectEvent.length;
  let amoutEventsAll = 0;
  // of last day
 
  console.log('selectEvent[0]',selectEvent[0]);
  

  React.useEffect(() => {
    fetchEventsPointShort();

    let endDate = new Date(); 
    endDate = endDate.toISOString();  
    // (objectType='2', organization='0', limit='100' , offset='0', startDate='2021-01-01T10:00:00.000Z', endDate='2021-05-15T22:00:00.000Z', objName='',  orgName='',  objKind='' , objStatus=10, sortCol='date' , sortType='desc') 
    fetchObjectsList('2', '0', '10' , '0', '2021-01-01T10:00:00.000Z', endDate, '',  '',  '' , '2', 'date' , 'desc');
    
    console.log('fetchEventsPointShort');
  },[fetchEventsPointShort, fetchObjectsList])

  // React.useEffect(() => {
  //   fetchObjectsList('2', '0', '10' , '0', '2021-01-01T10:00:00.000Z', endDate, '',  '',  '' , '2', 'date' , 'desc');
  //   // fetchObjectsList(stFilterVal.objectType, stFilterVal.organization, limitPlus, newOffset, startDate, endDate, stFilterSearch.objName, 
  //   //stFilterSearch.orgName, newAllKind , stFilterVal.objStatus, stFilterVal.sortCol, stFilterVal.sortType)
    
  //   console.log('fetchObjectsList');
  // },[])


  if ( selectEvent.length == 0  ) {
    console.log('if ( selectEvent.length == 0 -- loading' );
    return(<div style={{position:'relative'}} ><Loader /> loading...</div>)
  }
  // if ( selectObjsInfo.data === {}  ) {
  //   console.log('if ( selectObjsInfo.data === {} -- loading' );
  //   return(<div>loading...</div>)
  // }
            
  
  selectEvent.map((nodeE,index) => {
      if (nodeE.type === 'new_rec'){
        amoutEventsAll += 1;
      }
      return 'newNode'
  });

  // console.log('selectObjsInfoPage.data.objects',selectObjsInfoPage.data.objects);
  console.log('selectObjsInfo.totalAmount',selectObjsInfo.totalAmount);
  return (
    <React.Fragment>
      <Title>Данные за весь период</Title>
      <hr color="blue" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}} />
      <Typography component="p" variant="h6">
        {amoutEventsAll}
      </Typography>
      <Typography component="p"  >
          Всего событий
      </Typography>
      <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
      <Typography component="p" variant="h6">
        {amoutAllMessage}
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
        {/* {73+43} */}*0.
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
  selectObjs: selectObjsPage, // события короткие данные для таблицы
});
 
const mapDispatchToProps = (dispatch) => ({
  fetchEventsPointShort: () => dispatch(fetchEventsPointShortAsync()),

              fetchObjectsList: (objectType, organization, limit, offset, startDate, endDate, objName, orgName, objKind, objStatus, sortCol, sortType) => 
  dispatch(fetchObjectsListAsync(objectType, organization, limit, offset, startDate, endDate, objName, orgName, objKind, objStatus, sortCol, sortType)),
});
export default connect(mapStateToProps,mapDispatchToProps)(GenAllPeriod);