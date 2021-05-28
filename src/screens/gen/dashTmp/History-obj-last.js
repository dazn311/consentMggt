import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { selectEventShortPoints, selectCountUsersGraph, selectStatusEventPoint } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  muiTableRowRoot: {
    cursor:'pointer',
    '&:hover':{
      backgroundColor: '#69696924',
      color: 'white'
    }
  }
});

 const HistoryObjLast = ({ eventShortPoints, statusEventPoint }) => {
  // console.log('eventShortPoints',eventShortPoints);
  const nodesEvent = eventShortPoints.data.nodes;

  const classes = useStyles();
  const winWidth = window.innerWidth;
  return (
    <React.Fragment>
      <Title>История последних событий</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Дата</TableCell>
            {winWidth > 375 ? <TableCell>Описание события</TableCell>:
            <TableCell>Объект</TableCell>}
            {winWidth > 375 && <TableCell>Инициировал</TableCell>}
            {winWidth > 375 && <TableCell align="right">Тип изменения</TableCell>}
            {/* {winWidth > 770 && <TableCell align="right">Ответчик</TableCell>} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {nodesEvent.map((row) => (
            <TableRow    key={row.date.toString()} className={classes.muiTableRowRoot}>
              <TableCell>{row.date.toString().split('T')[1].slice(0,5)} ({row.date.toString().split('T')[0]})</TableCell>
              <TableCell>{row.text}</TableCell>
              {winWidth > 375 && <TableCell>{row.user.username}</TableCell>}
              {winWidth > 375 && <TableCell align="right">{statusEventPoint[row.type]}</TableCell>}
              {/* {winWidth > 770 && <TableCell align="right">{row.answer}</TableCell>} */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      { <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={() =>{}}>
          Смотреть весь список
        </Link>
      </div> }
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector ({
  eventShortPoints: selectEventShortPoints,
  countUsersGraph: selectCountUsersGraph,
  statusEventPoint: selectStatusEventPoint,
});


export default connect(mapStateToProps)(HistoryObjLast);
