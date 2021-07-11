import React from "react";
import {v4 as uuIdv4} from 'uuid';
// import { FixedSizeList } from 'react-window'

import {Paper} from "@material-ui/core";

import ElemObj from "./ElemObj";

export const ListObjs = ({objects, curObjId}) => {

    return (
        <Paper elevation={1}>
            <div className={'list-objs'} style={{maxHeight: 270, minWidth: 240, overflow: 'auto'}}>
                {objects.map(renderRow)}
            </div>
        </Paper>
    )

    function renderRow(props) {
        return (<ElemObj key={uuIdv4()} obj={props} isActive={props.objID === curObjId}/>)
    }

}

{/*<FixedSizeList height={300} width={300} itemSize={21} itemCount={100}>*/
}
{/*    {renderRow}*/
}
{/*</FixedSizeList>*/
}

