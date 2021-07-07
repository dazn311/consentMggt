import React from "react";
import {v4 as uuIdv4} from 'uuid';

import ElemObj from "./ElemObj";


////////////////////////////////////
export const listObjs = (updateObjsData, activeObjId, setIdOfActiveObj) => {

    let orgObjects = updateObjsData.map((obj, index) => (
        <ElemObj
            key={index + uuIdv4()}
            objID={obj.objID}
            obj={obj}
            style={{display: 'flex'}}
            // onMouseOut={hideDetail}
            // onMouseOver={showDetail}
            setIdOfActiveObj={setIdOfActiveObj}

        />))

    return orgObjects
}


