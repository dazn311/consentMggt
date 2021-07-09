import React from 'react';
import {observer} from 'mobx-react'

import stateObjsMobx from '../../../../../store/consent/objsConsent/objsCons.mobx';

import ListItem from '@material-ui/core/ListItem';


import LoaderList from "../components/LoaderList";

import {ListObjs} from "./companentsObjs/ListObjs";
import ObjsAvatar from "./companentsObjs/ObjsAvatar";


////////////////////////////////////
const ObjsCard = observer(() => {

    if (!stateObjsMobx.successFetchObjLst && !stateObjsMobx.objectsDataLst.data) {
        return <LoaderList title={'загрузка смеж.объектов...'}/>
    }

    return (
        <React.Fragment>
            <ListItem>
                <ObjsAvatar amount={stateObjsMobx.objectsDataLst.amount}/>
                <ListObjs objects={stateObjsMobx.objectsDataLst.data.objects} curObjId={stateObjsMobx.curObjId}/>
            </ListItem>
        </React.Fragment>
    );
})

export default ObjsCard
