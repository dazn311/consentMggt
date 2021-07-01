import React, {useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {convertWT} from "../services/reMapBnd";
import {createStructuredSelector} from "reselect";
import {
    activeObjAndRelSelector,
    fullDataOfActiveObForMapForRelativesSelector, recsDataSelector,
    relFullDataOfActiveObjSelector //
} from "../../../../store/consent/cons.selectors";
import CardMapInfo from "./CardMapComponents/CardMapInfo";

// import flatten from 'lodash/flatten'

const reMapRecsDataS = (firstPointOfBnd, recsLength) => {
    // console.log('reMapRecsDataS - firstPointOfBnd', firstPointOfBnd)
    // console.log('reMapRecsDataS - recsLength', recsLength)

    let newArr = []
    let lat = firstPointOfBnd[0]
    let lng = firstPointOfBnd[1]
    let x = 0
    let xRadius = (4 / 3000.0)
    let yRadius = (6 / 3000.0)
    let y = 0

    for (let i = 0; i < recsLength; i++) {
        // x = (i / 3000.0) *  Math.cos(i*5)
        x = xRadius *  Math.cos(i*15)
        y = yRadius *  Math.sin(i*15)
        // y = radius *  sin(angle)
        lat = firstPointOfBnd[0] + x
        lng = firstPointOfBnd[1] + y
        lat = parseFloat(lat.toFixed(5))
        lng = parseFloat(lng.toFixed(5))

        let newPoint = [lat, lng]

        x += 1
        y += 1

        newArr.push(newPoint)
    }
    return newArr
}

let objAddress = ''
const CardMapInfoWrap = ({
                             fullDataOfActiveObForMapForRelatives,
                             relFullDataOfActiveObjS,
                             activeObjAndRelS,
                             recsDataS
                         }) => {

    // let [newMapObj, setNewMapObj] = useState(<div>loading..</div>)
    let [objBndS, setObjBndS] = useState([])
    let [relBndS, setRelBndS] = useState([])

    const geoBnd = useCallback((objData) => {
        if (relFullDataOfActiveObjS) {
            if (objData && objData.obj_bounds) {
                let objBndTmp = objData.obj_bounds;
                let objName = objData.obj_name;
                // console.log('25 geoBnd',objData.obj_id)
                let objId = objData.obj_id
                if (objBndTmp) {
                    let geoArr = convertWT(objBndTmp.obj_bnd_geometry)
                    let objCoordinate = geoArr.coordinates;
                    return {objName, objCoordinate, objId}
                }
            } else {
                // console.log('56 geoBnd not data' )
                return null
            }
        } else {
            // console.log('567 geoBnd not data' )
            return null
        }

    },[relFullDataOfActiveObjS])

    const setCurObj = () => {
        console.log('setCurObj')
    }


    useEffect(() => {
        let  objCoordinate,  relCoordinate = []

        if (fullDataOfActiveObForMapForRelatives) {
            let geoBndObj = geoBnd(fullDataOfActiveObForMapForRelatives)
            if (geoBndObj) {
                objAddress =  geoBndObj.objName
                objCoordinate = geoBndObj.objCoordinate
                setObjBndS(objCoordinate)
            }

            if (relFullDataOfActiveObjS) {
                let geoBndRel = geoBnd(relFullDataOfActiveObjS)
                if (geoBndRel) {
                    relCoordinate = geoBndRel.objCoordinate
                    setRelBndS(relCoordinate)
                }
                // newMapObj77 = ObjCard(objName, objCoordinate, relCoordinate, recsDataS, objId, setCurObj)
                // setNewMapObj(newMapObj77)
            } else {
                // newMapObj77 = ObjCard(objName, objCoordinate, objCoordinate, recsDataS, objId, setCurObj)
            }

        }


    }, [fullDataOfActiveObForMapForRelatives, relFullDataOfActiveObjS, activeObjAndRelS, recsDataS,geoBnd])

    if (!objBndS.length && !relBndS.length) {
        return (<div>Loading..</div>)
    }

    // let fletenArr = flatten(flatten(objBndS));
    let flattenArr1 = objBndS[0][0];
    let flatArr = typeof flattenArr1[0] === "number" ? flattenArr1 : flattenArr1[0]
    // console.log('77555 flatten objBndS', fFletArr)
    // console.log('77555   recsDataS', recsDataS)

    if ( !flatArr.length) {
        return (<div>Loading2..</div>)
    }
    return (<CardMapInfo
        objAddress={objAddress}
        objBnd={objBndS}
        relBnd={relBndS}
        recsDataP={recsDataS}
        recsBnd={reMapRecsDataS(flatArr, recsDataS.length)}
        setCurObj={setCurObj}
    />)
};


const mapStateToProps = createStructuredSelector({
    fullDataOfActiveObForMapForRelatives: fullDataOfActiveObForMapForRelativesSelector,
    relFullDataOfActiveObjS: relFullDataOfActiveObjSelector, // данные для карты выделенного смежного объекта
    activeObjAndRelS: activeObjAndRelSelector, // данные для карты выделенного смежного объекта
    recsDataS: recsDataSelector, // события короткие данные для таблицы
});

const mapDispatchToProps = (dispatch) => ({
    // fetchAuthUser: (userID) => dispatch(fetchAuthUserAsync(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardMapInfoWrap);