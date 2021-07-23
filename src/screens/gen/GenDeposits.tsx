import React from 'react';

import Typography from '@material-ui/core/Typography';

import Title from './Title';
import lastDate from './gen.services';
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

const GenDeposits = React.memo((data: dataEntre ) => {
    const classes = useStyles();

    const {total_objects, total_mggt_objects, total_users} = data.data;

    return (
        <React.Fragment>

            <Title>Данные ОГХ ({total_objects})</Title>

            <hr color="white" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}} />
            <Typography component="span" variant="h6">
                {total_mggt_objects}
            </Typography>

            <Typography component="span"  >
                Всего принадлежащих нам
            </Typography >

            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="span"  variant="h6">
                {total_objects - total_mggt_objects}
            </Typography>

            <Typography component="span"  >
                Всего объектов смежников
            </Typography>

            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="span" variant="h6">
                {total_users}
            </Typography>

            <Typography component="span"  >
                Кол-во пользователей
            </Typography>

            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: '4px'}}/>
            <Typography  component="span" color="textSecondary" className={classes.depositContext}>
                Данные на {lastDate[2]}/{lastDate[1]}/{lastDate[0]}
            </Typography>

        </React.Fragment>
    );
})

export default GenDeposits