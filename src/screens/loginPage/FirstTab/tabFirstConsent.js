import React, {createRef, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';


import {
    fetchAuthUserAsync,
    fetchObjsOfAuthUserAsync,
    setActiveObjOfAuthUserAsync, updateSmeObjsOfAuthUserAsync,
    fetchEventsPointShortAsync, fetchRelObjsOfAuthUserAsync
} from '../../../store/consent/cons.actions';
import {
    userOfAuthDataSelector,
    orgDataOfAuthUserSelector,
    objsDataOfAuthUserSelector,
    activeObjDataOfAuthUserSelector, updateObjsDataOfAuthUserSelector, objRelativesSelector, objDataFromLocalAPISelector
} from '../../../store/consent/cons.selectors';


import './eventDetail.styles.scss';
import './map-widget.css';
import CardUserInfo from './CardUserInfo';
// import CardEventInfo from './CardEventInfo';
import CardMapInfo from "./CardMapInfo";
import {Button} from "@material-ui/core";
import ChatEvent from "./components/chat";
// import PolygonCreator from "./PolygonCreator";
// import ObjPolygon from "./components/ObjPolygon";
// import CardYandexMap from "./CardYandexMap";

const ObjCard = (objAddress, objBnd, id, setCurObj) => {
    return (<CardMapInfo
        id={'card-yandex' + id}
        objAdress={objAddress}
        objBnd={objBnd}
        setCurObj={setCurObj}
    />)
}
// const ObjCard = (objAddress, objBnd, id, setCurObj) => {
//     return (<CardYandexMap
//         id={'card-yandex' + id}
//         objAdress={objAddress}
//         objBnd={objBnd}
//         setCurObj={setCurObj}
//     />)
// }

const positionInitial = [[ 55.75357268949394,37.75417459778939  ],
    [55.753563806668716 ,37.75412676094323  ],
    [ 55.75356383959776,  37.75411083479522],
    [  55.75355495674767,37.75406299797433 ],
    [ 55.75354607387895,  37.75401516117512],
    [  55.7535461067935,37.753999235034215 ],
    [  55.75352824227499,37.75395133990926 ]]

const TabFirstConsent = ({
                             fetchAuthUser,
                             userOfAuthData,
                             fetchObjsOfAuthUser,
                             orgDataOfAuthUser,
                             objsDataOfAuthUser,
                             setActiveObjOfAuthUser,
                             activeObjDataOfAuthUser,
                             updateSmeObjsOfAuthUser,
                             updateObjsDataOfAuthUser,
                             fetchEventsPointShort,
                             fetchRelObjsOfAuthUser,
                             objRelatives,
                             objDataFromLocalAPI
                         }) => {
    const [userId, setUserId] = useState(531);
    // const [userId, setUserId] = useState(1153);
    const [objListName, setObjListName] = useState([]);
    const [relObjList, setRelObjList] = useState([]);
    const [objActive, setObjActive] = useState(null);
    const [objActiveBnd, setObjActiveBnd] = useState([]);
    const [objActiveRel, setObjActiveRel] = useState([]);
    const [objIndexActive, setObjIndexActive] = useState(0);




    const setCurObj = (val, id) => {
        // console.log('8899 setCurObj - val, id : ',val,id)
        setObjListName([...objListName, objListName[id] = val])
        updateSmeObjsOfAuthUser(val, id);
    }



    useEffect(() => {
        if (updateObjsDataOfAuthUser) {
            const listObjsNames = updateObjsDataOfAuthUser.map((obj, index) => (obj.objName));

            setObjActive(null)
            setObjListName(listObjsNames);

            let objActiveBndTmp = objDataFromLocalAPI.length ?  objDataFromLocalAPI.map(obj =>
                { if (obj.objId === updateObjsDataOfAuthUser[objIndexActive].objID){ return obj }}
              ) : []
            // console.log('16 updateObjsDataOfAuthUser : ',updateObjsDataOfAuthUser)
            // console.log('16 objActiveBndTmp.objData.objbnd : ',objActiveBndTmp.objData)
            // setTimeout(() => {
                let objAddress = updateObjsDataOfAuthUser[objIndexActive].objName
                let objBnd = objActiveBndTmp.objData && objActiveBndTmp.objData.objbnd
                let id = objIndexActive

                if(objActiveBndTmp.objData && objActiveBndTmp.objData.objbnd){
                    renderMap (objAddress,objBnd,id)
                }else {
                    renderMap (objAddress,[],id)
                }

            // },30)
        }

    }, [updateObjsDataOfAuthUser, objDataFromLocalAPI])


    // useEffect(() => {
    //     if (objDataFromLocalAPI.length && updateObjsDataOfAuthUser[objIndexActive]) {
    //         let idx = objDataFromLocalAPI.findIndex(o => o.objId === updateObjsDataOfAuthUser[objIndexActive].objID)
    //         if (idx >= 0){
    //             setObjActiveBnd(objDataFromLocalAPI[idx].objData.objbnd);
    //
    //
    //             // if (objDataFromLocalAPI[idx].objData.objbnd && objDataFromLocalAPI[idx].objData.objbnd.length){
    //             //     console.log('objDataFromLocalAPI[idx].objData.objbnd slice(0,5)',objDataFromLocalAPI[idx].objData.objbnd.slice(0,5))
    //             // }
    //
    //         }else {
    //             setObjActiveBnd([]);
    //
    //         }
    //     }
    // }, [objDataFromLocalAPI,objIndexActive])

    useEffect(() => {
        if (!userOfAuthData) {
            fetchAuthUser(userId);
        }
    }, [fetchAuthUser, userOfAuthData])


    useEffect(() => {
        if (userOfAuthData) {
            if (userOfAuthData.org_name) {
                let splitOrgName = userOfAuthData.org_name.split('"');
                if (splitOrgName.length > 1) {
                    splitOrgName = userOfAuthData.org_name.split('"')[1];
                } else {
                    splitOrgName = userOfAuthData
                }
                fetchObjsOfAuthUser(splitOrgName);
            }
        }
    }, [fetchObjsOfAuthUser, userOfAuthData])


    const setActiveObj = (index) => {
        setObjIndexActive(null);
        setObjActive(null);



        // console.log('objDataFromLocalAPI',objDataFromLocalAPI)
        console.log('setActiveObj -- index',index)

        if (updateObjsDataOfAuthUser) {
            let activeObj = updateObjsDataOfAuthUser.find((obj, idx) => (idx === index));
            console.log('0000 activeObj', activeObj)

            setActiveObjOfAuthUser(activeObj );
            if (activeObj.objRelatives){
                setObjActiveRel(activeObj.objRelatives)
            }

            let bnd = []
            if (objDataFromLocalAPI.length && updateObjsDataOfAuthUser[index]) {
                let idx = objDataFromLocalAPI.findIndex(o => o.objId === updateObjsDataOfAuthUser[index].objID)
                if (idx >= 0){
                    bnd = objDataFromLocalAPI[idx].objData.objbnd
                }
            }


            let objAddress = activeObj.objName;
            let id = index

            renderMap(objAddress,bnd,id)

        }
        setObjIndexActive(index);
    }

    function renderMap (objAddress,objBnd,id) {
        setObjActive(null)
        setTimeout(() => {
            setObjActive(ObjCard(objAddress,objBnd,id,setCurObj))

        },150)
    }

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: window.innerWidth < 500 ? 'column' : 'row',
            justifyContent: 'flex-start'
        }}>

            <CardUserInfo
                setActiveObjOfAuthUser={setActiveObj}
                userOfAuthData={userOfAuthData}
                objsDataOfAuthUser={objsDataOfAuthUser}
                relatives={objActiveRel}
            >.</CardUserInfo>
            <div style={{
                display: 'flex',
                flexDirection: 'column' ,
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
                position: 'relative',
                overflow: 'unset'
            }}>
                <Button>Новое событие</Button>
                {objActive ? objActive : '' }
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column' ,
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
                position: 'relative',
                overflow: 'unset'
            }}>
                <ChatEvent> </ChatEvent>

            </div>

        </div>
    );
}


