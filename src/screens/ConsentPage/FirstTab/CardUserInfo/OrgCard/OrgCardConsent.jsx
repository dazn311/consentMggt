import React, {useEffect} from 'react';

import {Observer, observer} from 'mobx-react'

// import stateObjs from '../../../../store/consent/objsConsent/objsCons.mobx';
import stateObjsMobx from '../../../../../store/consent/objsConsent/objsCons.mobx';

// import List from '@material-ui/core/List';
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
// import {CircularProgress} from "@material-ui/core";

import {useStyles} from "../cardUserComponents/ElemObj";

// const loaderForList = (title) => {
//     return (<div style={{display: 'flex', alignSelf: 'center', paddingRight: 8}}>
//         <div>{title}</div>
//         <CircularProgress/>
//     </div>)
// }

////////////////////////////////////
// @observer
const OrgCardConsent = observer(() => {
    const classes = useStyles();
    // console.log('OrgCardConsent');
    // console.log('OrgCardConsent - startFetchOrg', stateObjsMobx.startFetchOrg);

    useEffect(() => {
        stateObjsMobx.fetchOrgData(531);
    }, [])

    // stateObjsMobx.fetchOrgData(531);
    if (!stateObjsMobx.orgData) {
        return (<div>нет данных об организации</div>)
    }
    if (stateObjsMobx.errorFetchOrg) {
        return (<div>Ошибка {stateObjsMobx.errorFetchOrgMessage}</div>)
    }

    if (stateObjsMobx.successFetchOrg) {
        console.log('successFetchOrg')
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
                            <span className={classes.purple}
                            > user_id: {stateObjsMobx.orgData !== {} && stateObjsMobx.orgData.user_id} /
                              orgID: {stateObjsMobx.orgData !== {} && stateObjsMobx.orgData.user_org_id}</span>
                    </div>
                </div>
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <UserIcon
                            // color={'rgba(229 160 30,0.9)'}
                        />
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
