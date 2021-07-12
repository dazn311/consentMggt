import React  from 'react'; 
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

let endDate = new Date();
endDate = endDate.toISOString();
let lastDate = endDate.split('T')[0].split('-');
 
const GenOneDayPeriod = React.memo(({ data }) => {
    const classes = useStyles();

    const {daily_recs,daily_messages, daily_sogl_recs} = data;

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