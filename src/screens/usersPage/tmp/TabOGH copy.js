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

import { fetchAmountUsersForGraphicsAsync, fetchEventsPointShortAsync, fetchAmountNewEventsForGraphicAsync,fetchAmountOGHForDashboardAsync ,fetchAmountOGHToDayAsync,fetchAmountOGHToWeekAsync, fetchAmountOGHToThreeDaysAsync,fetchAmountEndEventsForGraphicAsync} from '../../store/adminPanelTrest/adminPanelTrest.actions'; 

import { selectEventShortPoints, selectStatusEventPoint, selectStatusEnumEventPointColor } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(date, nameEvent, userName, type) {
  return { date, nameEvent, userName, type };
}

let rows = [
  createData('22/01/2021 (14:28)', 'Отправка сообщения', 'Тараскина Т.А.', 'новое сообщение в событии'),
];

const updateData = (eventShortPoints,statusEventPoint) => {
  rows = [];
  let nodesEvent = eventShortPoints;
  if (Array.isArray(eventShortPoints) ) {
      // console.log('trueee');
      nodesEvent = _.orderBy(eventShortPoints, ['date'], ['desc']);
      
      // console.log('eventShortPoints',nodesEvent);
  }

  nodesEvent.map((nodeE) => {
    // console.log('nodeE',nodeE);
    if (nodeE == null) {
      return []
    }
      const dateFormatt =  nodeE.date || '02-02-2021';//split('T')[0].split('-')[2] + '/' + nodeE.date.split('T')[0].split('-')[1] + '/' + nodeE.date.split('T')[0].split('-')[0] + ' (' +  nodeE.date.split('T')[1].slice(0,5) + ')';
      // let newNode2 = { id: index, date: dateFormatt, text: nodeE.text, fullName: nodeE.user.username, type: statusEventPoint[nodeE.type]};
      let newNode = createData(dateFormatt, nodeE.text, nodeE.user.username, statusEventPoint[nodeE.type]);
      rows.push(newNode);
      
      return newNode
  });
}

const TabOGH = ({ eventShortPoints, statusEventPoint,statusEnumEventPointColor, fetchEventsPointShort }) => {
  const [tabValue, settabValue] = useState(rows);
  const classes = useStyles();

  // useEffect(() => {
  //   fetchEventsPointShort();   
  // }, [fetchEventsPointShort])  

  // updateData(eventShortPoints,statusEventPoint);
  // settabValue(rows);
  useEffect(() => {
    updateData(eventShortPoints.data.nodes,statusEventPoint);
    settabValue(rows);
    // console.log('useEff eventShortPoints',eventShortPoints);
  },[eventShortPoints,statusEventPoint]);

  
// console.log(statusEnumEventPointColor);



  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Дата</TableCell>
            <TableCell align="right">Описание события</TableCell>
            <TableCell align="right">Пользователь</TableCell>
            <TableCell align="right">Тип изменения</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabValue.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {/* {new Date('2021-02-13T00:00:00.000Z').toLocaleString('Ru')} */}
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
    eventShortPoints: selectEventShortPoints, // события короткие данные для таблицы
    statusEventPoint: selectStatusEventPoint, // классификация статусов "new_msg"
    statusEnumEventPointColor: selectStatusEnumEventPointColor, // for color elements
  });
  
const mapDispatchToProps = (dispatch) => ({
    // Для событий новых и закрытых
    fetchEventsPointShort: () => dispatch(fetchEventsPointShortAsync()),

    fetchDataUsersOnline: () => dispatch(fetchAmountUsersForGraphicsAsync()),
    fetchAmountNewEventsForGraphic: () => dispatch(fetchAmountNewEventsForGraphicAsync()),
    fetchAmountEndEventsForGraphic: () => dispatch(fetchAmountEndEventsForGraphicAsync()),

    fetchAmountOGH: () => dispatch(fetchAmountOGHForDashboardAsync()),

    fetchAmountOGHToDay: () => dispatch(fetchAmountOGHToDayAsync()),
    fetchAmountOGHToWeek: () => dispatch(fetchAmountOGHToWeekAsync()),
    fetchAmountOGHToThreeDays: () => dispatch(fetchAmountOGHToThreeDaysAsync()),
});  
  export default connect(mapStateToProps,mapDispatchToProps)(TabOGH);