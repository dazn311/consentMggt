import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// import { mainListItems, secondaryListItems } from './listItems';

// import HistoryObjLast from './History-obj-last';
// import NewsList from './NewsList';
// import ChangeLog from '../../components/changeLog/ChangeLog.component';
import LineChartWithXAxisPading from './LineChartWithXAxisPading';
import Deposits from './Deposits';
import NewObj from './NewObj';
import Header from '../../components/header/header.component';

import TableList from './TableListHistories.sceen';

import { selectIsFetchingUserOnline } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 
import { fetchAmountUsersForGraphicsAsync, fetchEventsPointShortAsync, fetchAmountNewEventsForGraphicAsync,fetchAmountOGHForDashboardAsync ,fetchAmountOGHToDayAsync,fetchAmountOGHToWeekAsync, fetchAmountOGHToThreeDaysAsync,fetchAmountEndEventsForGraphicAsync} from '../../store/adminPanelTrest/adminPanelTrest.actions'; 
 
import './dashboard.styles.scss';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mggt.ru/">
        МосГеоТрест
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },news: {
    '&:hover': {
      background: "#f00",
   },
  },
  fixedHeight: {
    height: 240,
  },
}));



const Dashboard = ({fetchDataUsersOnline, fetchEventsPointShort, fetchAmountNewEventsForGraphic, currentUser, isFetchingUserOnline, fetchAmountOGH,fetchAmountOGHToDay,fetchAmountOGHToWeek, fetchAmountOGHToThreeDays,fetchAmountEndEventsForGraphic}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');
  const [lineHeader, setLineHeader] = React.useState('Текущая информация по событиям и пользователям');

  // let lineHeader = 'Текущая информация по событиям и пользователям';
  // console.log('isFetchingUserOnline', isFetchingUserOnline);


  const fetchDataForGraphics = () => {

    

    const currentHours = new Date().getHours();
    

    if ((currentHours < 8 && currentHours >= 0) ) {
      // отобразить за вчерашний день
      const currentDayOfWeek = new Date().getDay(); //.toLocaleString()//.toISOString();
      // console.log('currentDayOfWeek',currentDayOfWeek);

      let offsetDay = 0;
      if ( currentDayOfWeek === 1) {
        offsetDay += 3
      }else if ( currentDayOfWeek === 7) {
        offsetDay += 2
      }else if ( currentDayOfWeek === 6) {
        offsetDay += 1
      }

      const yestoday = new Date();
      yestoday.setDate(yestoday.getDate() - offsetDay); 
       
      let newHeader = 'Информация по событиям и пользователям на ' + yestoday.toLocaleDateString();
      setLineHeader(newHeader);

      // console.log('yestoday', yestoday.toLocaleDateString());

      const yestodayStart = yestoday.toISOString().split('T')[0] + 'T08:00:00.000Z';
      const yestodayEnd = yestoday.toISOString().split('T')[0] + 'T19:00:00.000Z';

      fetchAmountNewEventsForGraphic(yestodayStart,yestodayEnd);
      fetchAmountEndEventsForGraphic(yestodayStart,yestodayEnd);
      fetchDataUsersOnline(yestodayStart,yestodayEnd);
    } else {
      const today = new Date();

      let newHeader = 'Информация по событиям и пользователям на ' + today.toLocaleDateString(); 
      setLineHeader(newHeader);
       
      const todayStart = today.toISOString().split('T')[0] + 'T08:00:00.000Z';
      const todayEnd = today.toISOString().split('T')[0] + 'T19:00:00.000Z';

      fetchAmountNewEventsForGraphic(todayStart,todayEnd);
      fetchAmountEndEventsForGraphic(todayStart,todayEnd);
      fetchDataUsersOnline(todayStart,todayEnd);
    }

    
  }
  
  useEffect(() => {
    // fetchAmountNewEventsForGraphic(); // graphic new event
    
    // fetchDataUsersOnline(); // graphic user on line
    fetchEventsPointShort(); // graphic new_rec
    // fetchAmountEndEventsForGraphic(); // graphic end_rec
    fetchDataForGraphics();

    // for "Количество ОГХ"
    fetchAmountOGH();

    // for "Новые ОГХ"
    fetchAmountOGHToDay();
    fetchAmountOGHToWeek(); 
    fetchAmountOGHToThreeDays();
    
    // const intervalFetch = setInterval(() => {
    //   fetchDataUsersOnline();
    //   fetchEventsPointShort();
    //   fetchAmountNewEventsForGraphic();
    //   fetchAmountEndEventsForGraphic();
    // }, 15*60*60);
    // return () => {
    //    clearInterval(intervalFetch) 
    // }
  }, [])
 


  const handleChange = (event, newValue) => {
    setValue(newValue);
    fetchAmountNewEventsForGraphic(); // graphic new event
    fetchDataUsersOnline(); // graphic user on line
    fetchEventsPointShort(); // graphic new_rec
    fetchAmountEndEventsForGraphic(); // graphic end_rec
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const winWidth = window.innerWidth;
  

  if (winWidth < 400) {
    let newHeader = 'Информация по событиям';
      setLineHeader(newHeader);
  }
  // console.log('user',user);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            
            <Grid item xs={12} md={8} lg={6}>
            
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
                <h4 style={{ textAlign:'center', position:'relative', marginTop:'-15px', left: '0'}}>
        {lineHeader}</h4>
                <LineChartWithXAxisPading />
              </Paper>
            </Grid>
            {/* Количество ОГХ */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits /> 
              </Paper>
            </Grid>
            {/* Последние новости */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <NewObj />  
              </Paper>
            </Grid>
            {/* История последних изменений по объектам */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <HistoryObjLast />
              </Paper>
            </Grid> */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TableList />
              </Paper>
            </Grid>
          </Grid>
          <BottomNavigation style={{display:'none'}} value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Новости" value="favorites" icon={<EventNoteIcon />} />
            <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
            <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
          </BottomNavigation>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = createStructuredSelector ({
  isFetchingUserOnline: selectIsFetchingUserOnline,
});

const mapDispatchToProps = (dispatch) => ({
    fetchEventsPointShort: () => dispatch(fetchEventsPointShortAsync()),

    fetchDataUsersOnline: (startDate, endDate) => dispatch(fetchAmountUsersForGraphicsAsync(startDate, endDate)),// for graphics
    fetchAmountNewEventsForGraphic: (startDate, endDate) => dispatch(fetchAmountNewEventsForGraphicAsync(startDate, endDate)),// for graphics
    fetchAmountEndEventsForGraphic: (startDate, endDate) => dispatch(fetchAmountEndEventsForGraphicAsync(startDate, endDate)),// for graphics

    fetchAmountOGH: () => dispatch(fetchAmountOGHForDashboardAsync()),

    fetchAmountOGHToDay: () => dispatch(fetchAmountOGHToDayAsync()),
    fetchAmountOGHToWeek: () => dispatch(fetchAmountOGHToWeekAsync()),
    fetchAmountOGHToThreeDays: () => dispatch(fetchAmountOGHToThreeDaysAsync()),
});
 
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
