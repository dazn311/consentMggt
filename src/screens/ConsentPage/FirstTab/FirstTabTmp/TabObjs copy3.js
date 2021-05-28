'strick'
import React, { useState } from 'react';
// import _ from "lodash";

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
import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as locales from '@material-ui/core/locale';
// import BackDrop from  '../../../components/blackDrop/black-drop.component'
 
import MessAlert from './Messages.alert';
  
// import { fetchObjectsListAsync  } from '../../../store/adminPanelTrest/adminPanelTrest.actions'; 
 
import { fetchDataForEventShortPoints } from '../../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { selectObjsPage } from '../../../store/adminPanelTrest/StatisticPage.selectors';  
 
import EventDetail from './EventDetail';
 
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderTop: '1px solid rgb(130 119 119 / 47%)'
  },
}); 

////////////////////////////

// let pageCoutnt = 0;
const TabObjs = ({ tabValue, isOpenD=true, rowsPerPage, setRowsPerPage,setPageT,offset,amObjsValue }) => {

  const [page, setPage] = React.useState(0);
  // const [setPage] = React.useState(0);
  const [orgRow, setOrgName] = useState({});
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [locale, setLocale] = React.useState('ruRU');
  
  // const {currentPage, totalPages, amount} = amObjsValue;
  // console.log('TabObjs -- currentPage, totalPages, amount',currentPage, totalPages, amount);
  // console.log('TabObjs -- page',page);

  const classes = useStyles();
   
  const handleChangePage = (event, newPage) => {
    // if (newPage === 1) {
      // pageCoutnt += newPage;
      setPageT(newPage);
      setPage(newPage);
   // }
    
    // console.log('handleChangePage --newPage',newPage);
    // console.log('handleChangePage -- pageCoutnt',pageCoutnt);
  }; 

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    // console.log('handleChangeRowsPerPage');
  };

  // для детальной информации
  const closeDetail = () => {
    setIsOpenDetail(false);
  }
  const printUserId = (row) => {
    // console.log('printUserId -- row',row);

    // if (row.objRecsAmount){
      setOrgName(row);
      setIsOpenDetail(true);
    // }
  }
   
  // console.log('TabObjs -- rowsPerPage',rowsPerPage);
  // console.log('TabObjs -- tabValue',tabValue);
 
 // перенести поиск в tabOneMenu

  let openRed, openGreen;

 
  if (!tabValue) { 
    openRed = true;
    openGreen = false;
    return (<><div >Нет данных с таким фильтом</div><MessAlert  openRed={openRed} openGreen={openGreen} /></>);
    // return (<BackDrop isOpen={true} />);
  }else {
    openRed = false;
    openGreen = true;
  }
  
  return ( 
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{padding: '6px 0px 6px 0px', width: '4px', maxWidth: '2px'}}></TableCell>
            <TableCell align="right">Наименование объекта</TableCell> 
            <TableCell align="right">Балансодержатель</TableCell>
            <TableCell align="right">Тип</TableCell>
            <TableCell align="right">Количество событий</TableCell>
            <TableCell align="right">Принадлежит</TableCell>
            <TableCell align="right">Дата создания</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabValue
          // .filter((row,i) => i < 16)
          .map((row, index) => (
            <TableRow key={index} onClick={()=> { printUserId(row)}}  style={ {backgroundColor: index % 2 === 0 ? '#80808038': ''}} >
              <TableCell align="left" style={{backgroundColor:row.color, padding: '6px 0px 6px 0px', width: '4px', maxWidth: '4px'}}></TableCell>
              <TableCell component="th" scope="row">
                {row.objName}
              </TableCell>
              <TableCell align="right">{row.organization.orgname}</TableCell>
              <TableCell align="right">{row.objType}</TableCell>
              <TableCell align="right">{row.objRecsAmount}</TableCell>
              <TableCell align="right">{row.objOwn > 0 ? 'МГГТ' : 'Смежн'}</TableCell>
              <TableCell align="right">{new Intl.DateTimeFormat('ru-Ru').format(new Date(row.objCreationDate)) }</TableCell> 
               
            </TableRow>
          ))}
        </TableBody>
           
      </Table>
      <div style={{display:'flex'}}>
        {/* <div style={{alignSelf: 'center',marginLeft:10}}> объектов в таблице: <span style={{color:'red'}}>  {tabValue.length} </span>  </div> */}
        {/* <ThemeProvider theme={(outerTheme) => createMuiTheme(outerTheme, locales[locale])}> */}
        <TablePagination
                rowsPerPageOptions={[15, 25, 40, 1000]}
                // rowsPerPageOptions={[15, 25, 40, { label: 'Все', value: -1 }]}
                // colSpan={5}
                // count={rows.length}
                count={30}
                rowsPerPage={rowsPerPage}
                page={0}
                SelectProps={{
                  inputProps: { 'aria-label': 'объектов на странице' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
        />
         <Pagination count={2000} color="primary" />
        {/* </ThemeProvider> */}
      </div>
     
    </TableContainer>
     
    <EventDetail  orgRow={orgRow}  isOpen={isOpenDetail} closeDetail={closeDetail} />
    <MessAlert  openRed={openRed} openGreen={openGreen} />
    </>
  );
}
 
const mapStateToProps = createStructuredSelector ({
    selectObjs: selectObjsPage, // события короткие данные для таблицы
    datesOfFetchForEvent: fetchDataForEventShortPoints, //  дата начала и конца для запроса
  });
  
  const mapDispatchToProps = (dispatch) => ({
    // Для  
    // fetchObjectsList: (objectType, organization, limit, offset, startDate, endDate) => dispatch(fetchObjectsListAsync(objectType, organization, limit, offset, startDate, endDate)),
  });  
  export default connect(mapStateToProps,mapDispatchToProps)(TabObjs); 