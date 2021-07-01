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
    // objsDataOfAuthUserSelector,
    orgDataOfAuthUserSelector,
    userOfAuthDataSelector
} from '../../../store/consent/cons.selectors';


import CardUserInfo from './CardUserInfo/CardUserInfo';
import EventsObj from './CardUserInfo/cardUserComponents/eventsObj/index';
// import {Button} from "@material-ui/core";
//
// import ChatEvent from "./components/chat";
import ChatEvents from "./ChatEvents/index";
import CardMapInfo from './CardMapInfo/index'

import {styleConsent, styleOrg, styleCardMapInfo, styleEventsObj, styleChatEvents} from './tabFirstConsent.styles'


////////////////////////////////////////////////////////
const TabFirstConsent = ({
                             fetchAuthUser, fetchObjsOfAuthUser, userOfAuthData
                             // , objsDataOfAuthUser
                         }) => {
    const [userId] = useState(531);  /// мы зашли под этим аккаунтом

    useEffect(() => {
        if (!userOfAuthData) {
            fetchAuthUser(userId);
        }
    }, [fetchAuthUser, userOfAuthData, userId])


    // console.log(' objsDataOfAuthUser', objsDataOfAuthUser)

    useEffect(() => {
        if (userOfAuthData) {
            console.log(' userOfAuthData', userOfAuthData)
            sessionStorage.setItem('userOfAuthData', JSON.stringify(userOfAuthData))

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
        <div style={styleConsent}>
            <div style={styleOrg}>
                <CardUserInfo userOfAuthData={userOfAuthData}/>
            </div>
            <div style={styleCardMapInfo}>
                <CardMapInfo/>
            </div>
            <div style={styleEventsObj}>
                <EventsObj/>
            </div>
            <div style={styleChatEvents}>
                <ChatEvents/>
            </div>
        </div>
    );
}


const mapStateToProps = createStructuredSelector({
    userOfAuthData: userOfAuthDataSelector, // события короткие данные для таблицы
    orgDataOfAuthUser: orgDataOfAuthUserSelector, // события короткие данные для таблицы
    // objsDataOfAuthUser: objsDataOfAuthUserSelector, // события короткие данные для таблицы
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