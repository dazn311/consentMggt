 
import React  from 'react';

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
 

import { selectUsersPage } from '../../../store/adminPanelTrest/adminPanelTrest.selectors'; 

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  borderSel: {
    borderLeft: '1px solid #cec7c79c',
  },
});



const TabUsersList = ({ selectUsersPage }) => {
  const classes = useStyles();

  console.log('rerender TabUsersList -- selectUsersPage',selectUsersPage);

 

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ф.И.О.</TableCell>
            <TableCell className={classes.borderSel} align="right">Ф.И.О. коротко</TableCell>
            <TableCell className={classes.borderSel} align="right">Логин</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectUsersPage && selectUsersPage
          .filter(item => item.user_fio !== undefined)
          .map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                { row.user_fio }
              </TableCell>
              <TableCell className={classes.borderSel} align="right">{row.user_fio_lit}</TableCell>
              <TableCell className={classes.borderSel}  align="right">{row.login}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
 
const mapStateToProps = createStructuredSelector ({
  selectUsersPage: selectUsersPage, // hjk
});

export default connect(mapStateToProps)(TabUsersList);  
  
// const mapDispatchToProps = (dispatch) => ({
//     // запрос для событий за период 
//     fetchEventFromPeriod: (start,end) => dispatch(fetchEventFromPeriodAsync(start,end)),
// });  
  