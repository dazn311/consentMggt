import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment/moment';

// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import { Slide } from "@material-ui/core";


import Title from './Title';

import { selectAmountOGH } from '../../store/adminPanelTrest/adminPanelTrest.selectors';
// import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
        fontSize: 11,
        padding: '8px 0'
    },
});

 
const GenDeposits = React.memo(({amountOGH, data }) => {
    const classes = useStyles();

    const {total_objects, total_mggt_objects, total_users} = data;


    let tt = moment(amountOGH.dataTime).toISOString();
    let lastDate = tt.split('T')[0].split('-');


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


const mapStateToProps = createStructuredSelector ({
    amountOGH: selectAmountOGH, 
});
 

export default connect(mapStateToProps)(GenDeposits);