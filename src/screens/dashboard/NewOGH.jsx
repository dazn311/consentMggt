import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'; 
import Typography from '@material-ui/core/Typography';

import Title from './Title';



import { selectAmountToDayOGH, selectAmountToWeekOGH, selectAmountToTreeDaysOGH } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 

const Deposits = ({amountToDayOGH, amountToTreeDaysOGH, amountToWeekOGH}) => { 
  return (
    <React.Fragment>
      <Title>Новые ОГХ</Title>
      <hr color="blue" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
      <Typography component="p" variant="h5" style={{display:'flex',justifyContent:'space-between'}}>
      {amountToDayOGH.data.objMgtt}
      {/* <span style={{  marginRight: '4px', textAlign:'end'}}>  объектов за день</span> */}
      </Typography>
      <Typography component="p"  > 
      объектов за день
      </Typography>
       
      <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: 0}}/>
      <Typography component="p" variant="h5" style={{display:'flex',justifyContent:'space-between'}}>
      {amountToTreeDaysOGH.data.objMgtt}
      {/* <span style={{ marginRight: '4px', textAlign:'end'}}>  объектов за 3 дня</span> */}
      </Typography>
      <Typography component="p"  > 
      объектов за 3 дня
      </Typography>
      
      <hr color="gray" style={{width: '100%',opacity: 0.5, marginTop: 0, marginBottom: '4px'}}/>
      <Typography component="p" variant="h5" style={{display:'flex',justifyContent:'space-between'}}>
        {amountToWeekOGH.data.objMgtt}
        {/* <span style={{ marginRight: '4px', textAlign:'end'}}>  объектов за 7 дней</span> */}
      </Typography>
      <Typography component="p"  > 
        объектов за 7 дней
      </Typography>
      
      <div>
         
      </div>
    </React.Fragment>
  );
}
 
const mapStateToProps = createStructuredSelector ({
  amountToDayOGH: selectAmountToDayOGH,
  amountToWeekOGH: selectAmountToWeekOGH, 
  amountToTreeDaysOGH: selectAmountToTreeDaysOGH, 
});


export default connect(mapStateToProps)(Deposits);