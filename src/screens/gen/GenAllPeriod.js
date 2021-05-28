import React from 'react';
  
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Title from './Title';


const useStyles = makeStyles({
    depositContext: {
        flex: 1,
        fontSize: 11,
        padding: '8px 0'
    },
});



const GenAllPeriod = React.memo(({ data}) => {
    const classes = useStyles();
    let tt = new Date().toISOString();
    let lastDate = tt.split('T')[0].split('-');

    const {total_recs,total_messages, total_sogl_objects, total_sogl_recs} = data;


    return (
        <React.Fragment>
            <Title>Данные за весь период</Title>
            <hr color="white" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}} />
            <Typography component="p" variant="h6">
                {total_recs}
            </Typography>
            <Typography component="p"  >
                Всего событий
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="p" variant="h6">
                {total_messages}
            </Typography>
            <Typography component="p"  >
                Всего сообщений
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
            <Typography component="p" variant="h6">
                {total_sogl_objects}
            </Typography>
            <Typography component="p"  >
                Всего согласовано объектов
            </Typography>
            <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: '4px'}}/>
            <Typography component="p" variant="h6">
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

