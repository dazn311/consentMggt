import React from 'react';
import {observer} from 'mobx-react'

import stateObjsMobx from '../../../../../store/consent/objsConsent/objsCons.mobx';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

import {useStyles} from "./RelCard.styles";
import LoaderList from "../components/LoaderList";
import {ListRel} from "./companentsRel/ListRel";

////////////////////////////////////
const RelCard = observer(() => {
    const classes = useStyles();
    // console.log('3 stateObjsMobx.objectsData',stateObjsMobx.objectsData.data.objects[0].objID)

    const {selectedObjs, objsArr} = stateObjsMobx;
    const objID = selectedObjs['obj'].id

    if (!stateObjsMobx.objArrState.success || !objsArr[objID]) {
        return <LoaderList title={'загрузка смеж.объектов...'}/>
    } else if (!objsArr[objID]['obj_relatives']){
        return <LoaderList title={'нет смеж.объектов...'}/>
        // console.log('3 stateObjsMobx.objectsData',stateObjsMobx.objectsData.data.objects[0].objID)
    }

    return (
        <React.Fragment>
            <ListItem>
                <ListItemAvatar>
                    <div>
                        <Avatar className={classes.MuiAvatarRoot}>
                            <HomeWorkIcon/>
                            <ListItemText  className={classes.styleObjsAmount}  secondary={objsArr[objID].obj_relatives.length}/>
                        </Avatar>
                        <div className={classes.styleObjs}  >Смеж. объекты</div>
                    </div>
                </ListItemAvatar>
                <ListRel relatives={objsArr[objID].obj_relatives} curRelId={selectedObjs.rel.id} />
            </ListItem>
        </React.Fragment>
    );
})

export default RelCard
