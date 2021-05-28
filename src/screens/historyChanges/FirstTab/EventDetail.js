import React from 'react';

import { connect } from 'react-redux';


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Slide from '@material-ui/core/Slide';
// import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
import Text from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';

import { useTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import { fetchUpdateUsersFromDB } from '../../../store/adminPanelTrest/adminPanelTrest.actions'; 
//fetchUpdateUsersFromDB

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  textField: {
    minWidth:300,
    borderLeft: '1px solid grey',
    marginLeft: 5,
    paddingLeft: 10,
  }
});

const EventDetail = ({ userData,fetchUpdateUsers }) => {
  const [open, setOpen] = React.useState(false);
  const [userDataS, setUserDataS] = React.useState(userData);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSave = () => {
    fetchUpdateUsers(userDataS);
    handleClose();
  };
  
  const changeValue = (event) => {
    event.preventDefault();
    console.log(event.target.placeholder);
    console.log(event.target.value);
    // console.log(userDataS[userKey]);
    setUserDataS({...userDataS,[event.target.placeholder]:event.target.value})
  };
   //const {user_fio, login, password, user_fio_lit, id} = req.body;
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Редактирование пользователя"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
              {userData.user_fio}
            </DialogContentText>

            <List>
              {Object.keys(userData)
              .filter(userKey => (userKey !== 'id' && userKey !== 'password'))
              .map((userKey) => (
                // <ListItem button onClick={() => handleListItemClick(user)} key={user}>
                <ListItem button  key={userKey}>
                  <PersonIcon titleAccess={userKey} />
                  <Text className={classes.textField} onChange={changeValue} placeholder={userKey} defaultValue={userDataS[userKey]}   ></Text>
                   
                </ListItem>
              ))} 
            </List>
 
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchUpdateUsers: (start,end) => dispatch(fetchUpdateUsersFromDB(start,end)),
}); 

export default connect(null,mapDispatchToProps)(EventDetail);  