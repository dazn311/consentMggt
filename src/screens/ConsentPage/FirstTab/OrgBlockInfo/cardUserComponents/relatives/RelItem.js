import React from "react";

export let RelItem = ({obj, index, selActiveRelObj, relIdS}) => {
    let orgName = obj.rel_owner_data ? obj.rel_owner_data.obj_rel_org_name : 'not data'
    let objName = obj.obj_rel_name ? obj.obj_rel_name : 'нет данных'
    let relID = obj.obj_rel_id ? obj.obj_rel_id : 'нет данных'


    return (<div key={index} style={{display: 'flex', cursor: 'pointer'}} onClick={selActiveRelObj}>
        <div style={{width: 4, backgroundColor: 'darkgrey'}}></div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{color: relID === relIdS ?'burlywood':'', paddingLeft: 4, maxWidth: 250}}>
                {/*{relID} */}
                {objName}
            </div>
            <div style={{
                color: relID === relIdS ?'#deb88794':'',
                paddingLeft: 4,
                borderBottom: '1px solid grey',
                maxWidth: 250,
                fontSize: 'small'
            }}>{orgName}</div>
        </div>
    </div>)
}