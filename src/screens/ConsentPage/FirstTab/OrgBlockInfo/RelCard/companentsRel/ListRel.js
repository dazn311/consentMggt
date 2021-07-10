import React from "react";
import {v4 as uuIdv4} from 'uuid';

import ElemRel from "./ElemRel";
import {Paper} from "@material-ui/core";

//objects={stateObjsMobx.objsArr[11718].obj_relatives}
export const ListRel = ({relatives = [],curRelId = 0}) => {
    // console.log('curRel', curRelId)
    return (
        <Paper elevation={1}>
            <div style={{maxHeight: 280, overflow: 'auto'}}>
                { relatives.map( rel => <ElemRel key={ uuIdv4() } obj={rel} isActive={rel.obj_rel_id === curRelId} />) }
            </div>
        </Paper>
    )
}


