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
import TablePagination from '@material-ui/core/TablePagination';
 
import { fetchObjectsListAsync  } from '../../../store/adminPanelTrest/adminPanelTrest.actions'; 
 
import { fetchDataForEventShortPoints } from '../../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { selectObjsPage } from '../../../store/adminPanelTrest/StatisticPage.selectors';  
 
import EventDetail from './EventDetail';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderTop: '1px solid rgb(130 119 119 / 47%)'
  },
});

function createData(color, objName, organization, objType,objID, objCreationDate,objRecsAmount,objStatus,objOwn) {
  return { color, objName, organization, objType, objID, objCreationDate, objRecsAmount, objStatus, objOwn};
}
 
let rows = [];
// let objsType = ['смежные объекты','объекты в разработке (наши)','все объекты'];
// let objsTypeColor = ['red','green','yellow'];
 
const refactData = (objectsList) => {
  rows = [];
  if ( objectsList && objectsList.length === 0 ){
    return false}
    if ( !objectsList){ return false}

  let nodeObjects = {};
  // console.log('refactData -- nodeObjects',objectsList);
  if (Array.isArray(objectsList) ) {
      // nodeObjects = _.orderBy(objectsList, ['objName'], ['asc']);
      nodeObjects = _.orderBy(objectsList, ['objCreationDate'], ['desc']);
      rows = nodeObjects;
  }
  if (nodeObjects == null) {
    rows = []
  }

  // if ( objectsList.length === 0 ){return false}
  // console.log('rerender refactData');
  rows = [];
  nodeObjects.map((nodeE) => { 
    var options = {year: 'numeric',month: 'numeric',day: 'numeric',timezone: 'UTC'};
    // const dateCreateObj = nodeE.objCreationDate ? nodeE.objCreationDate.split('T')[0] + ' ('+ nodeE.objCreationDate.split('T')[1] + ')' : '20.03.20';
    const newDate = new Date(nodeE.objCreationDate).toLocaleString("ru", options);

    let newNode = createData('red', nodeE.objName, nodeE.organization.orgname, nodeE.objType, nodeE.objID, newDate, nodeE.objRecsAmount, nodeE.objStatus, nodeE.objOwn);
    rows.push(newNode);
    return newNode
  });
}
 
// const UserComponent = ({username,orgname}) => (<>
//   <div style={{display: 'flex', flexDirection:'column'}} >
//     <div>{username}</div>
//     <div style={{fontSize:'12', color:'gray'}}>{orgname}</div>
//   </div>
// </>)
////////////////////////////

const TabObjs = ({ selectObjs,  fetchObjectsList,  searchValue, fieldValue,setAmountObj }) => {
  const [tabValue, settabValue] = useState([]);
  const [tabFilterValue, settabFilterValue] = useState([]);
  const [objIDfE, setObjIDfE] = useState(0);
  const [orgRow, setOrgName] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
 
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, tabValue.length - page * rowsPerPage);
  // console.log('rerender TabObjs -- emptyRows;',emptyRows);
  // console.log('rerender TabObjs -- tabValue;',tabValue);

  // obj_mggt

  useEffect(() => {
    // let lastDay = new Date(); 
    // lastDay.setDate(lastDay.getDate() - 1);
    // let weekDay = new Date(); 
    // weekDay.setDate(weekDay.getDate() - 7);
    // let monthDay = new Date(); 
    // monthDay.setDate(monthDay.getMonth() - 1);
 

    let inWork = 0;
    let inEndWork = 0;


    const amObjsHavRecs = tabValue && tabValue.filter(element => {
      inWork += element.objStatus ===  1;
      inEndWork += element.objStatus ===  2;
      // lastDayVal += new Date(element.objRecsAmount) > lastDay ? 1 : 0;
      // weekDayVal += new Date(element.objRecsAmount) > weekDay ? 1 : 0;
      // objRecsAmount
      return element.objRecsAmount > 0;
    });

      
    // const amountObjsHavRecs = amObjsHavRecs.length || 0;
    const amountObjsHavRecs = selectObjs.withRecs || 0;
    const amountObjsNotHavRecs = selectObjs.withoutRecs || 0;
    const tabValueLength = tabValue.length || 0;
    const amountObjsAll = selectObjs.totalAmount || 0;
    const tabFiltValueLength = tabValueLength;

    setAmountObj({amountObjsAll,tabFiltValueLength, tabValueLength, inWork, inEndWork, amountObjsHavRecs,amountObjsNotHavRecs});

    // setAmObjs({lastDayVal, weekDayVal,monthDayVal});
    // console.log('amObjsHavRecs : ',amObjsHavRecs);
    // console.log('setAmObjs отправка -- amountObjs, inWork, inEndWork, amountObjsHavRecs: ', amountObjsAll,amountObjs, inWork, inEndWork, amountObjsHavRecs);
    // console.log('selectObjs  : ',selectObjs.data.objects[0].objRecsAmount);

    settabFilterValue(tabValue);
    // console.log('useEffect 2  : ');
  }, [tabValue,selectObjs])

  useEffect(() => {
    
    let inWork = 0;
    let inEndWork = 0;


    const amObjsHavRecs = tabValue && tabValue.filter(element => {
      inWork += element.objStatus ===  1;
      inEndWork += element.objStatus ===  2;
      // lastDayVal += new Date(element.objRecsAmount) > lastDay ? 1 : 0;
      // weekDayVal += new Date(element.objRecsAmount) > weekDay ? 1 : 0;
      // objRecsAmount
      return element.objRecsAmount > 0;
    });

    const amountObjsHavRecs = selectObjs.withRecs || 0;
    const amountObjsNotHavRecs = selectObjs.withoutRecs || 0;
    const tabValueLength = tabFilterValue.length || 0;
    const amountObjsAll = selectObjs.totalAmount || 0;

    let tabFiltValueLength = tabValueLength -1;
    if(searchValue){
      tabFiltValueLength = tabValueLength -1;
    }else {
      tabFiltValueLength = selectObjs.totalAmount;
    }
    
 
    // setPage(0);

    setAmountObj({amountObjsAll,tabFiltValueLength, tabValueLength, inWork, inEndWork, amountObjsHavRecs,amountObjsNotHavRecs});

    // settabFilterValue(tabValue);
    // console.log('useEffect 1  : ');

  }, [tabFilterValue])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // console.log('handleChangePage',newPage);
  }; 

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    // console.log('handleChangeRowsPerPage');
  };

  
 
 
  // let orgName ='ss';
  const printUserId = (row) => {
    if (row.objRecsAmount){
      // console.log('row.userID',row.objID);
      // console.log('row 5555',row);
      setOrgName(row);
      // setObjIDfE(id);
      setIsOpen(true);
    }
    
  }
 
  useEffect(() => {
    // console.log('useEffect 3  : ');
    if (selectObjs.data.objects !== {}){
      refactData(selectObjs.data.objects);
      settabValue(rows);
      setPage(0);
    }
    // console.log('useEffect selectObjs',selectObjs.data.objects);
  },[selectObjs.data.objects]);
  
   
  const closeDetail = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    let newDate = new Date(); //.toISOString().split('T')[0];
    newDate.setDate(newDate.getDate() - 15);
    let startDate = newDate.toISOString();

    let newDateEnd = new Date();
    const endDate = newDateEnd.toISOString();

    fetchObjectsList({objectType: 2, organization: 0, limit: 1000, offset: 0, startDate: startDate, endDate: endDate});
    // fetchObjectsList({objectType: 2, organization: 0, limit: 1000, offset: 0, startDate:"2021-03-05T00:00:00.000Z", endDate:"2021-03-18T23:58:00.000Z"});
