
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
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

// import CircularProgress from '@material-ui/core/CircularProgress';
// import TablePagination from '@material-ui/core/TablePagination';
import Pagination from '@material-ui/lab/Pagination';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import * as locales from '@material-ui/core/locale';
// import BackDrop from  '../../../components/blackDrop/black-drop.component'

import { Random, Wave  } from 'react-animated-text';
  
import MessAlert from './Messages.alert';


// import { selectObjRectPage } from '../../../store/adminPanelTrest/objsPage.selectors';
import { fetchDataForEventShortPoints } from '../../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { selectObjsInfoPage } from '../../../store/adminPanelTrest/StatisticPage.selectors';  
  
import EventDetail from './EventDetail';
import {formatDateISO} from '../../../hoc/formatDate';

const useStyles = makeStyles({
  progress: {
    width: '100%',
    '& > * + *': {
      marginTop: 4,
    },
    marginTop: 4,
  },
  table: {
    minWidth: 650,
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

const CellTab = ({obj, org, name}) => {
  return (<div style={{display: 'flex',flexDirection: 'column'}} >
            <div style={{maxWidth: 400, textAlign:'end'}} > {obj}</div>
      <div style={{maxWidth: 400, color: '#9ac8ef', textAlign:'end', borderTop: '1px solid grey'}}>{org} </div>
    {org !== name ? <div style={{maxWidth: 400, color: org.includes('Мосгоргеотрест') ? 'rgb(225 243 155 / 56%)' :'#d8d8d8', textAlign:'end'}}>{name} </div> : ''}
          </div>)
}

////////////////////////////

// let pageCoutnt = 0;


////////////////////////////////
const TabObjsEvent = ({ tabValue, isOpenD=true, isLoading }) => {

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  // const [orgRow, setOrgName] = useState({});
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const history = useHistory();


  useEffect(() => {

    if ( tabValue ) {
      const newPages = Math.ceil(tabValue.length / 6);
      setPages(newPages);
    }


  },[tabValue])

  const classes = useStyles();
   
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  // для детальной информации
  const closeDetail = () => {
    setIsOpenDetail(false);
  }
  const showEvents = (row) => {
  }

  let openRed = false, openGreen = false;

  if (!tabValue) { 
    openRed = true;
  }else {
    openRed = false;
    // openGreen = true;
  }

  return ( 
    <React.Fragment>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{padding: '6px 0px 6px 0px', width: '4px', maxWidth: '2px'}}></TableCell>
            <TableCell align="center">Наименование</TableCell>
            <TableCell  align="center">Инициатор</TableCell>
            <TableCell   align="center">Получатель</TableCell>
            <TableCell align="right">Дата создания</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabValue && tabValue.length ?
              tabValue
          .filter((row,i) => i < (page*6) && i >= (page*6 -6) )
          .map((row, index) => (
            <TableRow key={index} onClick={()=> { showEvents(row)}}  style={ {backgroundColor: index % 2 === 0 ? '#80808038': '', opacity: isLoading  ? .3 : 1, scale: isLoading  ? .3 : 1}} >
              <TableCell align="left" style={{backgroundColor:row.rec_status === 2? '#337ab7bf': '#166d16', padding: '6px 0px 6px 0px', width: '4px', maxWidth: '4px'}}></TableCell>
              <TableCell component="th" scope="row" style={ {  scale: isLoading  ? .3 : 1}}>
                {!isLoading  ? row.rec_name : <Random
                            text={row.rec_name}
                            effect="verticalFadeOut"
                            effectDirection="down"
                            effectChange={3.0}
                          />}
              </TableCell>
              <TableCell align="right">
              {!isLoading ? <CellTab obj={row.sender.objname} org={row.sender.orgname} name={row.sender.username} />  : <Random
                            text={row.sender.objname}
                            effect="verticalFadeOut"
                            effectDirection="down"
                            effectChange={3.0}
                          />}
                          </TableCell>
              <TableCell align="right">
              {!isLoading ? <CellTab obj={row.receip.objname} org={row.receip.orgname} name={row.receip.username} /> : <Random
                            text={row.receip.objname}
                            effect="verticalFadeOut"
                            effectDirection="down"
                            effectChange={3.0}
                          />}
                 
              </TableCell>
              <TableCell align="right">{formatDateISO(row.rec_date) }</TableCell>

            </TableRow>
          )) : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(( _, index) => (
            <TableRow key={index}    style={ {backgroundColor: index % 2 === 0 ? '#80808038': '' }} >
              <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="left" style={{ width: '4px', maxWidth: '4px'}}></TableCell>
              <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} component="th" scope="row">
                 {tabValue ? <LinearIndeterminate /> 
                 : (isLoading  ? <Random
                  text={'нет данных'} 
                  effect="verticalFadeOut"
                  effectDirection="down"
                  effectChange={3.0}
                /> : 'нет данных')}    
              </TableCell>
              <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="right">{tabValue ? <LinearIndeterminate /> 
                 : (isLoading  ? <Random
                  text={'нет данных'} 
                  effect="verticalFadeOut"
                  effectDirection="down"
                  effectChange={3.0}
                /> : 'нет данных')}   </TableCell>
              <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="right">{tabValue ? <LinearIndeterminate /> 
                 : (isLoading  ? <Random
                  text={'нет данных'} 
                  effect="verticalFadeOut"
                  effectDirection="down"
                  effectChange={3.0}
                /> : 'нет данных')}   </TableCell>
              <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="right">{tabValue ? <LinearIndeterminate /> 
                 : (isLoading  ? <Random
                  text={'нет данных'} 
                  effect="verticalFadeOut"
                  effectDirection="down"
                  effectChange={3.0}
                /> : 'нет данных')}   </TableCell>
               
            </TableRow>))

        }
        </TableBody> 
      </Table>
      <div style={{display:'flex',margin: 18, opacity: isLoading ? .3 : 1}}> 
         <Pagination count={ pages } page={ page } onChange={handleChangePage} color="primary" />
      </div>
      <div style={{display:'flex',margin: 28, opacity: isLoading ? .3 : 1}}>
        <div> <span style={{backgroundColor: '#337ab7bf', padding: '4px 6px'}} >* в работе</span>  , <span style={{backgroundColor: '#166d16', padding: '4px 6px'}} >* завершенные</span>  </div>
      </div>
     
    </TableContainer>
     
    {/*<EventDetail  orgRow={orgRow}  isOpen={isOpenDetail} closeDetail={closeDetail} />*/}
    <MessAlert  openRed={openRed} openGreen={openGreen} />
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector ({
    // selectObjs: selectObjRectPage, // события короткие данные для таблицы
    selectObjsInfo: selectObjsInfoPage, // события короткие данные для таблицы
    datesOfFetchForEvent: fetchDataForEventShortPoints, //  дата начала и конца для запроса
  });


export default connect(mapStateToProps)(TabObjsEvent);