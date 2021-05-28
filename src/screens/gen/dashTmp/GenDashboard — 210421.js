import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
 
// import LineChartWrap from './LineChart.wrap'; 
import GenDeposits from './GenDeposits';  
import GenAllPeriod from './GenAllPeriod';  
import GenOneDayPeriod from './GenOneDayPeriod';  

import { selectGenStats } from '../../store/adminPanelTrest/StatisticPage.selectors';


/////////////// delete
import { selectIsFetchingUserOnline } from '../../store/adminPanelTrest/adminPanelTrest.selectors';
import {   fetchAmountOGHForDashboardAsync , fetchObjectsListAsync, fetchAmountUsersAsync, fetchGenStatsAsync  } from '../../store/adminPanelTrest/adminPanelTrest.actions';


// import { selectObjsPage, selectObjsInfoPage } from '../../store'; 
import { selectObjsPage } from '../../store/adminPanelTrest/StatisticPage.selectors'; 
// import { selectObjsPage, selectObjsInfoPage } from '../../store/adminPanelTrest/StatisticPage.selectors'; 
  
import './dashboard.styles.scss';

 
 
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
    // height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    // paddingLeft: theme.spacing(10),
    // minWidth: 1400,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    // marginLeft: -10 //нижняя таблица первой страницы
  },news: {
    '&:hover': {
      background: "#f00",
   },
  },
  fixedHeight: {
    // height: 240,
  },
}));

 
const GenDashboard = ({  fetchAmountUsers,  fetchAmountOGH,fetchObjectsList, genStatsAll}) => {
  const classes = useStyles();
  // const [value, setValue] = React.useState('recents');
 
  //smgt
  useEffect(() => {
    // for "Количество ОГХ"
    fetchAmountOGH();
    fetchAmountUsers();
    // fetchObjectsList('2', '0', '0', '0', "2021-01-01T00:08:56.306Z", "2021-09-11T20:08:56.306Z", '', '',  '', '2', 'orgName', "desc"  )

  }, [ fetchAmountUsers,fetchAmountOGH ])
 
 

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // const winWidth = window.innerWidth;
  
  console.log('2121 genStatsAll',genStatsAll);
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={3} lg={3} style={{minWidth: 292}} >
              <Paper className={fixedHeightPaper}>
                <GenDeposits /> {/* Количество ОГХ */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={3} style={{minWidth: 292}} >
              <Paper className={fixedHeightPaper}>
              <GenAllPeriod /> {/* Количество ALl */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={3} style={{minWidth: 292}} >
              <Paper className={fixedHeightPaper}>
              <GenOneDayPeriod />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = createStructuredSelector ({
  isFetchingUserOnline: selectIsFetchingUserOnline,
  selectObjs: selectObjsPage,
  genStatsAll: selectGenStats,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAmountOGH: () => dispatch(fetchAmountOGHForDashboardAsync()),
  fetchAmountUsers: () => dispatch(fetchAmountUsersAsync()),
  fetchObjectsList: (objectType, organization, limit, offset, startDate, endDate,objName, orgName,   objKind, objStatus, sortCol, sortType) => dispatch(fetchObjectsListAsync(objectType, organization, limit, offset, startDate, endDate, objName, orgName,   objKind, objStatus, sortCol, sortType)),
});


export default connect(mapStateToProps,mapDispatchToProps)(GenDashboard);
