import {eventsObj, objsData, objsFetch, relObjs, userFetch} from './cons.types';
import memoize from "lodash/_memoizeCapped";
import {visibleEventsObjSelector} from "./cons.selectors";

export const setErrorFetchAuthUser = (errorMessage) => ({
    type: userFetch.SET_ERROR_AUTH_USER_FOR_CONSENT_PAGE,
    payload: errorMessage
});

export const setErrorFetchObjOfAuthUser = (errorMessage) => ({
    type: userFetch.SET_ERROR_OBJ_OF_AUTH_USER_FOR_CONSENT_PAGE,
    payload: errorMessage
});

export const fetchAuthUser = user => ({
    type: userFetch.GET_AUTH_USER_FOR_CONSENT_PAGE,
    payload: user
});

export const fetchOrgOfAuthUser = obj => ({
    type: userFetch.GET_ORG_OF_AUTH_USER_FOR_CONSENT_PAGE,
    payload: obj
});

export const fetchObjsOfAuthUser = obj => ({
    type: userFetch.GET_OBJS_OF_AUTH_USER_FOR_CONSENT_PAGE,
    payload: obj
});

export const setActiveObjOfAuthUser = objName => ({
    type: objsData.SET_ACTIVE_OBJ_FOR_CONSENT_PAGE,
    payload: objName
});

export const updateSmeObjsOfAuthUser = obj => ({
    type: objsData.UPDATE_SME_OBJS_FOR_CONSENT_PAGE,
    payload: obj
});

export const fetchRelObjsOfAuthUser = objId => ({
    type: objsData.FETCH_RELATIVES_OBJS_OF_AUTH_USER_FOR_CONSENT_PAGE,
    payload: objId
});

const fetchEventsOfObjsForAuthUser = objId => ({
    type: objsFetch.EVENTS_OF_OBJS_FOR_AUTH_USER_FOR_CONSENT_PAGE,
    payload: objId
});

const fetchLocalDataOfObjsForAuthUser = objId => ({
    type: objsFetch.LOCAL_DATA_OF_OBJS_FOR_AUTH_USER_FOR_CONSENT_PAGE,
    payload: objId
});

const fetchObjByIdToObjsData = obj => ({
    type: objsFetch.DATA_ONE_OBJ_FOR_AUTH_USER_FOR_CONSENT_PAGE_E,
    payload: obj
});

const setCurObjIdForConsentPage = objId => ({
    type: objsData.SET_CUR_OBJ_ID_FOR_CONSENT_PAGE,
    payload: objId
});

// FOR relatives
export const fetchRelObjById = obj => ({
    type: relObjs.FETCH_REL_OBJ_FOR_CONSENT_PAGE,
    payload: obj
});

// FOR event block
export const fetchEventObjById = obj => ({
    type: objsFetch.EVENTS_ONE_OBJ_FOR_AUTH_USER_FOR_CONSENT_PAGE_E,
    payload: obj
});

export const setActiveRelObjIdForConsentPage = objId => ({
    type: relObjs.SET_ACTIVE_REL_OBJ_FOR_CONSENT_PAGE,
    payload: objId
});

export const setActiveObjAndRelForConsentPage = objData => ({
    type: objsData.SET_ACTIVE_TWO_OBJS_FOR_CONSENT_PAGE,
    payload: objData
});

export const putEventsObjToStatsForConsentPage = eventData => ({
    type: eventsObj.FETCH_EVENT_OF_OBJ,
    payload: eventData
});

export const switchEventsObjForConsentPage = yn => ({
    type: eventsObj.SWITCH_EVENT_SHOW,
    payload: yn
});

/////////////////////////

