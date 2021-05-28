'strick'
import React, { useEffect, useState } from 'react';

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


import DialogUserEdit from './DialogUsersEdit';
 


import { selectAllUsersFromDb } from '../../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { fetchAllUsersFromDB } from '../../../store/adminPanelTrest/adminPanelTrest.actions'; 

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  borderSel: {
    borderLeft: '1px solid #cec7c79c',
  },
});

 

const TabUsersList = ({ selectUsersPage,fetchAllUsers }) => {
  const classes = useStyles();
  const [amUsersDate, setAmUsersDate] = useState(0)
  useEffect(() => {
    fetchAllUsers(1000);
  }, [fetchAllUsers])

  useEffect(() => {
    let lastDay = new Date(); 
    lastDay.setDate(lastDay.getDate() - 1);
    let weekDay = new Date(); 
    weekDay.setDate(weekDay.getDate() - 7);
    let monthDay = new Date(); 
    monthDay.setDate(monthDay.getMonth() - 1);

    let lastDayVal = 0;
    let weekDayVal = 0;
    let monthDayVal = 0;
    console.log('rerender selectUsersPage : ',selectUsersPage);

    const amUsers =selectUsersPage.length && selectUsersPage.filter(element => {
      lastDayVal += new Date(element.user_reg_date) > lastDay ? 1 : 0;
      weekDayVal += new Date(element.user_reg_date) > weekDay ? 1 : 0;
      monthDayVal += new Date(element.user_reg_date) > monthDay ? 1 : 0;
      // objRecsAmount
      return new Date(element.user_reg_date) > monthDay ;
    });

    const amUsersLength = amUsers && amUsers.length;
    setAmUsersDate({amUsersLength, lastDayVal, weekDayVal,monthDayVal});
    // console.log('amUsersDate -- lastDayVal, weekDayVal,monthDayVal: ',lastDayVal, weekDayVal,monthDayVal);
    // console.log('amUsers length',amUsers.length);
  }, [selectUsersPage])

  // console.log('rerender UsersTab2 : TabUsersList');
  // console.log('rerender selectUsersPage : ',selectUsersPage);

  if(!selectUsersPage){
    return (<div>Loading..</div>)
  }
 
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          Всего:{amUsersDate.amUsersLength}/ за месяц:{amUsersDate.monthDayVal}/ за неделю:{amUsersDate.weekDayVal}/ за день:{amUsersDate.lastDayVal} 
          <TableRow>
            <TableCell>Ф.И.О.</TableCell>
            <TableCell className={classes.borderSel} align="right">Ф.И.О. коротко</TableCell>
            <TableCell className={classes.borderSel} align="right">Логин</TableCell>
            <TableCell className={classes.borderSel} align="right">Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectUsersPage.usersAll && selectUsersPage.usersAll
          .filter(item => item.user_fio )
          // .filter(item => item.user_reg_date > new Date("2021-02-17"))
          .map((row, index) => (
            <TableRow hover key={index}>
              <TableCell component="th" scope="row">
                { row.user_fio }
              </TableCell>
              <TableCell className={classes.borderSel} align="right">{row.user_fio_lit}</TableCell>
              <TableCell className={classes.borderSel}  align="right">{row.login}</TableCell>
              <TableCell className={classes.borderSel}  align="right"><DialogUserEdit userData={row}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
  
const mapStateToProps = createStructuredSelector ({
  selectUsersPage: selectAllUsersFromDb, // hjk
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllUsers: (start,end) => dispatch(fetchAllUsersFromDB(start,end)),
}); 

export default connect(mapStateToProps,mapDispatchToProps)(TabUsersList);  
  
 
  