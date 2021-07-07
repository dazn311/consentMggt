import React from "react";
import {v4 as uuIdv4} from 'uuid';
import { FixedSizeList } from 'react-window'

import {Paper} from "@material-ui/core";

import ElemObj from "./ElemObj";



export const ListObjs = ({objects,curObjId}) => {

    return (
        <Paper elevation={1}>
            {/*<FixedSizeList height={300} width={300} itemSize={21} itemCount={100}>*/}
            {/*    {renderRow}*/}
            {/*</FixedSizeList>*/}
            <div style={{maxHeight: 280, overflow: 'auto'}}>
                {objects.map( renderRow)}
            </div>
        </Paper>
    )


    function renderRow(props) {
        // console.log('props', props)
        return (
            // <div> bla2 bla</div>
            <ElemObj
                key={uuIdv4()}
                obj={props}
                isActive={props.objID === curObjId}
            />
        );
    }

    // function renderRow(props) {
    //     // console.log('props', props)
    //     return (
    //         // <div> bla2 bla</div>
    //         <ElemObj
    //             key={uuIdv4()}
    //             obj={objects[props.index]}
    //             isActive={objects[props.index].objID === curObjId}
    //         />
    //     );
    // }

}