async function postData(url = '', data = {}) {
    // console.log('postData -- url,data',url,data)
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

//

export const fetchAuthUserAsync = (userID) => dispatch => {
    _fetchAuthUserAsync(dispatch, userID);
};
const _fetchAuthUserAsync = memoize(async (dispatch, userID) => {
    try {
        let userData = sessionStorage.getItem('userOfAuthData')
        console.log('fetchAuthUser -- userData)',userData)
        if(JSON.stringify(userData) === '{}') { //This will check if the object is empty
            await postData('https://ismggt.ru/query/user/info', {'userID': userID})
                .then((data) => {
                    console.log('fetchAuthUser(data[0])',data[0])
                    dispatch(fetchAuthUser(data[0]));
                })
                .catch(error => dispatch(setErrorFetchAuthUser(error.message)));
        }else {
            dispatch(fetchAuthUser(JSON.parse(userData)));
        }
    }catch (e) {

    }

});

export const fetchOrgOfAuthUserAsync = (userID) => dispatch => {
    _fetchOrgOfAuthUserAsync(dispatch, userID);
};
const _fetchOrgOfAuthUserAsync = memoize(async (dispatch, userID) => {
    await postData('https://ismggt.ru/query/user/info', {'userID': userID})
        .then((data) => {
            dispatch(fetchOrgOfAuthUser(data[0]));
        })
        .catch(error => dispatch(setErrorFetchAuthUser(error.message)));
});


export const fetchObjsOfAuthUserAsync = (orgName) => dispatch => {
    _fetchObjsOfAuthUserAsync(dispatch, orgName);
};
const _fetchObjsOfAuthUserAsync = memoize(async (dispatch, orgName) => {
    const endDate = new Date().toISOString();
    // console.log('_fetchObjsOfAuthUserAsync -- orgName',orgName)
    await postData('https://ismggt.ru/query/objects/list', {
        "objectType": 2, "organization": 0, "limit": 100, "offset": 0, "startDate": "2021-01-01T10:00:00.000Z",
        "endDate": endDate, "objName": "", "orgName": orgName, "objKind": "", "objStatus": 10,
        "sortCol": "date", "sortType": "desc"
    })
        .then((data) => {
            dispatch(fetchObjsOfAuthUser(data));
        })
        .catch(error => dispatch(setErrorFetchAuthUser(error.message)));
});


export const setActiveObjOfAuthUserAsync = (objName) => dispatch => {

    _setActiveObjOfAuthUserAsync(dispatch, objName);//.then( val => console.log('_setActiveObjOfAuthUserAsync -- val',val));
};
const _setActiveObjOfAuthUserAsync = async (dispatch, objName) => {

    return await dispatch(setActiveObjOfAuthUser(objName));
};


export const updateSmeObjsOfAuthUserAsync = (objName, objId) => dispatch => {
    return dispatch(updateSmeObjsOfAuthUser({objName, objId}));
};


export const fetchRelObjsOfAuthUserAsync = (objectID) => dispatch => {
    _fetchRelObjsOfAuthUserAsync(dispatch, objectID)
};

const _fetchRelObjsOfAuthUserAsync = async (dispatch, objectID) => {
    return await postData('https://ismggt.ru/query/object/recs/list', {
        "objectID": objectID,
        "limit": "460",
        "offset": "0"
    })
        .then((data) => {
            dispatch(fetchEventsOfObjsForAuthUser(data));
        })
        .catch(error => dispatch(setErrorFetchObjOfAuthUser(error.message)));
};


// 290421 from Dashboard page
export const fetchEventsPointShortAsync = (limit = 10000, offset = 0) => dispatch => {
    _fetchEventsPointShortAsync(limit, offset, dispatch);
};

const _fetchEventsPointShortAsync = async (limit, offset, dispatch) => {
    await postData('https://ismggt.ru/query/events/last/short', {
        limit: limit,
        offset: offset
    })
        .then((eventsShort) => {
            dispatch(fetchEventsOfObjsForAuthUser(eventsShort));
        })
        .catch(error => dispatch(setErrorFetchObjOfAuthUser(error.message)))
}


// // 310421 from Dashboard page
// export const fetchObjByIdAsync = (objId = 9748) => dispatch => {
//     console.log('1212v fetchObjByIdAsync',objId)
//     _fetchObjById(objId, dispatch);
// };
//
// const _fetchObjById = async (objId, dispatch) => {
//     await postData('https://ismggt.ru/query/object/data', {
//         objID: objId,
//     })
//         .then((objData) => {
//             dispatch(fetchLocalDataOfObjsForAuthUser(objData));
//         })
//         .catch(error => dispatch(setErrorFetchObjOfAuthUser('нет данных для объекта. Ошибка:', error.message)))
// }


// 020621 from Dashboard page
export const fetchObjByIdToObjsDataAsync = (objId ) => dispatch => {
    // console.log('1255v fetchObjByIdToObjsDataAsync',objId)
    _fetchObjByIdToObjsData(objId, dispatch);
};

const _fetchObjByIdToObjsData = async (objId, dispatch) => {
    await postData('https://ismggt.ru/query/object/data', {
        objID: objId,
    })
        .then((objData) => {
            // console.log('1255v _fetchObjByIdToObjsData',objData.data)
            dispatch(fetchObjByIdToObjsData(objData.data));
        })
        .catch(error => dispatch(setErrorFetchObjOfAuthUser('нет данных для объекта. Ошибка:', error.message)))
}


export const setCurObjIdForConsentPageAsync = (objId) => dispatch => {
    return dispatch(setCurObjIdForConsentPage(objId));
};


