import React  from 'react';
import {observer} from 'mobx-react'

import stateObjsMobx from '../../../../../store/consent/objsConsent/objsCons.mobx';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

import {useStyles} from "../cardUserComponents/ElemObj";
import LoaderList from "../components/LoaderList";
import {ListRel} from "./companentsRel/ListRel";

const styleObjs = {
    marginLeft: 4, borderLeft: '1px solid grey', paddingLeft: 4,
    transform: 'rotate(-90deg)', position: 'absolute', left: 4, top: 100
}
const styleObjsAmount = {position: 'absolute', color: 'yellowgreen', bottom: -24}

////////////////////////////////////
const RelCard = observer(({length = null}) => {
    const classes = useStyles();
    // console.log('3 stateObjsMobx.objectsData',stateObjsMobx.objectsData.data.objects[0].objID)


    if (!stateObjsMobx.successFetchObjArr || !stateObjsMobx.objsArr[11718]) {
        return <LoaderList title={'загрузка смеж.объектов...'}/>
    }else {
        // console.log('3 stateObjsMobx.objectsData',stateObjsMobx.objectsData.data.objects[0].objID)

    }

    return (
        <React.Fragment>
            <ListItem>
                <ListItemAvatar>
                    <Avatar className={classes.MuiAvatarRoot}>
                        <HomeWorkIcon/>
                        <ListItemText style={styleObjsAmount} secondary={stateObjsMobx.objectsData.amount}/>
                    </Avatar>
                    <div style={styleObjs}>Смеж. объекты</div>
                </ListItemAvatar>
               <ListRel objects={stateObjsMobx.objsArr[11718].obj_relatives} curRelId={stateObjsMobx.curRelId}  />
            </ListItem>
        </React.Fragment>
    );
})

export default RelCard
