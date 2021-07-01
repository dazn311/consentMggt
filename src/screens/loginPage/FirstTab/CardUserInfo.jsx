import React, {useCallback, useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WatchLater from '@material-ui/icons/WatchLater';
import Divider from '@material-ui/core/Divider';
import ApartmentIcon from '@material-ui/icons/Apartment';
import UserIcon from '@material-ui/icons/SupervisedUserCircle';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import DonutLarge from '@material-ui/icons/DonutLarge';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

import {updateObjsDataOfAuthUserSelector} from '../../../store/consent/cons.selectors';
import {
    fetchLocalDataOfObjsForAuthUserAsync
} from '../../../store/consent/cons.actions';

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        border: '1px solid #8080802e',
        margin: window.innerWidth < 500 ? 0 : theme.spacing(1),
        padding: window.innerWidth < 500 ? 0 : theme.spacing(1),
    },
    span: {
        color: '#1976d2'
    },
    red: {
        color: 'red',

    },
    burlywood: {backgroundColor: "burlywood"},
    purple: {
        color: theme.palette.purple //'#a4a5d8'
    }
}));

const listArr = (updateObjsData,activeObjInx, setActiveObj) => {
    let orgObjects = updateObjsData
        ? updateObjsData.map((obj, index) => (
            <div  style={{display: 'flex' }} >
                <div style={{width: 4, backgroundColor: obj.objStatus === 0 ? 'darkgrey': 'burlywood'}} ></div>
                <div
                    key={index}
                    style={{color: index === activeObjInx ? '#9cd18f' : 'burlywood', paddingLeft: 4, borderBottom: '1px solid grey'}}
                    onClick={() => {setActiveObj(index)}}

                >{obj.objName}( {obj.objType})</div></div>))
        : 'загрузка объектов...';

    return  orgObjects
}


const CardUserInfo = ({userOfAuthData, setActiveObjOfAuthUser,  updateObjsDataOfAuthUser, fetchLocalDataOfObjsForAuthUser, relatives}) => {
    const [objectsOfCurOrj, setObjsOfCurOrj] = useState(null);
    const [activeObjInx, setActiveObjInx] = useState(0);
    const [relObjList, setRelObjList] = useState([]);
    const classes = useStyles();

    // console.log('updateObjsDataOfAuthUser',updateObjsDataOfAuthUser.objRelatives)
    useEffect(() => {
        let relObj  = updateObjsDataOfAuthUser
            ? updateObjsDataOfAuthUser[activeObjInx].objRelatives.map((obj, index) => (
                <div  style={{display: 'flex' }} >
                    <div style={{width: 4, backgroundColor:  'darkgrey' }} ></div>
                    <div
                        key={index}
                        style={{color:   'burlywood', paddingLeft: 4, borderBottom: '1px solid grey'}}
                    >{obj} </div>
                </div>))
            : 'загрузка объектов...';

        setRelObjList(relObj );

        if (updateObjsDataOfAuthUser){
            setObjsOfCurOrj(listArr(updateObjsDataOfAuthUser,activeObjInx,setActiveObj));
        }


    },[updateObjsDataOfAuthUser,activeObjInx])

    // useEffect(() => {
    //
    //
    // },[ ])

    if (!userOfAuthData) {
        return (<div>нет данных об организации</div>)
    }

    const setActiveObj = (index) => {
        setActiveObjInx(index);
        setActiveObjOfAuthUser(index);
        fetchLocalDataOfObjsForAuthUser(updateObjsDataOfAuthUser[index].objID)
        // console.log('setActiveObj - updateObjsDataOfAuthUser objID',updateObjsDataOfAuthUser[index].objID)
    }


    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ApartmentIcon color='secondary' style={{backgroundColor: '#904a4a'}}/>
                    </Avatar>
                </ListItemAvatar>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <ListItemText primary={userOfAuthData && userOfAuthData.org_name}
                        // secondary={currObj && currObj.organization.orgname  }
                    />
                    <div><span
                        className={classes.purple}> user_id: {userOfAuthData && userOfAuthData.user_id} / orgID: {userOfAuthData && userOfAuthData.user_org_id}</span>
                    </div>
                </div>
            </ListItem>
            {/*<Divider variant="inset" component="hr"  className={classes.span} />*/}
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <UserIcon color='primary'
                            style={{backgroundColor: '#988a4a'}}/>
                    </Avatar>
                </ListItemAvatar>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <ListItemText primary={userOfAuthData && userOfAuthData.user_name}
                        // secondary={currObj && currObj.organization.orgname  }
                    />
                </div>
            </ListItem>
            <Divider variant="inset" component="hr" className={classes.span}/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <WatchLater/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Дата регистрации"
                              secondary={new Intl.DateTimeFormat('ru-Ru').format(new Date(userOfAuthData.user_reg_date))}/>
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <StarHalfIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Статус" secondary={userOfAuthData.user_status}/>
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <DonutLarge/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Роль" secondary={userOfAuthData.user_role}/>
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <HomeWorkIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText style={{maxHeight: 280, overflow: 'auto'}} primary="Объекты" secondary={objectsOfCurOrj}/>


            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <HomeWorkIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Смежники" secondary={relObjList}/>

            </ListItem>
        </List>
    );
}

const mapStateToProps = createStructuredSelector ({
    updateObjsDataOfAuthUser: updateObjsDataOfAuthUserSelector, // события короткие данные для таблицы
});


const mapDispatchToProps = (dispatch) => ({
    fetchLocalDataOfObjsForAuthUser: (objId) => dispatch(fetchLocalDataOfObjsForAuthUserAsync(objId)),
});
//fetchLocalDataOfObjsForAuthUserAsync
// export default CardUserInfo;
export default connect(mapStateToProps, mapDispatchToProps)(CardUserInfo);
