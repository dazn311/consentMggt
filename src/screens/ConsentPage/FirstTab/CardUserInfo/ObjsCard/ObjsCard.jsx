import React from 'react';
import {observer} from 'mobx-react'

import stateObjsMobx from '../../../../../store/consent/objsConsent/objsCons.mobx';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

import {useStyles} from "../cardUserComponents/ElemObj";
import LoaderList from "../components/LoaderList";
import {ListObjs} from "./companentsObjs/ListObjs";

const styleObjs = {
    marginLeft: 4, borderLeft: '1px solid grey', paddingLeft: 4,
    transform: 'rotate(-90deg)', position: 'absolute', left: 25, top: 150
}
const styleObjsAmount = {position: 'absolute', color: 'yellowgreen', bottom: -24}

////////////////////////////////////
const ObjsCard = observer(() => {
    const classes = useStyles();
// console.log('stateObjsMobx.objectsData.amount',stateObjsMobx.objectsData.amount);

    if (!stateObjsMobx.successFetchObj && !stateObjsMobx.objectsData.data) {
        return <LoaderList title={'загрузка смеж.объектов...'}/>
    } else {
        // console.log('3 stateObjsMobx.objectsData',stateObjsMobx.objectsData.data.objects[0].objID)

    }

    // console.log('stateObjsMobx.successFetchOrg',stateObjsMobx.successFetchOrg)
    // console.log('stateObjsMobx.objectsData.amount',stateObjsMobx.objectsData.amount)
    // const getObj = useCallback(() => {
    //     let objId = stateObjsMobx.objectsData.data.objects[0].objID
    //     stateObjsMobx.fetchObjById(objId)
    // },[])

    return (
        <React.Fragment>
            <ListItem>
                <ListItemAvatar>
                    <div>
                        <Avatar className={classes.MuiAvatarRoot}>
                                <HomeWorkIcon/>
                                <ListItemText style={styleObjsAmount} secondary={stateObjsMobx.objectsData.amount}/>
                        </Avatar>
                        <div style={styleObjs}>Объекты</div>
                    </div>
                </ListItemAvatar>
                <ListObjs objects={stateObjsMobx.objectsData.data.objects} curObjId={stateObjsMobx.curObjId}/>
            </ListItem>
        </React.Fragment>
    );
})

export default ObjsCard
