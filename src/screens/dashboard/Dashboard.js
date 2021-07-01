import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
 
// import TabLoader from '../../components/tabLoader/TabLoader'; 
import LineChartWrap from './LineChart.wrap'; 
import Deposits from './Deposits';
import NewOGH from './NewOGH';
import TableListHistories from './TableListHistories';
import './dashboard.styles.scss';
import ChipsArray from './Chips';

import { selectIsFetchingUserOnline, selectErrorFetch } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import {  fetchEventsPointShortAsync, fetchAmountOGHForDashboardAsync ,fetchAmountOGHToDayAsync,fetchAmountOGHToWeekAsync, fetchAmountOGHToThreeDaysAsync, fetchGenStatsAsync, setMessageError  } from '../../store/adminPanelTrest/adminPanelTrest.actions';
 
import { selectGenStats } from '../../store/adminPanelTrest/StatisticPage.selectors'; 

  
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: theme.spacing(0)
  },  
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // height: '100vh',
    overflow: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: '94vh'
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    // paddingLeft: theme.spacing(10),
    // minWidth: 1400,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 'auto',

    // elevation: 3,
    // marginLeft: 0 //нижняя таблица первой страницы
  },news: {
    '&:hover': {
      background: "#f00",
   }, 
  },
  fixedHeight: {
    minHeight: 282,
    // marginTop: -15
  },
  chip: {margin: 0,}
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let lineHeader = 'Текущая информация по событиям и пользователям';
// let maxWidthGridOGH = '295px';

const Dashboard = ({ selectErrorFetch, fetchGenStats, genStatsAll, fetchEventsPointShort,    fetchAmountOGH,fetchAmountOGHToDay,fetchAmountOGHToWeek, fetchAmountOGHToThreeDays, setMessageError}) => {
  const classes = useStyles();
  // const [valueChip, setValueChip] = React.useState([]);

  //smgt
  useEffect(() => {

    fetchEventsPointShort({limit: 1200, offset: 0}); // graphic new_rec
    // console.log('fetchEventsPointShort',fetchEventsPointShort)
    // for "Количество ОГХ"
    fetchAmountOGH();
 
    // for "Новые ОГХ"
    fetchAmountOGHToDay();
    fetchAmountOGHToWeek(); 
    fetchAmountOGHToThreeDays();

    fetchGenStats();
    
  }, [fetchEventsPointShort, fetchAmountOGH, fetchAmountOGHToDay, fetchAmountOGHToWeek, fetchAmountOGHToThreeDays, fetchGenStats])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const winWidth = window.innerWidth; 
  //let // minWidthOGH = 320;
  let nowrap = 'nowrap'; 

  if (winWidth < 550) {
      lineHeader = 'Информация по событиям';
      // maxWidthGridOGH = 'unset' //по событиям';
      nowrap = 'wrap';
  }else if (winWidth === 1024) {
    // minWidthOGH = 252;
  }else if (winWidth === 768) {
    // minWidthOGH = 252;
  }else if (winWidth === 1280) {
    // minWidthOGH = 252;
  }
  
  if (winWidth === 320) {
    // minWidthOGH = 230;
  }

  // const amHenler = React.useCallback( (data) => {
    // setValueChip(data);
  // },[]);
  // },[setValueChip]);

  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }

    // setOpen(false);
      setMessageError(null);
  };
   

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false}  className={classes.container}>
          {/* <Grid container   style={{display:'flex', gap: '4px 5px', flexDirection:'row', justifyContent:'flex-start', flexWrap: 'wrap', alignItems: 'end',padding: 0 }} > */}
            
            <Grid item xs={12} md={5} lg={6} style={{
              // minWidth: 250,
              maxWidth: 600,
              // boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)', margin:'0 auto'
              }} >
              <Paper elevation={3} className={fixedHeightPaper} >
                <h4 style={{ textAlign:'center', position:'relative', marginTop:'0px', left: '0'}}> {lineHeader}</h4>
                <LineChartWrap  />
              </Paper>
            </Grid>
            
            
            {/* <Grid xs={12} md={12} lg={6} style={{display:'flex', gap: 4 , flexWrap:'wrap' , justifyContent:'flex-start', marginLeft: 0}}> */}
            {/* <Grid xs={12} md={12} lg={6} > */}
            <div  style={{display:'flex', gap: 4 , flexWrap: nowrap , justifyContent:'flex-start', marginLeft: 0}}> 
                  {/* <Grid item xs={12} md={6} lg={6} style={{minWidth: minWidthOGH,maxWidth: maxWidthGridOGH, marginRight:0}} > */}
                  <Grid item xs={12} md={6} lg={6}  >
                    <Paper elevation={3} className={fixedHeightPaper}>
                      <Deposits /> {/* Количество ОГХ */}
                    </Paper> 
                  </Grid>
                  
                  {/* <Grid item xs={12} md={6} lg={6} style={{minWidth: minWidthOGH,maxWidth: maxWidthGridOGH}} > */}
                  <Grid item xs={12} md={6} lg={6}  >
                    <Paper elevation={3} className={fixedHeightPaper}>
                      <NewOGH />  {/* Новые ОГХ */}
                    </Paper>
                  </Grid> 
            </div>
            
            <Grid item  xs={12}>
              <Paper className={classes.chip}>
                {/* краткие данные */}
                 <ChipsArray data={genStatsAll} />
              </Paper>
            </Grid>
            

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <TabLoader  /> */}
                <TableListHistories  />
              </Paper>
            </Grid>
            
            <Grid item xs={12} style={{display: selectErrorFetch ? 'block': 'none'}} >
              <Paper className={classes.paper}>
                {/* <TabLoader  /> */}
                 
                 <Snackbar open={selectErrorFetch} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                      {selectErrorFetch}
                    </Alert>
                  </Snackbar>
              </Paper>
            </Grid>
            
          {/* </Grid> */}
           
        </Container>
      </main>
    </div>
  );
}


const mapStateToProps = createStructuredSelector ({
  genStatsAll: selectGenStats,
  isFetchingUserOnline: selectIsFetchingUserOnline,
  selectErrorFetch: selectErrorFetch,
});


const mapDispatchToProps = (dispatch) => ({
    fetchGenStats: () => dispatch(fetchGenStatsAsync()), 
    fetchEventsPointShort: ({limit, offset}) => dispatch(fetchEventsPointShortAsync({limit, offset})),
    
    fetchAmountOGH: () => dispatch(fetchAmountOGHForDashboardAsync()),

    fetchAmountOGHToDay: () => dispatch(fetchAmountOGHToDayAsync()),
    fetchAmountOGHToWeek: () => dispatch(fetchAmountOGHToWeekAsync()),
    fetchAmountOGHToThreeDays: () => dispatch(fetchAmountOGHToThreeDaysAsync()),

    setMessageError: () => dispatch(setMessageError()),
});
 
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
