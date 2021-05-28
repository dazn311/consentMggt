import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment/moment';

// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import Title from './Title';

import { selectAmountOGH } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 
 
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

 

const Deposits = ({ amountOGH }) => {
  const classes = useStyles();
  let tt = moment(amountOGH.dataTime).toISOString(); 
  let lastDate = tt.split('T')[0].split('-'); 
  return (
    <React.Fragment> 
      <Title>Количество ОГХ <span style={{color:'red',fontSize:12,verticalAlign: 'middle'}}>(Всего: {amountOGH.data.objTotal})</span></Title>
      <hr color="blue" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
      <Typography component="p" variant="h5">
        {amountOGH.data.objMgtt}
      </Typography>
      <Typography component="p"  >
      принадлежащих нам
      </Typography>
      <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
      <Typography component="p" variant="h5">
      {amountOGH.data.objRelatives}
      </Typography>
      <Typography component="p"  >
      объектов смежников
      </Typography>
      <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: '4px'}}/>
      <Typography color="textSecondary" className={classes.depositContext}>
        Данные на {lastDate[2]}/{lastDate[1]}/{lastDate[0]}
         
      </Typography> 
    </React.Fragment>
  );
}
 

const mapStateToProps = createStructuredSelector ({
  amountOGH: selectAmountOGH, 
});
  
export default connect(mapStateToProps)(Deposits);