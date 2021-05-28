'strick'
import React from 'react'; 

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'; 
import Pagination from '@material-ui/lab/Pagination'; 
import LinearProgress from '@material-ui/core/LinearProgress';
  
// import MessAlert from './Messages.alert';
// import EventDetail from './EventDetail';
 
const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    maxWidth: '100%',
    borderTop: '1px solid rgb(130 119 119 / 47%)', 
  },
  cellOpacity: {
    // minWidth: 650,
    opacity: 0.3,
  },
  cell: {
    // minWidth: 650,
    opacity: 0.3,
  },
  progress: {
    width: '100%',
    '& > * + *': {
      marginTop: 4,
    },
    marginTop: 4,
  },
}); 

const TabCellMobile = ({row}) => {
  const cell = <div style={{width: '100%' }} ><div style={{width: '100%', borderBottom: '1px solid lightgrey'}}  >{row.user_name}</div><div>УК {row.org_name}</div></div>
  return cell;
}

////////////////////////////
const LinearIndeterminate = () => {
  const classes = useStyles();

  return (
    <div className={classes.progress}>
      <LinearProgress />
      {/* <LinearProgress color="secondary" /> */}
    </div>
  );
}

const formatDate = (dt) => {
  if (dt === null) {return '-'}

  const dt1 = dt.split('T')[0].split('-');
  const dt2 = dt.split('T')[1].split(':');
  return dt1[2] + '/' + dt1[1] + '/' + dt1[0] + '(' + dt2[0] + ':' + dt2[1]  + ')' 
}
 
// let pageCoutnt = 0;









