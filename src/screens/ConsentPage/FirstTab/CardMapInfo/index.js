import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {convertWT} from "../services/reMapBnd";
import {ObjCard} from "./CardMapComponents/objCard";
import {createStructuredSelector} from "reselect";
import {
      fullDataOfActiveObForMapForRelativesSelector,
    relFullDataOfActiveObjSelector //
} from "../../../../store/consent/cons.selectors";

// import {
//     fetchAuthUserAsync, fetchEventsPointShortAsync,
//     fetchObjsOfAuthUserAsync, fetchRelObjsOfAuthUserAsync,
//     setActiveObjOfAuthUserAsync, updateSmeObjsOfAuthUserAsync
// } from "../../../../store/consent/cons.actions";


const CardMapInfo = ({ fullDataOfActiveObForMapForRelatives ,    relFullDataOfActiveObjS}) => {

    let [newMapObj, setNewMapObj] = useState(<div>loading..</div>)

    const geoBnd = ( objData ) => {
        if (relFullDataOfActiveObjS) {
            if(objData && objData.obj_bounds){
                let objBndTmp = objData.obj_bounds;
                let objName = objData.obj_name;
                // console.log('25 geoBnd',objData.obj_id)
                let objId = objData.obj_id
                if (objBndTmp) {
                    let geoArr = convertWT(objBndTmp.obj_bnd_geometry)
                    let objCoordinate = geoArr.coordinates;
                    return {objName, objCoordinate, objId}
                }
            }else {
                console.log('56 geoBnd not data' )
                return null
            }
        }else {
            console.log('567 geoBnd not data' )
            return null
        }

    }

    const setCurObj = () => {
        console.log('setCurObj')
    }

    useEffect(() => {
        let newMapObj77 = null
        // let newMapRel77 = null
        let objName, objCoordinate, objId , relCoordinate

        if (fullDataOfActiveObForMapForRelatives && relFullDataOfActiveObjS) {
            let geoBndObj = geoBnd( fullDataOfActiveObForMapForRelatives )
            if(geoBndObj){
                objName  = geoBndObj.objName
                objCoordinate  = geoBndObj.objCoordinate
                objId  = geoBndObj.objId
            }


            let geoBndRel = geoBnd( relFullDataOfActiveObjS )
            if(geoBndRel){
                // console.log('5777 geoBndRel', !!geoBndRel )
                relCoordinate  = geoBndRel.objCoordinate
            }

            newMapObj77 = ObjCard(objName, objCoordinate, relCoordinate, objId, setCurObj)
            setNewMapObj(newMapObj77)

        }
        // if (fullDataOfActiveObForMapForRelatives){
        //     console.log('else if fullDataOfActiveObForMapForRelatives')
        //     let geoBndObj2 = geoBnd( fullDataOfActiveObForMapForRelatives )
        //     if(geoBndObj2){
        //         objName  = geoBndObj2.objName
        //         objCoordinate  = geoBndObj2.objCoordinate
        //         objId  = geoBndObj2.objId
        //     }
        //
        //     newMapObj77 = ObjCard(objName, objCoordinate, [], objId, setCurObj)
        //     setNewMapObj(newMapObj77)
        //
        // }

    }, [fullDataOfActiveObForMapForRelatives, relFullDataOfActiveObjS])

    // console.log('relFullDataOfActiveObjS',relFullDataOfActiveObjS)
    return ( newMapObj )

};


const mapStateToProps = createStructuredSelector({
    fullDataOfActiveObForMapForRelatives: fullDataOfActiveObForMapForRelativesSelector,
    relFullDataOfActiveObjS: relFullDataOfActiveObjSelector, // данные для карты выделенного смежного объекта
});

const mapDispatchToProps = (dispatch) => ({
    // fetchAuthUser: (userID) => dispatch(fetchAuthUserAsync(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardMapInfo);