import React from "react";

import ElemObj from "./objStatus";


////////////////////////////////////
export const listObjs = (updateObjsData, activeObjId, setIdOfActiveObj) => {
    // const showDetail = () => {
    //     // console.log('show')
    // }
    // const hideDetail = () => {
    //     // console.log('hide')
    // }

    let orgObjects = updateObjsData.map((obj, index) => (
        <ElemObj
            key={index}
            objID={obj.objID}
            obj={obj}
            style={{display: 'flex'}}
            // onMouseOut={hideDetail}
            // onMouseOver={showDetail}
            setIdOfActiveObj={setIdOfActiveObj}

        />))


    return orgObjects
}


