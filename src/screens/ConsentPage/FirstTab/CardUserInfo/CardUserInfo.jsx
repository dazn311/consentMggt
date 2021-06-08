import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

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
import {CircularProgress} from "@material-ui/core";

import {listObjs} from "./cardUserComponents/listObjs";
import {useStyles} from "./cardUserComponents/objStatus";
import ListItemRel from "./cardUserComponents/relatives";

import {
    curObjIdSelector,
    dataOfObjsForListSelector,
    fullDataOfActiveObForMapForRelativesSelector,
    objsDataSelector
} from '../../../../store/consent/cons.selectors';
import {
    fetchObjByIdToObjsDataAsync,
    setActiveObjOfAuthUserAsync,
    setCurObjIdForConsentPageAsync
} from '../../../../store/consent/cons.actions';
import {relObjsList} from "../../../../api/relObj-api";


const loaderForList = (title) => {
    return (<div style={{display: 'flex', alignSelf: 'center', paddingRight: 8}}>
        <div>{title}</div>
        <CircularProgress/>
    </div>)
}

////////////////////////////////////
const CardUserInfo = ({
                          userOfAuthData,
                          setCurObjIdForConsentPage,
                          dataOfObjsForList,
                          fetchObjByIdToObjsData,
                          curObjIdSel, setActiveRelId
                      }) => {
    const [objectsOfCurOrg, setObjsOfCurOrg] = useState(loaderForList(' Загрузка списка объектов..'));
    const classes = useStyles();


////////////////////////////////////
    const updateObjsList = (objID) => {
        if (dataOfObjsForList) {
            setObjsOfCurOrg(listObjs(dataOfObjsForList, objID, setIdOfActiveObj))
        }
    }
    ////////////////////////////////////
    useEffect(() => {
        if (dataOfObjsForList) {
            updateObjsList(dataOfObjsForList[0].objID)
        }
    }, [dataOfObjsForList, curObjIdSel])

    //040621
    useEffect(() => {
        if (dataOfObjsForList) {
            fetchObjByIdToObjsData(dataOfObjsForList[0].objID)
            setIdOfActiveObj(dataOfObjsForList[0].objID)
            //080621
            // console.log('7789 dataOfObjsForList.objRelatives[0]', dataOfObjsForList[0].objRelatives[0])
            setActiveRelId(dataOfObjsForList[0].objID)
        }
    }, [dataOfObjsForList, fetchObjByIdToObjsData])


    if (!userOfAuthData) {
        return (<div>нет данных об организации</div>)
    }
////////////////////////////////////

    const setIdOfActiveObj = (objId) => {
        fetchObjByIdToObjsData(objId)
        setCurObjIdForConsentPage(objId)
        //080621
        // console.log('2289 dataOfObjsForList.objRelatives[0]', objId)//[0].objRelatives[0])
        // console.log('2289 dataOfObjsForList.objRelatives[0]', dataOfObjsForList.slice(0,4))//[0].objRelatives[0])
        // let obj1 = dataOfObjsForList.filter(obj => obj.objID === objId)
        //
        //
        // if (obj1.length === 1) {
        //     let relID = obj1[0].objRelatives[0];
        //     console.log('9988 obj1[0]', relID)//[0].objRelatives[0]) .objRelatives
        //     setActiveRelId(relID)
        // }
        // setActiveRelId(0)
        relObjsList.fetchRelById(objId)
    }

    // console.log('155 objsData', objsData)
////////////////////////////////////
    return (
        <List className={classes.root}>
            <ListItem style={{backgroundColor: 'rgb(144 74 74 / 37%)'}}>
                <ListItemAvatar>
                    <Avatar>
                        <ApartmentIcon color={'rgb(229 160 30)'}/>
                    </Avatar>

                </ListItemAvatar>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <ListItemText primary={userOfAuthData && userOfAuthData.org_name}
                    />
                    <div><span
                        className={classes.purple}> user_id: {userOfAuthData && userOfAuthData.user_id} / orgID: {userOfAuthData && userOfAuthData.user_org_id}</span>
                    </div>
                </div>
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <UserIcon color={'rgb(229 160 30)'}/>
                    </Avatar>
                </ListItemAvatar>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <ListItemText primary={userOfAuthData && userOfAuthData.user_name}
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
                    <Avatar className={classes.MuiAvatarRoot}>
                        <HomeWorkIcon/>
                        <ListItemText style={{position: 'absolute', color: 'yellowgreen', bottom: -24}}
                                      secondary={dataOfObjsForList && dataOfObjsForList.length}/>
                    </Avatar>

                </ListItemAvatar>
                <ListItemText style={{maxHeight: 280, overflow: 'auto'}} primary="Объекты" secondary={objectsOfCurOrg}/>


            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItemRel/>

        </List>
    );
}

const mapStateToProps = createStructuredSelector({
    dataOfObjsForList: dataOfObjsForListSelector, // события короткие данные для таблицы
    objsData: objsDataSelector, // события короткие данные для таблицы
    fullDataOfActiveObForMapForRelatives: fullDataOfActiveObForMapForRelativesSelector, // события короткие данные для таблицы
    curObjIdSel: curObjIdSelector, // события короткие данные для таблицы
});


const mapDispatchToProps = (dispatch) => ({
    fetchObjByIdToObjsData: (objId) => dispatch(fetchObjByIdToObjsDataAsync(objId)),
    setIdOfActiveObjOfAuthUser: (obj) => dispatch(setActiveObjOfAuthUserAsync(obj)),
    setCurObjIdForConsentPage: (objId) => dispatch(setCurObjIdForConsentPageAsync(objId)),
    setActiveRelId: (objId) => dispatch(relObjsList.setActiveRelIdAsync(objId)),
});
// export default CardUserInfo;
export default connect(mapStateToProps, mapDispatchToProps)(CardUserInfo);
