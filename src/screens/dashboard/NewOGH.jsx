import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectAmountToDayOGH, selectAmountToWeekOGH, selectAmountToTreeDaysOGH} from '../../store/adminPanelTrest/adminPanelTrest.selectors';

import Title from './Title';

import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    depositContext: {flex: 1,},
    hrStile: {width: '100%', opacity: 0.5, marginTop: 0, marginBottom: 0},
    typographyStyle: {display: 'flex', justifyContent: 'space-between'},
});

const NewOGH = ({amountToDayOGH, amountToTreeDaysOGH, amountToWeekOGH}) => {
    const classes = useStyles();
    return (
        <div style={{padding: 14}}>
            <Title>Новые ОГХ</Title>
            <hr className={classes.hrStile} color="cadetblue"/>
            <Typography component="p" variant="h5" className={classes.typographyStyle}>
                {amountToDayOGH.data.objMgtt}
            </Typography>
            <Typography component="p">
                объектов за день
            </Typography>

            <hr color="gray" className={classes.hrStile}/>
            <Typography component="p" variant="h5" className={classes.typographyStyle}>
                {amountToTreeDaysOGH.data.objMgtt}
            </Typography>
            <Typography component="p">
                объектов за 3 дня
            </Typography>

            <hr color="gray" className={classes.hrStile}/>
            <Typography component="p" variant="h5" className={classes.typographyStyle}>
                {amountToWeekOGH.data.objMgtt}
            </Typography>
            <Typography component="p">
                объектов за 7 дней
            </Typography>

        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    amountToDayOGH: selectAmountToDayOGH,
    amountToWeekOGH: selectAmountToWeekOGH,
    amountToTreeDaysOGH: selectAmountToTreeDaysOGH,
});


export default connect(mapStateToProps)(NewOGH);