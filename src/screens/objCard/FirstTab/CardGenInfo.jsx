import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WatchLater from '@material-ui/icons/WatchLater';
import Divider from '@material-ui/core/Divider';
import ApartmentIcon from '@material-ui/icons/Apartment';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import DonutLarge from '@material-ui/icons/DonutLarge';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

import {  objCurrentSelector, objRelativesSelector } from '../../../store/adminPanelTrest/objspages.selectors';

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
  },
    p: {margin: '0 4px', borderBottom:'1px solid grey'},
    divOrg: {display:'flex', flexDirection:'column', borderBottom:'1px solid #ff000021'}
}));

const p = (objIdSme, classes) => {
    return (
        <React.Fragment>
            {objIdSme}
            <span className={classes.purple} >(нет событий)</span>
        </React.Fragment>
    )
}

//selectedObj - curr obj
const CartGenInfo = ({ objRect, objCurrentSel, objRelativesSel, currObj}) => {
  const classes = useStyles();

  // if (!currObj) { return(<div>нет данных об организации</div>) }
  if (!objCurrentSel || !objRelativesSel.length) { return(<div>нет данных об организации.</div>) }
// debugger
  let SmeObjList = objRelativesSel && objRelativesSel.map((objIdSme, index)  => {
      const newRec = objRect && objRect.find(rec  =>  objIdSme === rec.receip.objectID  )
      return <p key={index} className={classes.p} >{ newRec  ? newRec.receip.objname :  p(objIdSme, classes) }</p>
    })

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ApartmentIcon  style={{color: '#733b3b'}} />
          </Avatar>
        </ListItemAvatar>
        <div className={classes.divOrg} >
          <ListItemText primary={ objCurrentSel.objName } secondary={ objCurrentSel.organization.orgname  } />
          <div><span className={classes.purple} > objID: { objCurrentSel.objID } / orgID: { objCurrentSel.organization.orgID }</span> </div>
        </div>
      </ListItem>
      <Divider variant="inset" component="hr"  className={classes.span} />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WatchLater />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Дата создания" secondary={new Intl.DateTimeFormat('ru-Ru').format(new Date(objCurrentSel.objCreationDate)) } />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <StarHalfIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Статус" secondary={objCurrentSel.objStatus === 1 ? 'в разработке (наш)': 'смежный'} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DonutLarge />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Тип" secondary={objCurrentSel.objType} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HomeWorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Смежники" secondary={SmeObjList} />
         
      </ListItem>
    </List>
  );
}
 
const mapStateToProps = createStructuredSelector ({
  // selectedObj: selectedObj, // события короткие данные для таблицы
    objCurrentSel: objCurrentSelector, // события короткие данные для таблицы
    objRelativesSel: objRelativesSelector, // события короткие данные для таблицы
});

export default connect(mapStateToProps)(CartGenInfo); 
