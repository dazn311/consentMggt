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


const CardUserInfo = ({userOfAuthData, setActiveObjOfAuthUser, objListName, updateObjsDataOfAuthUser}) => {
    const [smeObjects, setSmeObjects] = useState(null);
    const [activeObjInx, setActiveObjInx] = useState(0);
    const classes = useStyles();
    // console.log('objListName',objListName)

    useEffect(() => {
        let smeObjs = updateObjsDataOfAuthUser
            ? updateObjsDataOfAuthUser.map((obj, index) => (
                <div  style={{display: 'flex' }} >
                    <div style={{width: 4, backgroundColor: obj.objStatus === 0 ? 'darkgrey': 'burlywood'}} ></div>
                    <div
                        key={index}
                        style={{color: index === activeObjInx ? '#9cd18f' : 'burlywood', paddingLeft: 4}}
                        onClick={() => {setActiveObj(index)}}

                    >{obj.objName}</div></div>))
            : 'загрузка объектов...';

        setSmeObjects(smeObjs);

    },[updateObjsDataOfAuthUser,activeObjInx])

    if (!userOfAuthData) {
        return (<div>нет данных об организации</div>)
    }

    const setActiveObj = (index) => {

        // setActiveObjOfAuthUser(null);
        //setTimeout(() => {
        setActiveObjInx(index);
        setActiveObjOfAuthUser(index);
        // },500);

    }


    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ApartmentIcon color={'rgb(229 160 30)'} style={{backgroundColor: '#904a4a'}}/>
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
                        <UserIcon color={'rgb(229 160 30)'} style={{backgroundColor: '#988a4a'}}/>
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
                <ListItemText primary="Объекты" secondary={smeObjects}/>


            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <HomeWorkIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Смежники" secondary={'smegObjList'}/>

            </ListItem>
        </List>
    );
}

const mapStateToProps = createStructuredSelector ({
    updateObjsDataOfAuthUser: updateObjsDataOfAuthUserSelector, // события короткие данные для таблицы
});

// export default CardUserInfo;
export default connect(mapStateToProps)(CardUserInfo);
