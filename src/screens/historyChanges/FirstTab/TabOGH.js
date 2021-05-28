'strick'
import React  from 'react';
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
import TablePagination from '@material-ui/core/TablePagination';
  
import MessAlert from './Messages.alert'

 
import { selectEventShortPoints, selectStatusEventPoint, selectStatusEnumEventPointColor, fetchDataForEventShortPoints } from '../../../store/adminPanelTrest/adminPanelTrest.selectors'; 

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(color, date, nameEvent, userName, orgName, userID, type) {
  return { color, date, nameEvent, userName, orgName, userID, type };
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

  rows = [];
  nodesEvent.map((nodeE) => {
    const dateFormatt =  nodeE.date || '02-02-2021';
    let newNode = createData(statusEnumEventPointColor[nodeE.type], dateFormatt, nodeE.text, nodeE.user.username, nodeE.user.orgname,nodeE.user.userID, statusEventPoint[nodeE.type]);
    rows.push(newNode);
    
    return newNode
  });

  return rows;
}

const UserComponent = ({username,orgname}) =>
    (<React.Fragment>
        <div style={{display: 'flex', flexDirection:'column'}} >
          <div>{username}</div>
          <div style={{fontSize:'12', color:'gray'}}>{orgname}</div>
        </div>
    </React.Fragment>)
////////////////////////////

const TabOGH = ({ selectEventShort, statusEventPoint,statusEnumEventPointColor, searchValue, fieldValue }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    console.log('newPage',newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const printUserId = (e) => {
    console.log('row.userID',e);
  }
 
  React.useEffect(() => {
    refactData(selectEventShort, statusEventPoint, statusEnumEventPointColor);
  },[selectEventShort, statusEventPoint, statusEnumEventPointColor]);
 
  let openRed, openGreen;
 
  if (!selectEventShort.length){
    openRed = true; openGreen=false;
  } else {
    openRed = false; openGreen=true;
  }

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
          {rowsPerPage > 0
            && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .filter((item) => item.nameEvent.toLowerCase().includes(searchValue.toLowerCase()))
          // .filter((item) => item.[fieldValue].toLowerCase().includes(searchValue.toLowerCase()))
          // .filter(( _ , index) => index <= 10)
          .map((row, index) => (
            <TableRow key={index} onClick={()=> { printUserId(row.userID)}}  style={ {backgroundColor: index % 2 === 0 ? '#80808038': ''}} >
              <TableCell align="left" style={{backgroundColor:row.color, padding: '6px 0px 6px 0px', width: '4px', maxWidth: '4px'}}></TableCell>
              <TableCell component="th" scope="row">
                {new Date(row.date).toLocaleString('Ru').slice(0,17)}
              </TableCell>
              <TableCell align="right">{row.nameEvent}</TableCell>
              <TableCell align="right"><UserComponent username= {row.userName} orgname= {row.orgName} /></TableCell>
              <TableCell align="right">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> 
      <div style={{display:'flex'}}>
        <TablePagination
                rowsPerPageOptions={[5, 15, 30, 1000]}
                // rowsPerPageOptions={[15, 25, 40, { label: 'Все', value: -1 }]}
                // colSpan={5}
                count={rows.length}
                // count={30}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'объектов на странице' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
        />
      </div>
      <MessAlert openRed={openRed} openGreen={openGreen} />
    </TableContainer>
  );
}
 
const mapStateToProps = createStructuredSelector ({
    selectEventShort: selectEventShortPoints, // события короткие данные для таблицы
    statusEventPoint: selectStatusEventPoint, // классификация статусов "new_msg"
    statusEnumEventPointColor: selectStatusEnumEventPointColor, // for color elements
    datesOfFetchForEvent: fetchDataForEventShortPoints, //  дата начала и конца для запроса
  });
  
// const mapDispatchToProps = (dispatch) => ({
//     fetchEventFromPeriod: (start,end) => dispatch(fetchEventFromPeriodAsync(start,end)),
// });
  export default connect(mapStateToProps)(TabOGH);