/////////////////////////////////////////////////////
const TabUsersComponent = ({  tabValue, showEvents, handleChangePage,  page, amObjsValue}) => {
  const classes = useStyles();
  const amPage2 = parseInt(tabValue.length / 10) +1;
  const widthW = window.innerWidth;

  if ( widthW < 420) {
    return ( 
      <React.Fragment>
      <TableContainer style={{ overflowX: 'unset', marginTop: 8, maxWidth:'100%'}} component={Paper}>
        <Table  className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{padding: '6px 2px', textAlign:'center',  borderRight:'1px solid #8080805c'}}>id</TableCell>
              <TableCell style={{padding: '6px 4px', textAlign:'center',  borderRight:'1px solid #8080805c'}} align="right">ФИО/Огр</TableCell> 
              <TableCell style={{padding: '6px 4px', textAlign:'center',  borderRight:'1px solid #8080805c'}} align="right">активность</TableCell>
              {/* <TableCell align="right">последняя активность</TableCell> 
              <TableCell align="right">Дата активности</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {tabValue.length ? tabValue
            .filter((row,i) => i >= (page * 10 - 10) && i < (page * 10) )
            .filter((row,i) => row.user_name.split(' ').length > 1)
            .map((row, index) => (
              <TableRow key={index} onClick={()=> { showEvents(row)}}  style={ {backgroundColor: index % 2 === 0 ? '#80808038': ''}} >
                <TableCell align="left" style={{backgroundColor:row.color, padding: '6px 2px', textAlign:'center',  borderRight:'1px solid #8080805c'}}>{row.user_id}</TableCell>
                <TableCell component="th" scope="row" style={{borderRight:'1px solid #8080805c'}} >
                  <TabCellMobile row={row} /> 
                </TableCell>
                
                <TableCell align="right" style={{borderRight:'1px solid #8080805c'}} >{formatDate(row.user_last_seen)}</TableCell> 
                 
              </TableRow>
            ))
            : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((num, index) => (
              <TableRow key={index}    style={ {backgroundColor: index % 2 === 0 ? '#80808038': '' }} >
                <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="left" style={{ width: '4px', maxWidth: '4px'}}><LinearIndeterminate /></TableCell>
                <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} component="th" scope="row">
                    <LinearIndeterminate /> 
                  
                </TableCell>
                <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="right"><LinearIndeterminate /></TableCell>
                 
              </TableRow>)) 
          }
          </TableBody>
        </Table>
  
        <div style={{display: tabValue.length ? 'flex': 'none', margin: 18, padding:5}}> 
           <Pagination  count={amPage2} page={page} onChange={handleChangePage} color="primary" />
        </div>
       
      </TableContainer>
       
      {/*<EventDetail  orgRow={orgRow}  isOpen={isOpenDetail} closeDetail={closeDetail} />*/}
      {/*<MessAlert  openRed={openRed} openGreen={openGreen} />*/}
      </React.Fragment>
    );
  }
 
 
  return ( 
    <React.Fragment>
    <TableContainer style={{ overflowX: 'unset', marginTop: 8, maxWidth:'100%'}} component={Paper}>
      <Table  className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{padding: '6px 4px', textAlign:'center',  borderRight:'1px solid #8080805c'}}>id</TableCell>
            <TableCell align="right">ФИО</TableCell> 
            <TableCell align="right">Организация</TableCell>
            <TableCell align="right">последняя активность</TableCell> 
            {/* <TableCell align="right">Дата активности</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tabValue.length ? tabValue
          .filter((row,i) => i >= (page * 10 - 10) && i < (page * 10) )
          .filter((row,i) => row.user_name.split(' ').length > 1)
          .map((row, index) => (
            <TableRow key={index} onClick={()=> { showEvents(row)}}  style={ {backgroundColor: index % 2 === 0 ? '#80808038': ''}} >
              <TableCell align="left" style={{backgroundColor:row.color, padding: '6px 4px', textAlign:'center',  borderRight:'1px solid #8080805c'}}>{row.user_id}</TableCell>
              <TableCell component="th" scope="row" style={{borderRight:'1px solid #8080805c'}} >
                {row.user_name}
              </TableCell>
              <TableCell align="right" style={{borderRight:'1px solid #8080805c'}} >{row.org_name}</TableCell>
              <TableCell align="right" style={{borderRight:'1px solid #8080805c'}} >{formatDate(row.user_last_seen)}</TableCell>
              {/* <TableCell align="right" style={{borderRight:'1px solid #8080805c'}} >{row.user_post}</TableCell> */}
               
            </TableRow>
          ))
          : [1,2,3,4,5,6,7,8,9,10].map((num, index) => (
            <TableRow key={index}    style={ {backgroundColor: index % 2 === 0 ? '#80808038': '', opacity: index % 2 === 0 ? 0.3: 0.6 }} >
             <TableCell align="left" style={{padding: '6px 4px', textAlign:'center',  borderRight:'1px solid #8080805c'}}>{amObjsValue ? '0' : <LinearIndeterminate />}</TableCell>
              <TableCell component="th" scope="row" style={{borderRight:'1px solid #8080805c'}} >
                {amObjsValue ? 'нет данных' : <LinearIndeterminate />}
              </TableCell>
              <TableCell align="right" style={{borderRight:'1px solid #8080805c'}} >{amObjsValue ? 'нет данных' : <LinearIndeterminate />}</TableCell>
              <TableCell align="right" style={{borderRight:'1px solid #8080805c'}} >{amObjsValue ? 'нет данных' : <LinearIndeterminate />}</TableCell>
              {/* <TableCell align="right" style={{borderRight:'1px solid #8080805c'}} ><LinearIndeterminate /></TableCell> */}
               
            </TableRow>)) 
            }
        </TableBody>
      </Table>

      <div style={{opacity: tabValue.length ? 1: .3, margin: 18, padding:5}}> 
         <Pagination  count={amPage2} page={page} onChange={handleChangePage} color="primary" />
      </div>
     
    </TableContainer>
     
    {/*<EventDetail  orgRow={orgRow}  isOpen={isOpenDetail} closeDetail={closeDetail} />*/}
    {/*<MessAlert  openRed={openRed} openGreen={openGreen} />*/}
    </React.Fragment>
  );
}
 
  export default TabUsersComponent; 