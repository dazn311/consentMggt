import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {
    fetchAuthUserAsync,
    fetchEventsPointShortAsync,
    fetchObjsOfAuthUserAsync,
    fetchRelObjsOfAuthUserAsync,
    setActiveObjOfAuthUserAsync,
    updateSmeObjsOfAuthUserAsync
} from '../../../store/consent/cons.actions';
import {
    dataOfObjsForListSelector,
    fullDataOfActiveObForMapForRelativesSelector,
    objRelativesSelector,
    objsDataOfAuthUserSelector,
    orgDataOfAuthUserSelector,
    userOfAuthDataSelector
} from '../../../store/consent/cons.selectors';


import CardUserInfo from './CardUserInfo/CardUserInfo';
import {Button} from "@material-ui/core";
import ChatEvent from "./components/chat";
import CardMapInfo from "./CardMapInfo/index";

////////////////////////////////////////////////////////
const TabFirstConsent = ({
                             fetchAuthUser,
                             userOfAuthData,
                             fetchObjsOfAuthUser,
                             objsDataOfAuthUser
                         }) => {
    const [userId] = useState(531);  /// мы зашли под этим аккаунтом



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


    return (
        <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: window.innerWidth < 500 ? 'column' : 'row',
            justifyContent: 'flex-start'
        }}>

            <CardUserInfo
                userOfAuthData={userOfAuthData}
                objsDataOfAuthUser={objsDataOfAuthUser}
            >.</CardUserInfo>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
                minWidth: 550,
                minHeight: 550,
                position: 'relative',
                overflow: 'unset'
            }}>
                <Button style={{position:'absolute', top: -40, left: 10, zIndex: 110}} >Выбрать событие</Button>
                 <CardMapInfo />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
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
    dataOfObjsForList: dataOfObjsForListSelector, // события короткие данные для таблицы
    fullDataOfActiveObForMapForRelatives: fullDataOfActiveObForMapForRelativesSelector, // события короткие данные для таблицы
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