import React, { useEffect} from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
// import FlagIcon from '@material-ui/icons/Flag';
// import ApartmentIcon from '@material-ui/icons/Apartment';
// import CommentIcon from '@material-ui/icons/Comment';
import { selectObjCurrObj } from '../../../store/adminPanelTrest/objspages.selectors';  
// import EventReviewCard from './EventReviewCard';



const useStyles = makeStyles((theme) => ({
  root: {
    // width: '95%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 500,
    overflow: 'auto',
    border: '1px solid #8080802e',
    margin: '4px 8px',
  },
  span: {
    color:'#1976d2'
  },
  red: {
    color:'red'
  }
}));

const CardEventInfo = ({orgRow, currObj, objRect, selectObjCurr}) => {
  const classes = useStyles();

  console.log('orgRow',orgRow);
  console.log('selectObjCurr',selectObjCurr);
  console.log('objRect',objRect);

  useEffect(() => {

  },[currObj])
 
  // const objCurr = selectObjCurr !== {} ? selectObjCurr.filter(ob => ob.objID === orgRow) : 
  console.log('currObj',currObj);

  const formatDate = (data) => {
    // console.log('999 data',data);
    return new Intl.DateTimeFormat('ru-Ru').format(new Date(data))
  }
 
  return (
    <List className={classes.root}>
      {objRect && objRect.map(obj => {
        return (
          <><ListItem>
            {/* <ListItemAvatar>
              <Avatar>
                <CommentIcon />
              </Avatar>
            </ListItemAvatar> */} 
            {/* <EventReviewCard  obj={obj} /> */}
            {/* <ListItemText primary={obj.rec_name} secondary={new Intl.DateTimeFormat('ru-Ru').format(new Date(obj.rec_date)) + ' (статус: ' + obj.rec_status === 5 ? 'согласованно': '(в работе' + ')' + ' (Операторы: ' + obj.operators.username + ')' } /> */}

            <div style={{display:'flex', flexDirection:'column', borderBottom:'1px solid #ff000021'}}>
              <ListItemText primary={obj.rec_name}
                // secondary={formatDate(obj.rec_date) }
              />
              <div><span className={classes.red} >{formatDate(obj.rec_date) }</span> </div>
              <div>статус: <span className={classes.span} >{obj.rec_status === 5 ? ' согласованно': ' в работе'}</span>  </div>
              <div>Операторы: <span className={classes.span} >{obj.operators.username}</span></div>
            </div>
        {/* <ListItemText primary={obj.rec_name} secondary={obj.rec_date + ' (статус: ' + obj.rec_status + ')' + ' (Операторы: ' + obj.operators.username + ')' } /> */}
          </ListItem>
          {/*<Divider variant="inset" component="li" />*/}
          </>
        )
      })}
       
      
      
    </List>
  );
}
 
const mapStateToProps = createStructuredSelector ({
  selectObjCurr: selectObjCurrObj, // события короткие данные для таблицы
});

export default connect(mapStateToProps)(CardEventInfo); 
