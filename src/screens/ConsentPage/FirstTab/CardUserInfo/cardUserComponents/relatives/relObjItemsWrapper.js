////////////////////////////////////
import React, {useEffect} from "react";
import {createStructuredSelector} from "reselect";


import {relDataArrSelector, relListShortDataSelector, activeRelIdSelector, objsDataSelector} from "../../../../../../store/consent/cons.selectors";
import {fetchObjByIdToObjsDataAsync} from "../../../../../../store/consent/cons.actions";
import {connect} from "react-redux";
import {relObjsList} from "../../../../../../api/relObj-api";

let RelItem = ({obj, index, selActiveRelObj}) => {
    let orgName = obj.rel_owner_data ? obj.rel_owner_data.obj_rel_org_name : 'not data'
    let objName = obj.obj_rel_name ? obj.obj_rel_name : 'нет данных'

    return (<div key={index} style={{display: 'flex', cursor:'pointer'}} onClick={selActiveRelObj} >
        <div style={{width: 4, backgroundColor: 'darkgrey'}}></div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{color: 'burlywood', paddingLeft: 4, maxWidth: 250}}>
                {objName}
            </div>
            <div style={{ color: '#deb88794', paddingLeft: 4, borderBottom: '1px solid grey', maxWidth: 250, fontSize: 'small' }}>{orgName}</div>
        </div>
    </div>)
}

let amLoading = 0
let RelObjItemsWrapper = ({relListShortDataS, fetchRelById, relDataArrS, setActiveRelId, activeRelIdS, fetchObjByIdToObjsData, objsDataS}) => {
    if (!relListShortDataS) { return (<div>'loading..'</div>) }


    // useEffect(() => {
    if(amLoading === 0){
        if(relListShortDataS[0].obj_rel_id){
            if(relListShortDataS[0]){
                let relListShort = relListShortDataS[0]
                let objId2 = relListShort.obj_rel_id
                fetchObjByIdToObjsData(objId2)
                setActiveRelId(objId2)
                ++amLoading
            }
        }
    }


    // },[])



    const selActiveRelObj = (objId) => {
        console.log('33 selActiveRelObj',objId)
        if(objId){
            fetchObjByIdToObjsData(objId)
            // fetchRelById(objId)
            setActiveRelId(objId)
        }

    }
    // console.log('223 relListShortDataS',relListShortDataS) ///[0].obj_type
    // console.log('223 amLoading',amLoading) ///[0].obj_type

    return (<div>
        {relListShortDataS
            .map((obj, index) =>  (<RelItem obj={obj} index={index} selActiveRelObj={() => selActiveRelObj(obj.obj_rel_id)}/>))} </div>)
}


const mapStateToProps = createStructuredSelector({
    relListShortDataS: relListShortDataSelector,
    relDataArrS: relDataArrSelector,
    activeRelIdS: activeRelIdSelector,
    objsDataS: objsDataSelector,
});

const mapDispatchToProps = (dispatch) => ({
    fetchRelById: (objId) => dispatch(relObjsList.fetchRelById(objId)),
    setActiveRelId: (objId) => dispatch(relObjsList.setActiveRelIdAsync(objId)),
    fetchObjByIdToObjsData: (objId) => dispatch(fetchObjByIdToObjsDataAsync(objId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RelObjItemsWrapper);


