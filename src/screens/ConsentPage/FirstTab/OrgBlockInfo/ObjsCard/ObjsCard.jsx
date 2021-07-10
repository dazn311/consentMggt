import React from 'react';
import {observer} from 'mobx-react'

import stateObjsMobx from '../../../../../store/consent/objsConsent/objsCons.mobx';

import ListItem from '@material-ui/core/ListItem';


import LoaderList from "../components/LoaderList";
import {ListObjs} from "./companentsObjs/ListObjs";
import ObjsAvatar from "./companentsObjs/ObjsAvatar";


////////////////////////////////////
const ObjsCard = observer(() => {
    let { success, objLst } = stateObjsMobx.objListState;

    if (!success && !objLst.amount) {
        return <LoaderList title={'загрузка смеж.объектов...'}/>
    }

    return (
        <React.Fragment>
            <ListItem>
                <ObjsAvatar amount={objLst.amount}/>
                <ListObjs objects={objLst.data.data.objects} curObjId={stateObjsMobx.selectedObjs['obj'].id} />
            </ListItem>
        </React.Fragment>
    );
})

export default ObjsCard
