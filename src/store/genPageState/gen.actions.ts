import  { ActionTypesGenPage, SelectState, IActionData } from './gen.types';
import memoize from 'lodash/memoize'
import {Dispatch} from "redux";

type errorMessageTypes = string
type genDataTypes = SelectState

export const setErrorFetchGenPage = (errorMessage: errorMessageTypes) => ({
    type: ActionTypesGenPage.error,
    payload: errorMessage
});

///////////////////////////////////////////////////////////////////

export const setGenStatsPage = (items: genDataTypes): IActionData => ({
  type: ActionTypesGenPage.genStates,
  payload: items
});

///////////////////////////////////////////////////////////////////
const rootURL = 'https://ismggt.ru';

async function postData(url = '', data = {}):Promise<SelectState> {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

//////////Gen Page ///////////

export const setMessageError = (mess: errorMessageTypes) => {
  return (dispatch: Dispatch) => {
     dispatch(setErrorFetchGenPage(mess));
  };
};

//220721 GenDashboard page

export const fetchGenStatsAsync = () => {
    return async (dispatch: Dispatch) => {
        try {
            const data = await postData(rootURL + '/query/stats/daily', {})
            dispatch(setGenStatsPage(data))
        }catch (e){
            dispatch(setErrorFetchGenPage(e.message));
        }

    }
}
