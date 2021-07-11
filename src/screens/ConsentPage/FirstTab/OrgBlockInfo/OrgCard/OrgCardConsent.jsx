import React from 'react';

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

    if (stateObjsMobx.orgDataState.errorMessage) {
        return (<div>Ошибка: {stateObjsMobx.orgDataState.errorMessage}</div>)
    }

    if (stateObjsMobx.orgDataState.success) {
        // console.log('successFetchOrg',stateObjsMobx.successFetchOrg)
    }else {
        return (<div>нет данных об организации..</div>)
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
                    {/*<ListItemText primary={stateObjsMobx.orgData !== {} && stateObjsMobx.orgData.org_name}/>*/}
                    <ListItemText primary={ stateObjsMobx.orgDataState.data.org_name}/>
                    <div>
                            <span className={classes.purple}>
                                user_id: { stateObjsMobx.orgDataState.data.user_id } /
                              orgID: { stateObjsMobx.orgDataState.data.user_org_id }</span>
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
                    <ListItemText primary={stateObjsMobx.orgDataState.data.user_name}/>
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
                              secondary={new Intl.DateTimeFormat('ru-Ru').format(new Date(stateObjsMobx.orgDataState.data.user_reg_date))}/>
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <StarHalfIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Статус" secondary={stateObjsMobx.orgDataState.data.user_status}/>
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <DonutLarge/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Роль" secondary={stateObjsMobx.orgDataState.data.user_role}/>
            </ListItem>
        </React.Fragment>
    );
})

export default OrgCardConsent
