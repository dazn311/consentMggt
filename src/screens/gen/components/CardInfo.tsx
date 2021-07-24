import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {Slide} from "@material-ui/core";
import Title from "./Title";
import Typography from "@material-ui/core/Typography";
import lastDate from "../serves/gen.services";

import useStyles from '../gen.styles'
import {SelectStateTransform, SelectStateTransformData} from "../../../store/genPageState/gen.types";


// type dataEntre = SelectStateTransform
type directType = "up" | "left" | "right" | "down" | undefined

interface Props  {
    dataIn: SelectStateTransform;
    // dataIn: SelectStateTransform;
    directionType: directType;
};
// let renderCounter = 0

const CardInfo: React.FC<Props> = React.memo(({dataIn, directionType}:Props) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const {title, data} = dataIn;
    // console.log(`🔥 rerender GenOneDayPeriod ${renderCounter++}`)

    return (
        <Slide direction={directionType} in={true} mountOnEnter unmountOnExit>
            <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper}>
                    <Title>{title}</Title>
                    <hr color="white" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}} />

                    {data.map((d:SelectStateTransformData) =>
                        <>
                        <Typography component="span"  variant="h6">
                            {d.caption}
                        </Typography>
                        <Typography component="span"  >
                            {d.desc}
                        </Typography>
                        <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
                        </>
                    )}

                    <Typography color="textSecondary" className={classes.depositContext}>
                        Данные на {lastDate[2]}/{lastDate[1]}/{lastDate[0]}
                    </Typography>
                </Paper>
            </Grid>
        </Slide>
    );
}) as any


export default CardInfo
