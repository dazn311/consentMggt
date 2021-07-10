////////////////////////////////////
import React, {useEffect, useState} from "react";
import {createStructuredSelector} from "reselect";


import {
    activeObjAndRelSelector,
    activeRelIdSelector,
    objsDataSelector,
    relDataArrSelector,
    relListShortDataSelector
} from "../../../../../../store/consent/cons.selectors";
import {fetchObjByIdToObjsDataAsync} from "../../../../../../store/consent/cons.actions";
import {connect} from "react-redux";
import {relObjsList} from "../../../../../../api/relObj-api";
import {RelItem} from "./RelItem";

//////////////////////
let RelObjItemsWrapper = ({relListShortDataS, setActiveRelId, fetchObjByIdToObjsData, setActiveObjAndRel}) => {
    const [relIdS, setRelIdS] = useState(0)

    useEffect(() => {
        //
        if(relListShortDataS && relListShortDataS.length){
            if (relListShortDataS[0].obj_rel_id && relListShortDataS[0].obj_rel_name){
                let idRel = relListShortDataS[0].obj_rel_id
                let nameRel = relListShortDataS[0].obj_rel_name
                setActiveObjAndRel([{id: 0, objName: ''},{id: idRel, relName: nameRel}])
                fetchObjByIdToObjsData(idRel)
                setRelIdS(idRel)
            }
        }
    },[relListShortDataS,fetchObjByIdToObjsData,setActiveObjAndRel])

    if (!relListShortDataS) {
        return (<div>'loading..'</div>)
    }


    const setActiveRelObj = (relId,relName) => {
        if (relId) {
            fetchObjByIdToObjsData(relId)
            setActiveRelId(relId)
            setActiveObjAndRel([{id: 0, objName: ''},{id: relId, relName: relName}])
            setRelIdS(relId)
        }
    }
    // console.log('22555 relListShortDataS',relListShortDataS[0] )
    return (<div>
        {relListShortDataS
            .map((obj, index) => (
                <RelItem obj={obj} relIdS={relIdS} index={index} selActiveRelObj={() => setActiveRelObj(obj.obj_rel_id,obj.obj_rel_name)}/>))} </div>)
}


const mapStateToProps = createStructuredSelector({
    relListShortDataS: relListShortDataSelector,
    relDataArrS: relDataArrSelector,
    activeRelIdS: activeRelIdSelector,
    activeObjAndRelSelector: activeObjAndRelSelector,
    objsDataS: objsDataSelector,
});

const mapDispatchToProps = (dispatch) => ({
    fetchRelById: (objId) => dispatch(relObjsList.fetchRelById(objId)),
    setActiveRelId: (objId) => dispatch(relObjsList.setActiveRelIdAsync(objId)),
    fetchObjByIdToObjsData: (objId) => dispatch(fetchObjByIdToObjsDataAsync(objId)),
    setActiveObjAndRel: (objData) => dispatch(relObjsList.setActiveObjAndRelAsync(objData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RelObjItemsWrapper);


