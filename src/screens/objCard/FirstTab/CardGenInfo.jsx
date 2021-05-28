import React, {useCallback, useEffect} from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
import WatchLater from '@material-ui/icons/WatchLater';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
// import FlagIcon from '@material-ui/icons/Flag';
import ApartmentIcon from '@material-ui/icons/Apartment';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import DonutLarge from '@material-ui/icons/DonutLarge';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

import { selectObjCurrObj } from '../../../store/adminPanelTrest/objspages.selectors';
import {useHistory, useLocation} from "react-router-dom";
// import BackdropForAllPage from '../../../components/blackDrop/black-drop.component';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    border: '1px solid #8080802e',
    margin: window.innerWidth < 500 ? 0 : theme.spacing(1),
    padding:  window.innerWidth < 500 ? 0 : theme.spacing(1),
  },
  span: {
      color:'#1976d2'
    },
  red: {
    color:'red',

  },
  burlywood:  {backgroundColor: "burlywood"},
  purple: {
    color: theme.palette.purple //'#a4a5d8'
  }
}));

const CartGenInfo = ({orgRow, currObj, selectObjCurr, objRect}) => {
  const classes = useStyles();
  const history = useHistory();
  let smegObjList = null;

  smegObjList = useCallback( selectObjCurr.objRelatives && selectObjCurr.objRelatives.map((objIdSmeg, index)  => {

    const newRec = objRect && objRect.find(rec  => {
      if (objIdSmeg === rec.receip.objectID){
        return true
      }else {
        return  false //objIdSmeg + ', '
      }
    })

    if(newRec){
      return <p key={index} style={{margin: '0 4px', borderBottom:'1px solid grey'}} >{newRec.receip.objname} </p>
    } else {
      return <p key={index} style={{margin: '0 4px', borderBottom:'1px solid grey'}} >{objIdSmeg} <span className={classes.purple} >(нет событий)</span> </p>
    }
  }),[selectObjCurr]);
  // useEffect(() => {
  //
  // },[currObj])
  // const objCurr = selectObjCurr !== {} ? selectObjCurr.filter(ob => ob.objID === orgRow) : 


  // const location = useLocation();
  // const currObj2 = location.pathname.split('/')[3] || '';
  // console.log('000 currObj2',currObj2);

  // console.log('000 selectObjCurr',selectObjCurr);
  // console.log('000 currObj',currObj);
  //
  // console.log('000 document.lastModified).toLocaleString()',new Date(document.lastModified).toLocaleString());

  if (!currObj) {
    // history.push('/stats/objs' );
    return(<div>нет данных об организации</div>)
    
  }
  if (!selectObjCurr) {
    // history.push('/stats/objs' );
    return(<div>нет данных об организации.</div>)
  }






 
  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ApartmentIcon color={'rgb(229 160 30)'} style={{backgroundColor: '#904a4a'}} />
          </Avatar>
        </ListItemAvatar>
        <div style={{display:'flex', flexDirection:'column', borderBottom:'1px solid #ff000021'}}>
          <ListItemText primary={selectObjCurr && selectObjCurr.objName } secondary={currObj && currObj.organization.orgname  } />
          <div><span className={classes.purple} > objID: {currObj && currObj.objID } / orgID: {currObj && currObj.organization.orgID }</span> </div>
        </div>
      </ListItem>
      <Divider variant="inset" component="hr"  className={classes.span} />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WatchLater />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Дата создания" secondary={new Intl.DateTimeFormat('ru-Ru').format(new Date(currObj.objCreationDate)) } />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <StarHalfIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Статус" secondary={currObj.objStatus === 1 ? 'в разработке (наш)': 'смежный'} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DonutLarge />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Тип" secondary={currObj.objType} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HomeWorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Смежники" secondary={smegObjList} /> 
         
      </ListItem>
    </List>
  );
}
 
const mapStateToProps = createStructuredSelector ({
  selectObjCurr: selectObjCurrObj, // события короткие данные для таблицы
});

export default connect(mapStateToProps)(CartGenInfo); 
