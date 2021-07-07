import React, {useEffect} from 'react';

import {observer} from 'mobx-react'

import stateObjsMobx from '../../../../../store/consent/objsConsent/objsCons.mobx';

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

import {useStyles} from "../cardUserComponents/ElemObj";

////////////////////////////////////
// @observer
const OrgCardConsent = observer(() => {
    const classes = useStyles();

    useEffect(() => {
        stateObjsMobx.fetchOrgData(531);
    }, [])

    useEffect(() => {
        if (stateObjsMobx.successFetchOrg && !stateObjsMobx.successFetchObj) {
            stateObjsMobx.fetchObjData(stateObjsMobx.orgData.org_name)
        }
    }, [stateObjsMobx.successFetchOrg])

    if (!stateObjsMobx.orgData) {

        return (<div>нет данных об организации</div>)
    }
    if (stateObjsMobx.errorFetchOrg) {
        return (<div>Ошибка {stateObjsMobx.errorFetchOrgMessage}</div>)
    }

    if (stateObjsMobx.successFetchOrg) {
        console.log('successFetchOrg',stateObjsMobx.successFetchOrg)
    }


////////////////////////////////////

    // console.log('155 objsData', objsData)
////////////////////////////////////
    return (
        <React.Fragment>
            <ListItem style={{backgroundColor: 'rgb(144 74 74 / 37%)'}}>
                <ListItemAvatar>
                    <Avatar>
                        <ApartmentIcon color='secondary'/>
                    </Avatar>

                </ListItemAvatar>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <ListItemText primary={stateObjsMobx.orgData !== {} && stateObjsMobx.orgData.org_name}/>
                    <div>
                            <span className={classes.purple}>
                                user_id: {stateObjsMobx.orgData !== {} && stateObjsMobx.orgData.user_id} /
                              orgID: {stateObjsMobx.orgData !== {} && stateObjsMobx.orgData.user_org_id}</span>
                    </div>
                </div>
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <UserIcon  />
                    </Avatar>
                </ListItemAvatar>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <ListItemText primary={stateObjsMobx.orgData !== {} && stateObjsMobx.orgData.user_name}/>
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
                              secondary={new Intl.DateTimeFormat('ru-Ru').format(new Date(stateObjsMobx.orgData.user_reg_date))}/>
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <StarHalfIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Статус" secondary={stateObjsMobx.orgData.user_status}/>
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <DonutLarge/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Роль" secondary={stateObjsMobx.orgData.user_role}/>
            </ListItem>
        </React.Fragment>

    );
})

export default OrgCardConsent
