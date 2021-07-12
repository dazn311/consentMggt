import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {createStructuredSelector} from 'reselect';

import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import LineChartWrap from './LineChart.wrap';
import Deposits from './Deposits';
import NewOGH from './NewOGH';
import TableListHistories from './TableListHistories';
import ChipsArray from './Chips';

import './dashboard.styles.scss';

import {selectIsFetchingUserOnline, selectErrorFetch} from '../../store/adminPanelTrest/adminPanelTrest.selectors';
import {fetchEventsPointShortAsync, setMessageError, fetchAmountOGHToDayAsync} from '../../store/adminPanelTrest/adminPanelTrest.actions';

import {selectGenStats} from '../../store/adminPanelTrest/StatisticPage.selectors';
import useStyles from "./Dashboard.useStyles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let lineHeader = 'Текущая информация по событиям и пользователям';
// let maxWidthGridOGH = '295px';

const Dashboard = ({selectErrorFetch, genStatsAll, fetchEventsPointShort, fetchAmountOGHToDay}) => {
    const classes = useStyles();

    useEffect(() => {
        //start all fetch
        fetchEventsPointShort({limit: 1200, offset: 0});
        fetchAmountOGHToDay()
        // fetchGenStats();
    }, [fetchEventsPointShort])

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const winWidth = window.innerWidth;
    // let minWidthOGH = 320;
    // let nowrap = 'nowrap';

    if (winWidth < 550) {
        lineHeader = 'Информация по событиям';
        // maxWidthGridOGH = 'unset' //по событиям';
        // nowrap = 'wrap';
    } else if (winWidth === 1024) {
        // minWidthOGH = 252;
    } else if (winWidth === 768) {
        // minWidthOGH = 252;
    } else if (winWidth === 1280) {
        // minWidthOGH = 252;
    }

    // if (winWidth === 320) {
    //     // minWidthOGH = 230;
    // }

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
            <CssBaseline/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth={false} className={classes.container}>

                    <Grid item xs={12} md={5} lg={6} style={{maxWidth: 600, minWidth: 400}}>
                        <Paper elevation={1} className={fixedHeightPaper}>
                            <h4 style={{textAlign: 'center', position: 'relative', marginTop: '0px', left: '0'}}> {lineHeader}</h4>
                            <LineChartWrap/>
                        </Paper>
                    </Grid>



                    <Grid item xs={12} md={3} lg={3}>
                        <Paper elevation={1} className={fixedHeightPaper}>
                            <Deposits/> {/* Количество ОГХ */}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper elevation={1} className={fixedHeightPaper}>
                            <NewOGH/> {/* Новые ОГХ */}
                        </Paper>
                    </Grid>


                    <Grid item xs={12}>
                        <Paper className={classes.chip}>
                            {/* краткие данные */}
                            <ChipsArray data={genStatsAll}/>
                        </Paper>
                    </Grid>


                    <Grid item xs={12} >
                        <Paper className={classes.paper} elevation={1} >
                            {/* <TabLoader  /> */}
                            <TableListHistories/>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} style={{display: selectErrorFetch ? 'block' : 'none'}}>
                        <Paper className={classes.paper}>
                            <Snackbar open={selectErrorFetch} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error">
                                    {selectErrorFetch}
                                </Alert>
                            </Snackbar>
                        </Paper>
                    </Grid>

                </Container>
            </main>
        </div>
    );
}


const mapStateToProps = createStructuredSelector({
    genStatsAll: selectGenStats,
    isFetchingUserOnline: selectIsFetchingUserOnline,
    selectErrorFetch: selectErrorFetch,
});


const mapDispatchToProps = (dispatch) => ({
    fetchEventsPointShort: ({limit, offset}) => dispatch(fetchEventsPointShortAsync({limit, offset})),
    fetchAmountOGHToDay: () => dispatch(fetchAmountOGHToDayAsync()),
    setMessageError: () => dispatch(setMessageError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