//"2021-03-05T00:00:00.000Z"
//endTime: "2021-03-18T23:58:00.000Z"

    // console.log('useEffect fetchObjectsList');
  },[fetchObjectsList]);

  useEffect(() => {

      //item.[fieldValue].toLowerCase().includes(searchValue.toLowerCase()) 
      //page
      const newTabV = tabValue.filter((item, idx) => { return typeof item.[fieldValue] === 'string'  ? item.[fieldValue].toLowerCase().includes(searchValue.toLowerCase()) :' '})
      // settabValue(newTabV);
      settabFilterValue(newTabV);

    // console.log('useEffect fetchObjectsList');
    // console.log('useEffect tabValue',tabValue);



  },[fieldValue, searchValue]);

 


  // const handleBackButtonClick = (event) => {
  //   onChangePage(event, page - 1);
  // };

  //promyashin////

  // const handleNextButtonClick = (event) => {
  //   onChangePage(event, page + 1);
  // };

 
  return ( 
    <><TableContainer component={Paper}>
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
          {tabFilterValue && tabFilterValue
          // .filter((item, idx) => { return typeof item.[fieldValue] === 'string'  ? item.[fieldValue].toLowerCase().includes(searchValue.toLowerCase()) :' '})
          // .filter((item, index) =>{ return index < rowsPerPage * page && index > rowsPerPage * (page -1)})
          .filter((item, index) =>{ return index < rowsPerPage * page + rowsPerPage && index > rowsPerPage * page})
          // .filter((item, index) =>{ return item.objCreationDate < new Date('2021-03-15') && item.objCreationDate > new Date('2021-03-10')})
          // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => (
            <TableRow key={index} onClick={()=> { printUserId(row)}}>
              <TableCell align="left" style={{backgroundColor:row.color, padding: '6px 0px 6px 0px', width: '4px', maxWidth: '4px'}}></TableCell>
              <TableCell component="th" scope="row">
                {row.objName}
              </TableCell>
              <TableCell align="right">{row.organization}</TableCell>
              <TableCell align="right">{row.objType}</TableCell>
              <TableCell align="right">{row.objRecsAmount}</TableCell>
              <TableCell align="right">{row.objOwn > 0 ? 'МГГТ' : 'Смежн'}</TableCell>
              <TableCell align="right">{row.objCreationDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
      <div style={{display:'flex'}}>
        <div style={{alignSelf: 'center',marginLeft:10}}> всего объектов: <span style={{color:'red'}}>{selectObjs.amount} ( {tabFilterValue.length -1}  )</span>  </div>
        <TablePagination
                rowsPerPageOptions={[15, 25, 40, { label: 'Все', value: -1 }]}
                // colSpan={5}
                // count={rows.length}
                count={tabFilterValue.length}
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
    </TableContainer>
     
    <EventDetail objID={objIDfE} orgRow={orgRow} tabValue={tabValue} isOpen={isOpen} closeDetail={closeDetail} />
    </>
  );
}
 
const mapStateToProps = createStructuredSelector ({
    selectObjs: selectObjsPage, // события короткие данные для таблицы
    datesOfFetchForEvent: fetchDataForEventShortPoints, //  дата начала и конца для запроса
  });
  
  const mapDispatchToProps = (dispatch) => ({
    // Для  
    fetchObjectsList: (objectType, organization, limit, offset, startDate, endDate) => dispatch(fetchObjectsListAsync(objectType, organization, limit, offset, startDate, endDate)),
  });  
  export default connect(mapStateToProps,mapDispatchToProps)(TabObjs); 