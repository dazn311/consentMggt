import React from "react";
import {v4 as uuIdv4} from 'uuid';

import ElemRel from "./ElemRel";
import {Paper} from "@material-ui/core";

export const ListRel = ({objects,curRelId}) => {
    return (
        <Paper elevation={1}>
            <div style={{maxHeight: 280, overflow: 'auto'}}>
                {objects.map( (obj,idx)  => (
                    <ElemRel
                        key={uuIdv4()}
                        obj={obj}
                        isActive={obj.obj_rel_id === curRelId}
                    />))}
            </div>
        </Paper>
    )
}


