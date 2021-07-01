import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
  
import GenDeposits from './GenDeposits';  
import GenAllPeriod from './GenAllPeriod';  
import GenOneDayPeriod from './GenOneDayPeriod';  

import { selectGenStats } from '../../store/adminPanelTrest/StatisticPage.selectors';
import {  fetchGenStatsAsync  } from '../../store/adminPanelTrest/adminPanelTrest.actions';
 
import './dashboard.styles.scss';
import {Slide} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: 0
  },   
  appBarSpacer: theme.mixins.toolbar,
  content: {
    // flexGrow: 1,
    // height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
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

 
const GenDashboard = React.memo(({fetchGenStats, genStatsAll}) => {
  const classes = useStyles();

  useEffect(() => {
    if(!genStatsAll.total_objects){
      console.log('GenDashboard - fetch start')
      fetchGenStats()
    }
  }, [ genStatsAll.total_objects, fetchGenStats ])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline /> 
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false}  className={classes.container}>
          <Grid container spacing={1}>

            <Grid item xs={12} md={12} lg={12} >
            </Grid>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Grid item xs={12} md={4} lg={4} >
              <Paper className={fixedHeightPaper}>
                <GenDeposits data={genStatsAll} /> {/* Количество ОГХ */}
              </Paper>
            </Grid>
            </Slide>
            <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <Grid item xs={12} md={4} lg={4}   >
              <Paper className={fixedHeightPaper}>
              <GenAllPeriod data={genStatsAll} /> {/* Количество ALl */}
              </Paper>
            </Grid>
            </Slide>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Grid item xs={12} md={4} lg={4}  >
              <Paper className={fixedHeightPaper}>
              <GenOneDayPeriod data={genStatsAll} />
              </Paper>
            </Grid>
            </Slide>
          </Grid>
        </Container>
      </main>
    </div>
  );
})

const mapStateToProps = createStructuredSelector ({ 
  genStatsAll: selectGenStats,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGenStats: () => dispatch(fetchGenStatsAsync()), 
});


export default connect(mapStateToProps,mapDispatchToProps)(GenDashboard);
