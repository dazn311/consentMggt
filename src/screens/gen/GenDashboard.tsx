import React, { useEffect} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import {createStructuredSelector} from 'reselect';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import {selectGenStats} from '../../store/genPageState/gen.selectors';
import { fetchGenStatsAsync } from '../../store/genPageState/gen.actions';

import useGenStyles from "./GenDashboard.styles";
import CardInfo from "./components/CardInfo";
import {SelectStateTransform} from "../../store/genPageState/gen.types";

// interface SelectState {
//     title: string,
//     data: object
// }

type dataEntre = SelectStateTransform[] | any

interface State {
    readonly selectGenStats: dataEntre;
}

interface DesiredSelection {
    genStats: string;
}

interface propsGen {
    fetchGenStats: any;
    genStats: dataEntre;
}


const GenDashboard: React.FC = React.memo(({fetchGenStats, genStats}:propsGen) => {
    const classes = useGenStyles();
    // console.log('genStats',genStats)
    useEffect(() => {
        if (genStats[0].data[0].desc === 0) {
            fetchGenStats()
                .then((d:any) => console.log('then',d) )
        }
    }, [fetchGenStats])

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth={false} className={classes.container}>
                    <Grid container spacing={2}>
                        {genStats && genStats.map((d:SelectStateTransform) =>  <CardInfo dataIn={d}  directionType='up' /> )}
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
