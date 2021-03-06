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
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: '70vh',
    overflow: 'auto',
    border: '1px solid #8080802e',
    padding: 4,
    margin: window.innerWidth < 500 ? '0px' : '4px 8px',
    marginTop: window.innerWidth < 500 ? '8px' : ' 4px',
  },
  span: {
    color: theme.palette.primary.main
  },
  red: {
    color: theme.palette.redLight
  },
  purple: {
    color: theme.palette.purple
  }
}));

const CardEventInfo = ({orgRow, currObj, objRect, selectObjCurr}) => {
  const classes = useStyles();

  // console.log('orgRow',orgRow);
  // console.log('selectObjCurr',selectObjCurr);
  // console.log('objRect',objRect);

  useEffect(() => {

  },[currObj])


  const formatDate = (data) => {
    // console.log('999 data',data);
    return new Intl.DateTimeFormat('ru-Ru').format(new Date(data))
  }
 
  return (
    <List className={classes.root}>
      <ListItem>
        <div style={{display:'flex', flexDirection:'column', borderBottom:'1px solid rgb(234 128 128 / 60%)', paddingBottom: 2}}>
          <ListItemText primary={'?????????????? (??????????????)'} />
        </div>
      </ListItem>
      {objRect && objRect.map(obj => {
        return (
          <React.Fragment>
            <ListItem>
              <div style={{display:'flex', flexDirection:'column', borderBottom:'1px solid rgb(105 98 98)', paddingBottom: 2}}>
                <ListItemText primary={obj.rec_name}
                  // secondary={formatDate(obj.rec_date) }
                />
                <div><span className={classes.purple} >{formatDate(obj.rec_date) }</span> </div>
                <div>????????????: <span className={classes.span} >{obj.rec_status === 5 ? ' ????????????????????????': ' ?? ????????????'}</span>  </div>
                <div>??????????????????: <span className={classes.purple} >{obj.operators.username}</span></div>
              </div>
            </ListItem>
          </React.Fragment>
        )
      })}

    </List>
  );
}
 
const mapStateToProps = createStructuredSelector ({
  selectObjCurr: selectObjCurrObj, // ?????????????? ???????????????? ???????????? ?????? ??????????????
});

export default connect(mapStateToProps)(CardEventInfo); 
