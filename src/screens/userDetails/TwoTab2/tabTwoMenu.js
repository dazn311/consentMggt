import React,{ useState,useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'; 
import { chunk, reduce } from 'lodash'; 


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



import { makeStyles } from '@material-ui/core/styles';

import DatePicker from './DatePicker.twoTab';
import DatePickerEnd from './DatePickerEnd.twoTab';

 
import LineChart from './LineChartWithXAxisPading.twoTab';

 

import './tabTwoMenu.styles.scss';

 
import { fetchAllEventsGraphicAsync, fetchAllUsersGraphicAsync } from '../../../store/adminPanelTrest/adminPanelTrest.actions';
 

import { selectNewEventsGraphOfStaticPage, selectEndEventsGraphOfStaticPage, selectDenyEventsGraphOfStaticPage, selectUsersOnlineGraphOfStaticPage, selectNewMessageGraphOfStaticPage } from '../../../store/adminPanelTrest/StatisticPage.selectors'; 

let InitionalData = [
  // {
  //   name: '08:00', Events: 7, Users: 0, Closed: 5, activeChat: 3,
  // },
  // {
  //   name: '09:00', Events: 7, Users: 0, Closed: 5, activeChat: 3,
  // },
  // {
  //   name: '10:00', Events: 7, Users: 0, Closed: 5, activeChat: 4,
  // },
  // {
  //   name: '11:00', Events: 7, Users: 0, Closed: 5, activeChat: 3,
  // },
  // {
  //   name: '12:00', Events: 7, Users: 0, Closed: 5, activeChat: 3,
  // },
  // {
  //   name: '13:00', Events: null, Users: null, Closed: null, activeChat: 14,
  // },
  // {
  //   name: '14:00', Events: null, Users: null, Closed: null, activeChat: 21,
  // },
  // {
  //   name: '15:00', Events: null, Users: null, Closed: null, activeChat: 21,
  // },
  // {
  //   name: '16:00', Events: null, Users: null, Closed: null, activeChat: 32,
  // },
  // {
  //   name: '17:00', Events: null, Users: null, Closed: null, activeChat: 30,
  // },
  // {
  //   name: '18:00', Events: null, Users: null, Closed: null, activeChat: 0,
  // },
];


const initionalDateStart = () => {
  let newDate = new Date();//.toISOString().split('T')[0];
  newDate.setDate(newDate.getDate() - 7);
  return newDate.toISOString().split('T')[0];
}

const initionalDateEnd = () => {
  let newDate = new Date();//.toISOString().split('T')[0];
  return newDate.toISOString().split('T')[0];
}

// const monthArr = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  tabWrap: {
    border: 'none',
    display: 'flex',
    fontSize: 'large',
    marginTop: '30px',
    padding: '10px',
    // borderTop: '1px solid rebeccapurple',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  tabRight: {width: '80%', display: 'flex', overflowY: 'scroll', overflowX: 'scroll', scrollbarColor: 'grey red', cursor: 'all-scroll',boxShadow: '0px 0px 10px 0px darkgrey',textAlign: 'center'},
  tabLeft: {width: '20%', marginRight: '10px', paddingRight:'5px', paddingLeft:'15px',boxShadow: '0px 0px 10px 0px darkgrey', color: 'red'},
  datePick: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    margin: '10px 0px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  table: {
    minWidth: 650,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

let tmpGraphicValue = '';
// let tmpAmountEvents = 0;

const TabTwoMenu = ({fetchAllEventsGraphic, fetchAllUsersGraphic, newEventsGraphOfStaticPage, endEventsGraphOfStaticPage, selectDenyEvents, usersOnlineGraphOfStaticPage, newMessageGraphOfStaticPage})=> {
  const [graphicValue, setGraphicValue] = useState('');
  const [dateWidth, setDateWidth] = useState(1);
  const [dateStart, setDateStart] = useState(initionalDateStart);
  const [dateEnd, setDateEnd] = useState(initionalDateEnd);
  const classes = useStyles();

  // console.log('TabTwoMenu init');
  // console.log('TabTwoMenu dateWidth', dateWidth);
  const setDateStartFromPicker = (date) => {setDateStart(date)};
  const setDateEndFromPicker = (date) => {setDateEnd(date)};

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  }
 

   
  useEffect(() => {

    const d1 = new Date(dateStart).getDate();
    const d2 = new Date(dateEnd).getDate();
    const deltaDate = +d2 - +d1;
    setDateWidth(deltaDate);
    // console.log('deltaDate',deltaDate);
    const dateEndPlus = dateEnd + 'T18:00:00.000Z';
    fetchAllUsersGraphic(dateStart, dateEndPlus);
    fetchAllEventsGraphic('new_rec', dateStart, dateEndPlus);
    fetchAllEventsGraphic('done_rec', dateStart, dateEndPlus);
    fetchAllEventsGraphic('deny_rec', dateStart, dateEndPlus);
    fetchAllEventsGraphic('new_msg', dateStart, dateEndPlus);
 
  }, [dateStart, dateEnd, fetchAllUsersGraphic,fetchAllEventsGraphic]);
 
  const setUserData = useCallback(
    (usersLine=[]) => {
      let maxUsersOfDay = [];
      const chunkUsers = chunk(usersLine,24); 
  
      for (let index = 0; index < chunkUsers.length; index++) {
        
        let max_of_array = Math.max.apply(Math, chunkUsers[index]);
        maxUsersOfDay.push(max_of_array);
        
      }
      // console.log('maxUsersOfDay',maxUsersOfDay); 
  
      let me1 = new Date(dateStart).getMonth() + 1;
      let y1 = new Date(dateStart).getYear();
      const dOm = daysInMonth(me1, y1);
      
      InitionalData = [];
      maxUsersOfDay.forEach((el,index) => {
          let d1 = new Date(dateStart).getDate() + index;
          if ( d1 > dOm +1) {
            d1 -= dOm;
          }
          let m1 = new Date(dateStart).getMonth() + 1;
          m1 = m1 < 10 ? '0' + m1: m1;
          
          let y1 = new Date(dateStart).getFullYear();
          const nameDM = d1 + '/' + m1 + '/' + y1;
          const newObj = {
            name: nameDM, Events: 0, Users: el, Closed: 0, deny: 0, activeChat: 0,
          }; 
          // InitionalData[index] = newObj; 
          InitionalData.push(newObj); 
      });
  
      // setGraphicValue(InitionalData);
      tmpGraphicValue = InitionalData;
    },
    [dateStart],
  )

  //////////////////////////
  const setNewEventData = useCallback(
    (usersLine=[]) => {
      let maxUsersOfDay = [];
      const chunkUsers = chunk(usersLine,24); 
  
      for (let index = 0; index < chunkUsers.length; index++) {
        // let max_of_array = Math.max.apply(Math, chunkUsers[index]);
        let sum_of_array = reduce(chunkUsers[index],(sum,n) => (sum + n),0);// Math.max.apply(Math, chunkUsers[index]);
        // console.log('sum_of array',sum_of_array);
        maxUsersOfDay.push(sum_of_array);
        
      }
  
      maxUsersOfDay.forEach((el,index) => {
          
        const newObj = {...InitionalData[index],  Events: el}; 
          // const newObj = {name: nameDM, Events: 0, Users: el, Closed: 0, activeChat: 0,}; 
          InitionalData[index] = newObj; 
      });
  
      // setGraphicValue(InitionalData);
      tmpGraphicValue = InitionalData;
    },
    [],
  )
  
  const setEndEventData = useCallback(
    (usersLine=[]) => {
      let maxUsersOfDay = [];
      const chunkUsers = chunk(usersLine,24); 
  
      for (let index = 0; index < chunkUsers.length; index++) {
        let sum_of_array = reduce(chunkUsers[index],(sum,n) => (sum + n),0);// Math.max.apply(Math, chunkUsers[index]);
        // console.log('sum_of array',sum_of_array);
        maxUsersOfDay.push(sum_of_array);
        
      } 
      maxUsersOfDay.forEach((el,index) => {
        const newObj = {...InitionalData[index],  Closed: el}; 
          // const newObj = {name: nameDM, Events: 0, Users: el, Closed: 0, activeChat: 0,}; 
          InitionalData[index] = newObj; 
      });
      // setGraphicValue(InitionalData);
      tmpGraphicValue = InitionalData;
    },
    [],
  )
  
  const setDenyEventData = useCallback(
    (denyEvents=[]) => {
      let maxUsersOfDay = [];
      const chunkUsers = chunk(denyEvents,24); 
  
      for (let index = 0; index < chunkUsers.length; index++) {
        let sum_of_array = reduce(chunkUsers[index],(sum,n) => (sum + n),0);// Math.max.apply(Math, chunkUsers[index]);
        // console.log('sum_of array',sum_of_array);
        maxUsersOfDay.push(sum_of_array);
        
      } 
      maxUsersOfDay.forEach((el,index) => {
        const newObj = {...InitionalData[index],  deny: el}; 
          // const newObj = {name: nameDM, Events: 0, Users: el, Closed: 0, activeChat: 0,}; 
          InitionalData[index] = newObj; 
      });
      // setGraphicValue(InitionalData);
      tmpGraphicValue = InitionalData;
    },
    [],
  )
  
  const setNewMessagesData = useCallback(
    (usersLine=[]) => {
      let maxUsersOfDay = [];
      const chunkUsers = chunk(usersLine,24); 
  
      for (let index = 0; index < chunkUsers.length; index++) {
        
        let sum_of_array = reduce(chunkUsers[index],(sum,n) => (sum + n),0);// Math.max.apply(Math, chunkUsers[index]);
        // console.log('sum_of array',sum_of_array);
        maxUsersOfDay.push(sum_of_array);
        
      }
      maxUsersOfDay.forEach((el,index) => {
          
        const newObj = {...InitionalData[index],  activeChat: el}; 
          // const newObj = {name: nameDM, Events: 0, Users: el, Closed: 0, activeChat: 0,}; 
          InitionalData[index] = newObj; 
      });
  
      tmpGraphicValue = InitionalData;
      setGraphicValue(tmpGraphicValue);
    },
    [ ],
  )

  // for one day ///////////////////////////////////
  const setDataEvants = useCallback(
    () => {
      const usersLine = usersOnlineGraphOfStaticPage.data.chartData;
      const newEvent = newEventsGraphOfStaticPage.data.chartData;
      const endEvent = endEventsGraphOfStaticPage.data.chartData;
      const denyEvent = selectDenyEvents.data.chartData;
      const newMess = newMessageGraphOfStaticPage.data.chartData;
  
      if (dateWidth){
        setUserData(usersLine);
        setNewEventData(newEvent);
        setEndEventData(endEvent);
        setDenyEventData(denyEvent);
        setNewMessagesData(newMess);
      } else {
        // set of one day
        // setUserOfOneDate(usersLine);
        // setNewEventOfOneDay(newEvent);
        // setEndEventOfOneDay(endEvent);
        // setDenyEventOfOneDay(denyEvent);
        // setNewMessageOfOneDay(newMess);
  
  
      }
    },
    [dateWidth, setUserData, setNewEventData, setEndEventData, setDenyEventData, setNewMessagesData, usersOnlineGraphOfStaticPage, newEventsGraphOfStaticPage, endEventsGraphOfStaticPage, selectDenyEvents, newMessageGraphOfStaticPage  ],
  )
 
  const amountEventSelects = useCallback(
    () => {
      // tmpAmountEvents += 1;
      
      // if(tmpAmountEvents === 5 ){
        setDataEvants()
      // }
      
    },
    [setDataEvants]
  );

  



  useEffect(() => {
     
    amountEventSelects();

    // console.log('rerender useEffect: TabTwoMenu');
    
  }, [usersOnlineGraphOfStaticPage,newEventsGraphOfStaticPage, endEventsGraphOfStaticPage,newMessageGraphOfStaticPage, selectDenyEvents, amountEventSelects])
  
  return (
    <React.Fragment>
      {/* <Title>Статистика по событиям за периоды</Title> */}
      <div className={classes.seeMore}>
            <div className={classes.datePick}>
                {/* <DatePickerOne setDataStart={setDateStartFromPicker}/> */}
                <DatePicker setDataStart={setDateStartFromPicker}/>
                <DatePickerEnd setDataEndforFetchEvents={setDateEndFromPicker}/>
            </div>
            <LineChart  graphicValue={graphicValue}/>
            <div className={classes.tabWrap}  >


              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Дата(время)</TableCell>
                      <TableCell align="right">Новые события</TableCell>
                      <TableCell align="right">Пользователи он-лайн</TableCell>
                      <TableCell align="right">Выполненых событий</TableCell>
                      <TableCell align="right">Отмененые события</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {graphicValue && graphicValue.map((item, index) => (
                      <TableRow key={index}  style={ {backgroundColor: index % 2 === 0 ? '#80808038': ''}} >
                        <TableCell component="th" scope="row">
                        {item.name}
                        </TableCell>
                        <TableCell align="right">{item.Events}</TableCell>
                        <TableCell align="right">{item.Users}</TableCell>
                        <TableCell align="right">{item.Closed}</TableCell>
                        <TableCell align="right">{item.deny}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
               
            </div>
      </div>
    </React.Fragment>
  );
}


const mapStateToProps = createStructuredSelector ({
  newEventsGraphOfStaticPage: selectNewEventsGraphOfStaticPage, // события короткие данные для таблицы
  endEventsGraphOfStaticPage: selectEndEventsGraphOfStaticPage, // классификация статусов "new_msg"
  selectDenyEvents: selectDenyEventsGraphOfStaticPage, // классификация статусов "new_msg"
  usersOnlineGraphOfStaticPage: selectUsersOnlineGraphOfStaticPage, // for color elements
  newMessageGraphOfStaticPage: selectNewMessageGraphOfStaticPage, //  дата начала и конца для запроса
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllEventsGraphic: (type, startDate, endDate) => dispatch(fetchAllEventsGraphicAsync(type, startDate, endDate)),
  fetchAllUsersGraphic: (startDate, endDate) => dispatch(fetchAllUsersGraphicAsync(startDate, endDate)),
  
});
export default connect(mapStateToProps, mapDispatchToProps)(TabTwoMenu);