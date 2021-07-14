import React from 'react';

import Typography from '@material-ui/core/Typography';
// import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

import Title from './Title';
import lastDate from './gen.services';
import useStyles from './gen.styles'

const GenDeposits = React.memo(({data }) => {
    const classes = useStyles();
    const {total_objects, total_mggt_objects, total_users} = data;

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