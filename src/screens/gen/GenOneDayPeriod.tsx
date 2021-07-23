import React  from 'react';

import Typography from '@material-ui/core/Typography';

import lastDate from './gen.services';

import Title from './Title';
import useStyles from './gen.styles'

interface dataEntreInterface {
    total_objects: string;// for Gen Page //220721
    total_mggt_objects: string;// for Gen Page //220721
    total_users: string;// for Gen Page //220721
}

type dataEntre = dataEntreInterface | any
const GenOneDayPeriod = React.memo(( data: dataEntre ) => {
    const classes = useStyles();

    const {daily_recs,daily_messages, daily_sogl_recs} = data.data;

    return (
        <React.Fragment>
            <Title>Данные за сутки</Title>
            <hr color="white" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}} />
            <Typography component="span"  variant="h6">
                {daily_recs}
            </Typography>
            <Typography component="span"  >
                Всего новых событий
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="span" variant="h6">
                {daily_messages}
            </Typography>
            <Typography component="span"  >
                Всего сообщений
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="span" variant="h6">
                {daily_sogl_recs}
            </Typography>
            <Typography component="span"  >
                Всего согласованых событий
            </Typography>

            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: '4px'}}/>
            <Typography color="textSecondary" className={classes.depositContext}>
                Данные на {lastDate[2]}/{lastDate[1]}/{lastDate[0]}
            </Typography>

        </React.Fragment>
    );
})

export default GenOneDayPeriod;