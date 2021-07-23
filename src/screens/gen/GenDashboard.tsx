import React, { useEffect} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import {createStructuredSelector} from 'reselect';

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import GenDeposits from './GenDeposits';
import GenAllPeriod from './GenAllPeriod';
import GenOneDayPeriod from './GenOneDayPeriod';

import {selectGenStats} from '../../store/genPageState/gen.selectors';
import { fetchGenStatsAsync } from '../../store/genPageState/gen.actions';

import {Slide} from "@material-ui/core";
import useGenStyles from "./GenDashboard.styles";

interface SelectState {
    readonly daily_messages: number;
    readonly daily_recs: number;
    readonly daily_sogl_recs: number;
    readonly total_messages: number;
    readonly total_mggt_objects: number;
    readonly total_objects: number;
    readonly total_recs: number;
    readonly total_rel_objects: number;
    readonly total_sogl_objects: number;
    readonly total_sogl_recs: number;
    readonly total_users: number;
}
interface State {
    readonly selectGenStats: SelectState;
}

interface DesiredSelection {
    genStats: string;
}

interface propsGen {
    fetchGenStats: any;
    genStats: SelectState;
}

const GenDashboard: React.FC = React.memo(({fetchGenStats, genStats}:propsGen) => {
    const classes = useGenStyles();

    useEffect(() => {
        if (genStats.total_objects === 0) {
            // console.log('GenDashboard - fetch start')
            fetchGenStats()
        }
    }, [fetchGenStats])

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth={false} className={classes.container}>
                    <Grid container spacing={2}>

                            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                                <Grid item xs={12} md={4} lg={4}>
                                    <Paper className={fixedHeightPaper}>
                                        <GenDeposits data={genStats}/> {/* Количество ОГХ */}
                                    </Paper>
                                </Grid>
                            </Slide>

                            <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                                <Grid item xs={12} md={4} lg={4}>
                                    <Paper className={fixedHeightPaper}>
                                        <GenAllPeriod data={genStats}/> {/* Количество ALl */}
                                    </Paper>
                                </Grid>
                            </Slide>

                            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                                <Grid item xs={12} md={4} lg={4}>
                                    <Paper className={fixedHeightPaper}>
                                        <GenOneDayPeriod data={genStats}/>
                                    </Paper>
                                </Grid>
                            </Slide>

                    </Grid>
                </Container>
            </main>
        </div>
    );
})  as any


const mapStateToProps = createStructuredSelector<State, DesiredSelection>({
    genStats: selectGenStats,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchGenStats: () => dispatch<any>(fetchGenStatsAsync()),
});


export default connect(mapStateToProps, mapDispatchToProps)(GenDashboard);
