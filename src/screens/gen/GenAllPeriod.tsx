import React from 'react';

import Typography from '@material-ui/core/Typography';

import lastDate from './gen.services';
import Title from './Title';

import useStyles from './gen.styles'

interface dataEntreInterface {
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

type dataEntre = dataEntreInterface | any

const GenAllPeriod = React.memo((data: dataEntre) => {
    const classes = useStyles();

    const {total_recs,total_messages, total_sogl_objects, total_sogl_recs} = data.data;
    // console.log('data',data)
    return (
        <React.Fragment>
            <Title>За весь период</Title>
            <hr color="white" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}} />
            <Typography component="span" variant="h6">
                {total_recs}
            </Typography>
            <Typography component="p"  >
                Всего событий
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="span" variant="h6">
                {total_messages}
            </Typography>
            <Typography component="p"  >
                Всего сообщений
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="span" variant="h6">
                {total_sogl_objects}
            </Typography>
            <Typography component="p"  >
                Всего согласовано объектов
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: '4px'}}/>
            <Typography component="span" variant="h6">
                {/* {73+43} */}
                {total_sogl_recs}
            </Typography>
            <Typography component="p"  >
                Всего согласованых событий
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: '4px'}}/>
            <Typography color="textSecondary" className={classes.depositContext}>
                Данные на {lastDate[2]}/{lastDate[1]}/{lastDate[0]}
            </Typography>

        </React.Fragment>
    );
})

export default GenAllPeriod;

