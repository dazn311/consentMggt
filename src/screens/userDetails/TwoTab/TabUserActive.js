
import React, { useEffect, useState } from 'react';
// import { useHistory } from "react-router-dom";
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
import LinearProgress from '@material-ui/core/LinearProgress'; 
import Pagination from '@material-ui/lab/Pagination'; 

import { Random } from 'react-animated-text';
  
import MessAlert from './Messages.alert';

import RectData from '../../../components/rec-data';

import { setObjCurrForDetailPageAsync  } from '../../../store/adminPanelTrest/adminPanelTrest.actions'; 
 
import { fetchDataForEventShortPoints } from '../../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { selectObjsInfoPage } from '../../../store/adminPanelTrest/StatisticPage.selectors';  
import { selectErrorFetchUserData } from '../../../store/user/user.selectors';

import EventDetail from './EventDetail';
import {formatDateISO} from "../../../hoc/formatDate";
 
const useStyles = makeStyles({
  progress: {
    width: '100%',
    '& > * + *': {
      marginTop: 4,
    },
    marginTop: 4,
  },
  table: {
    // minWidth: 650,
    borderTop: '1px solid rgb(130 119 119 / 47%)'
  },
  cell: {
    minHeight: 20,  
    opacity: 0.3
  },
  cellOpacity: {
    minHeight: 20, 
    opacity: 0.1
  },
}); 

const LinearIndeterminate = () => {
  const classes = useStyles();

  return (
    <div className={classes.progress}>
      <LinearProgress />
      {/* <LinearProgress color="secondary" /> */}
    </div>
  );
}

////////////////////////////

// let pageCoutnt = 0;
const TabUserActive = ({ allStatsData, offset, isLoading, errorFetchUserData, curUser}) => {

  const [page, setPage] = React.useState(1); 
  const [recData, setRecData] = React.useState(0);
  const [isOpenDetail, setIsOpenDetail] = useState(false); 

 

  useEffect(() => { 
    if (offset === '0'){
      setPage(1);
    }
    
  },[offset])

  const classes = useStyles();
   
  const handleChangePage = (event, newPage) => { 
      // setPageT(newPage);
      // setPage(newPage); 
  }; 

  // для детальной информации
  const closeDetail = () => {
    setIsOpenDetail(false);
  }

  const setCurUserEventData = (row) => { 
    setRecData(row); 
  }
  const setEmptyRecData = () => {
    setRecData(0); 
  }



  return (
    <React.Fragment>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{padding: '6px 0px 6px 0px', width: '4px', maxWidth: '2px'}}></TableCell>

            { window.innerWidth < 500 && <TableCell align="center">Тип действия / Дата</TableCell> }
            { window.innerWidth > 500 && <TableCell align="center">Тип действия</TableCell> }
            { window.innerWidth > 500 && <TableCell align="center">Дата</TableCell> }

            <TableCell align="center">Объект</TableCell>
            <TableCell align="center">Ответчик</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {  allStatsData && allStatsData.length  ?
           allStatsData
          .filter((row,i) => i < 11)
          .map((row, index) => (
            <TableRow key={index} onClick={() => setCurUserEventData(row)}  style={ {backgroundColor: index % 2 === 0 ? '#80808038': '', opacity: isLoading  ? .3 : 1, scale: isLoading  ? .3 : 1}} >
              <TableCell align="left" style={{backgroundColor: row.rec_status === 2 ? 'cornflowerblue' : 'indianred', padding: '6px 0px 6px 0px', width: '4px', maxWidth: '4px'}}></TableCell>

              { window.innerWidth < 500 &&
              <TableCell component="th" scope="row" style={ {  scale: isLoading  ? .3 : 1}}>
                {!isLoading ? row.rec_name : <Random text={row.rec_name}  effect="verticalFadeOut" effectDirection="down" effectChange={3.0} />}
              </TableCell>}

              { window.innerWidth > 500 && <TableCell component="th" scope="row" style={ {  scale: isLoading  ? .3 : 1}}>
                {!isLoading ? row.rec_name : <Random text={row.rec_name}  effect="verticalFadeOut" effectDirection="down" effectChange={3.0} />}
              </TableCell> }
              { window.innerWidth > 500 && <TableCell align="right">
                {!isLoading ? (row.rec_date_interval ? row.rec_date_interval : formatDateISO(row.rec_date))  : <Random text={row.rec_date}  effect="verticalFadeOut" effectDirection="down" effectChange={3.0} />}
              </TableCell> }

              <TableCell align="right">
              {!isLoading ? row.rec_obj_name : <Random text={row.rec_obj_name}  effect="verticalFadeOut" effectDirection="down" effectChange={3.0} />}
              </TableCell>
              <TableCell align="right">
              {!isLoading ? row.rec_recip_fio : <Random text={row.rec_recip_fio}  effect="verticalFadeOut" effectDirection="down" effectChange={3.0} />}
              </TableCell>
            </TableRow>
          )) : [{typeEv: 'new_rec', dateEvent:'02.05.21', messData:'новое событие'},
          {typeEv: 'new_rec', dateEvent:'02.05.21', messData:'новое событие'},
          {typeEv: 'done_rec', dateEvent:'02.05.21', messData:'новое событие'},
          {typeEv: 'done_rec', dateEvent:'02.05.21', messData:'новое событие'},
          {typeEv: 'new_msg', dateEvent:'02.05.21', messData:'новое событие'},
          {typeEv: 'done_rec', dateEvent:'02.05.21', messData:'новое событие'},
          {typeEv: 'new_msg', dateEvent:'02.05.21', messData:'новое событие'},
          {typeEv: 'new_msg', dateEvent:'02.05.21', messData:'новое событие'},
          {typeEv: 'new_msg', dateEvent:'02.05.21', messData:'новое событие'}].map((num, index) => (
            <TableRow key={index}    style={ {backgroundColor: index % 2 === 0 ? '#80808038': '' }} >
              <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="left" style={{ width: '4px', maxWidth: '4px'}}><LinearIndeterminate /></TableCell>
              { window.innerWidth < 500 && <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} component="th" scope="row"> {num.typeEv} / {num.dateEvent} <LinearIndeterminate />  </TableCell> }

              { window.innerWidth > 500 && <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} component="th" scope="row"> {num.typeEv} <LinearIndeterminate />  </TableCell> }
              { window.innerWidth > 500 && <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="right">{num.dateEvent}<LinearIndeterminate /></TableCell> }

              <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="right">{num.messData}<LinearIndeterminate /></TableCell> 
            </TableRow>))   
        }
        </TableBody> 
      </Table>
      <div style={{display:'flex',margin: 18, opacity: isLoading ? .3 : 1}}> 
         <Pagination count={1} page={page} onChange={handleChangePage} color="primary" />
      </div>
     
    </TableContainer>

    <MessAlert  openRed={!!errorFetchUserData} openGreen={false} />
    <RectData  recData={recData} setEmptyRecData={setEmptyRecData} curUser={curUser} />
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector ({ 
    selectObjsInfo: selectObjsInfoPage, // события короткие данные для таблицы
    datesOfFetchForEvent: fetchDataForEventShortPoints, //  дата начала и конца для запроса
    errorFetchUserData: selectErrorFetchUserData, //  дата начала и конца для запроса
  });
  
  const mapDispatchToProps = (dispatch) => ({ 
    setObjCurrForDetailPage: (object ) => dispatch(setObjCurrForDetailPageAsync(object )),
  });  
  export default connect(mapStateToProps,mapDispatchToProps)(TabUserActive);