import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import moment from 'moment/moment';

// import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import Title from './Title';

import {selectAmountOGH} from '../../store/adminPanelTrest/adminPanelTrest.selectors';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
    hrStile: {width: '100%', opacity: 0.5, marginTop: 0, marginBottom: 0},
    typographyStyle: {display: 'flex', justifyContent: 'space-between'},
});


const Deposits = ({amountOGH}) => {
    const classes = useStyles();
    return (
        <div style={{padding: 14}} >
            <Title>Количество ОГХ</Title>
            <hr className={classes.hrStile} color="cadetblue"  />
            <Typography component="p" variant="h5" className={classes.typographyStyle} >
                {amountOGH.data.objTotal}
            </Typography>
            <Typography component="p">
                Всего
            </Typography>
            <hr color="gray" className={classes.hrStile} />

            <Typography component="p" variant="h5" className={classes.typographyStyle} >
                {amountOGH.data.objMggt}
            </Typography>
            <Typography component="p">
                принадлежащих нам
            </Typography>
            <hr color="gray" className={classes.hrStile} />
            <Typography component="p" variant="h5" className={classes.typographyStyle} >
                {amountOGH.data.objRelatives}
            </Typography>
            <Typography component="p">
                объектов смежников
            </Typography>
        </div>
    );
}


const mapStateToProps = createStructuredSelector({
    amountOGH: selectAmountOGH,
});

export default connect(mapStateToProps)(Deposits);