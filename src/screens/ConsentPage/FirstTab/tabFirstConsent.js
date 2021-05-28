import React, {createRef, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';


import {
    fetchAuthUserAsync,
    fetchObjsOfAuthUserAsync,
    setActiveObjOfAuthUserAsync, updateSmeObjsOfAuthUserAsync
} from '../../../store/consent/cons.actions';
import {
    userOfAuthDataSelector,
    orgDataOfAuthUserSelector,
    objsDataOfAuthUserSelector,
    activeObjDataOfAuthUserSelector, updateObjsDataOfAuthUserSelector
} from '../../../store/consent/cons.selectors';


import './eventDetail.styles.scss';
import './map-widget.css';
import CardUserInfo from './CardUserInfo';
// import CardEventInfo from './CardEventInfo';
// import CardMapInfo from "./CardMapInfo";
import CardYandexMap from "./CardYandexMap";

const TabFirstConsent = ({
                             fetchAuthUser,
                             userOfAuthData,
                             fetchObjsOfAuthUser,
                             orgDataOfAuthUser,
                             objsDataOfAuthUser,
                             setActiveObjOfAuthUser,
                             activeObjDataOfAuthUser,
                             updateSmeObjsOfAuthUser,
                             updateObjsDataOfAuthUser
                         }) => {
    const [userId, setUserId] = useState(1153);
    const [objListName, setObjListName] = useState([]);
    const [objList, setObjList] = useState([]);
    const [ObjActive, setObjActive] = useState(null);
    const [objIndexActive, setObjIndexActive] = useState(0);

    // console.log('000 objListName',objListName)
    // useEffect(() => {
    //     if ( activeObjDataOfAuthUser ) {
    //
    //         setObjActive(objList[activeObjDataOfAuthUser]);
    //     }
    //
    // }, [activeObjDataOfAuthUser])

    const setCurObj = (val, id) => {
        console.log('setCurObj - val, id : ',val,id)
        setObjListName([...objListName, objListName[id] = val])
        updateSmeObjsOfAuthUser(val, id);
    }

    useEffect(() => {
        if (updateObjsDataOfAuthUser) {
            const listObjsNames = updateObjsDataOfAuthUser.map((obj, index) => (obj.objName));
            const listObjs = updateObjsDataOfAuthUser.map((obj, index) => (<CardYandexMap
                id={index}
                objAdress={obj.objName}
                setCurObj={setCurObj}
            />));

            setObjListName(listObjsNames);
            setObjList(listObjs);
        }

    }, [updateObjsDataOfAuthUser])


    useEffect(() => {
        if (!userOfAuthData) {

            fetchAuthUser(userId);
        }
    }, [fetchAuthUser, userOfAuthData])


    useEffect(() => {
        if (userOfAuthData) {
            if (userOfAuthData.org_name) {
                console.log('333 fetchObjsOfAuthUser userOfAuthData.org_name', userOfAuthData.org_name.split('"')[1])
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

    // console.log('333 userOfAuthData', userOfAuthData)
    // console.log('333 orgDataOfAuthUser', orgDataOfAuthUser)
    // console.log('333 objsDataOfAuthUser', objsDataOfAuthUser)

    // return (
    //     <div style={{
    //         display: 'flex',
    //         flexWrap: 'nowrap',
    //         flexDirection: window.innerWidth < 500 ? 'column' : 'row',
    //         justifyContent: 'flex-start'
    //     }}></div>)

    const setActiveObj = (index) => {
        setObjIndexActive(null);

        setObjActive(null);
        setTimeout(() => {
            setObjActive(objList[index])
            setObjIndexActive(index);
        },50)

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
                objListName={objListName}
            ></CardUserInfo>
            {
                // selectObjRect &&
                // <CardEventInfo currObj={currObj} objRect={selectObjRect} ></CardEventInfo>
            }
            <div style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'unset'
            }}>
                {/*{objsDataOfAuthUser && <CardYandexMap*/}
                {/*    activeObjDataOfAuthUser={activeObjDataOfAuthUser}*/}
                {/*    objAdress={objsDataOfAuthUser.data.objects[0].objName}/>}*/}
                {/*{ObjActive ? ObjActive: <div>Идет загрузка</div> }*/}
                {setObjIndexActive && objList[objIndexActive] }
                {/*{objList[activeObjDataOfAuthUser]}*/}
            </div>

        </div>
    );
}


const mapStateToProps = createStructuredSelector({
    userOfAuthData: userOfAuthDataSelector, // события короткие данные для таблицы
    orgDataOfAuthUser: orgDataOfAuthUserSelector, // события короткие данные для таблицы
    objsDataOfAuthUser: objsDataOfAuthUserSelector, // события короткие данные для таблицы
    updateObjsDataOfAuthUser: updateObjsDataOfAuthUserSelector, // события короткие данные для таблицы
    activeObjDataOfAuthUser: activeObjDataOfAuthUserSelector, // события короткие данные для таблицы
});

const mapDispatchToProps = (dispatch) => ({
    fetchAuthUser: (userID) => dispatch(fetchAuthUserAsync(userID)),
    fetchObjsOfAuthUser: (orgName) => dispatch(fetchObjsOfAuthUserAsync(orgName)),
    setActiveObjOfAuthUser: (objName) => dispatch(setActiveObjOfAuthUserAsync(objName)),
    updateSmeObjsOfAuthUser: (object, id) => dispatch(updateSmeObjsOfAuthUserAsync(object, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabFirstConsent);