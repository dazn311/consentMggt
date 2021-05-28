import {objsData, userFetch} from './cons.types';
import memoize from "lodash/_memoizeCapped";

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
  _fetchAuthUserAsync(dispatch,userID);
};
const _fetchAuthUserAsync = memoize(async (dispatch,userID) => {
  postData('https://ismggt.ru/query/user/info', {'userID':userID})
      .then((data) => {
        dispatch(fetchAuthUser(data[0]));
      })
      .catch(error => dispatch(setErrorFetchAuthUser(error.message)));
});

export const fetchOrgOfAuthUserAsync = (userID) => dispatch => {
  _fetchOrgOfAuthUserAsync(dispatch,userID);
};
const _fetchOrgOfAuthUserAsync = memoize(async (dispatch,userID) => {
  postData('https://ismggt.ru/query/user/info', {'userID':userID})
      .then((data) => {
        dispatch(fetchOrgOfAuthUser(data[0]));
      })
      .catch(error => dispatch(setErrorFetchAuthUser(error.message)));
});


export const fetchObjsOfAuthUserAsync = (orgName) => dispatch => {
  _fetchObjsOfAuthUserAsync(dispatch,orgName);
};
const _fetchObjsOfAuthUserAsync = memoize(async (dispatch,orgName) => {
  const endDate = new Date().toISOString();
  // console.log('_fetchObjsOfAuthUserAsync -- orgName',orgName)
  postData('https://ismggt.ru/query/objects/list', {
    "objectType":2, "organization":0, "limit":10, "offset":0, "startDate":"2021-01-01T10:00:00.000Z",
    "endDate": endDate, "objName":"", "orgName": orgName,  "objKind":"" , "objStatus":10,
    "sortCol":"date" , "sortType":"desc"
  })
      .then((data) => {
        dispatch(fetchObjsOfAuthUser(data));
      })
      .catch(error => dispatch(setErrorFetchAuthUser(error.message)));
});


export const setActiveObjOfAuthUserAsync = (objName) => dispatch => {
  console.log('setActiveObjOfAuthUserAsync -- objName',objName)
  _setActiveObjOfAuthUserAsync(dispatch,objName);//.then( val => console.log('_setActiveObjOfAuthUserAsync -- val',val));
};
const _setActiveObjOfAuthUserAsync = async (dispatch,objName) => {
        dispatch(setActiveObjOfAuthUser(objName));
};

export const updateSmeObjsOfAuthUserAsync = (objName, objId) => dispatch => {
  // console.log('objName, objId',objName, objId)
  // _updateSmeObjsOfAuthUserAsync(dispatch, {objName, objId});//.then( val => console.log('8989_updateSmeObjsOfAuthUserAsync -- objName, objId : ',val));
  return  dispatch(updateSmeObjsOfAuthUser({objName, objId}));
};

// const _updateSmeObjsOfAuthUserAsync = async (dispatch,data) => {
//         dispatch(updateSmeObjsOfAuthUser(data));
// };