const mapStateToProps = createStructuredSelector({
    userOfAuthData: userOfAuthDataSelector, // события короткие данные для таблицы
    orgDataOfAuthUser: orgDataOfAuthUserSelector, // события короткие данные для таблицы
    objsDataOfAuthUser: objsDataOfAuthUserSelector, // события короткие данные для таблицы
    updateObjsDataOfAuthUser: updateObjsDataOfAuthUserSelector, // события короткие данные для таблицы
    objDataFromLocalAPI: objDataFromLocalAPISelector, // события короткие данные для таблицы
    activeObjDataOfAuthUser: activeObjDataOfAuthUserSelector, // события короткие данные для таблицы
    objRelatives: objRelativesSelector, // события короткие данные для таблицы
});

const mapDispatchToProps = (dispatch) => ({
    fetchAuthUser: (userID) => dispatch(fetchAuthUserAsync(userID)),
    fetchObjsOfAuthUser: (orgName) => dispatch(fetchObjsOfAuthUserAsync(orgName)),
    setActiveObjOfAuthUser: (objName) => dispatch(setActiveObjOfAuthUserAsync(objName)),
    updateSmeObjsOfAuthUser: (object, id) => dispatch(updateSmeObjsOfAuthUserAsync(object, id)),
    fetchEventsPointShort: (limit, ofset) => dispatch(fetchEventsPointShortAsync(limit, ofset)),
    fetchRelObjsOfAuthUser: (limit, ofset) => dispatch(fetchRelObjsOfAuthUserAsync(limit, ofset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabFirstConsent);