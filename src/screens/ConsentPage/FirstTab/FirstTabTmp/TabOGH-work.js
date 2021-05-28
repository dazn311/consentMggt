'strick'
import React, { useEffect, useState } from 'react';
import _ from "lodash";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
 
import { fetchEventFromPeriodAsync  } from '../../../store/adminPanelTrest/adminPanelTrest.actions'; 
 
import { selectEventShortPoints, selectStatusEventPoint, selectStatusEnumEventPointColor, fetchDataForEventShortPoints } from '../../../store/adminPanelTrest/adminPanelTrest.selectors'; 

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(color, date, nameEvent, userName, userID, type) {
  return { color, date, nameEvent, userName, userID, type };
}

let rows = [];

const refactData = (eventShortPoints,statusEventPoint,statusEnumEventPointColor) => {
  rows = [];
  let nodesEvent = eventShortPoints;
  if (Array.isArray(eventShortPoints) ) {
      nodesEvent = _.orderBy(eventShortPoints, ['date'], ['desc']);
      rows = nodesEvent;
  }
  if (nodesEvent == null) {
    rows = []
  }

  // console.log('rerender refactData');
  rows = [];
  nodesEvent.map((nodeE) => {
    const dateFormatt =  nodeE.date || '02-02-2021';
    let newNode = createData(statusEnumEventPointColor[nodeE.type], dateFormatt, nodeE.text, nodeE.user.username,nodeE.user.userID, statusEventPoint[nodeE.type]);
    rows.push(newNode);
    
    return newNode
  });
}

const TabOGH = ({ selectEventShort, statusEventPoint,statusEnumEventPointColor, fetchEventFromPeriod, datesOfFetchForEvent,searchValue, fieldValue }) => {
  const [tabValue, settabValue] = useState([]);
  const classes = useStyles();

  console.log('rerender Tab1 : selectEventShort.data.nodes');

  const printUserId = (e) => {
    console.log('row.userID',e);
  }
 
  useEffect(() => {
    refactData(selectEventShort.data.nodes, statusEventPoint, statusEnumEventPointColor);
    settabValue(rows);
    // console.log('useEffect selectEventShort');
  },[selectEventShort, statusEventPoint, statusEnumEventPointColor]);

  // useEffect(() => {
  //   let {startDate, endDate}   = datesOfFetchForEvent;
  //   // let startDate = datesOfFetchForEvent.startDate;
  //   // console.log('endDate',endDate);
  //   // console.log('useEffect fetchEventFromPeriod 1');
  //   if ( endDate !== '0' && startDate !== '0' && startDate <= endDate){
  //     // console.log('useEffect fetchEventFromPeriod 2');
  //     // fetchEventFromPeriod(startDate, endDate);
      
  //   }
     
  // },[fetchEventFromPeriod, datesOfFetchForEvent]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{padding: '6px 0px 6px 0px', width: '4px', maxWidth: '2px'}}></TableCell>
            <TableCell>Дата</TableCell>
            <TableCell align="right">Описание события</TableCell>
            <TableCell align="right">Пользователь</TableCell>
            <TableCell align="right">Тип изменения</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabValue && tabValue
          .filter((item, idx) => item.[fieldValue].toLowerCase().includes(searchValue.toLowerCase()))
          .map((row, index) => (
            <TableRow key={index} onClick={()=> { printUserId(row.userID)}}>
              <TableCell align="left" style={{backgroundColor:row.color, padding: '6px 0px 6px 0px', width: '4px', maxWidth: '4px'}}></TableCell>
              <TableCell component="th" scope="row">
                {new Date(row.date).toLocaleString('Ru').slice(0,17)}
              </TableCell>
              <TableCell align="right">{row.nameEvent}</TableCell>
              <TableCell align="right">{row.userName}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
 
const mapStateToProps = createStructuredSelector ({
    selectEventShort: selectEventShortPoints, // события короткие данные для таблицы
    statusEventPoint: selectStatusEventPoint, // классификация статусов "new_msg"
    statusEnumEventPointColor: selectStatusEnumEventPointColor, // for color elements
    datesOfFetchForEvent: fetchDataForEventShortPoints, //  дата начала и конца для запроса
  });
  
const mapDispatchToProps = (dispatch) => ({
    // запрос для событий за период 
    fetchEventFromPeriod: (start,end) => dispatch(fetchEventFromPeriodAsync(start,end)),
});  
  export default connect(mapStateToProps,mapDispatchToProps)(TabOGH);