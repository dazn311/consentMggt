////////////////////////////////////
import React from "react";

let RelItem = (obj, index) => {
    return (<div key={index} style={{display: 'flex'}}>
        <div style={{width: 4, backgroundColor: 'darkgrey'}}></div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{color: 'burlywood', paddingLeft: 4, maxWidth: 250}}>
                {obj.obj_rel_name}
            </div>
            <div style={{
                color: '#deb88794',
                paddingLeft: 4,
                borderBottom: '1px solid grey',
                maxWidth: 250,
                fontSize: 'small'
            }}>
                {obj.rel_owner_data.obj_rel_org_name}
            </div>
        </div>
    </div>)
}

export let relObj = (fullDataOfActiveObForMapForRelatives) => {
    return fullDataOfActiveObForMapForRelatives.obj_relatives && fullDataOfActiveObForMapForRelatives.obj_relatives.map((obj, index) => {
        return (<RelItem obj={obj} index={index} />)
    })
}


