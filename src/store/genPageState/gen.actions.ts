import {Dispatch} from "redux";

import  { ActionTypesGenPage, IAction, SelectStateTransform } from './gen.types';
import {postData} from "./gen.api";
import refData from "./services";
// import memoize from 'lodash/memoize'

type errorMessageTypes = string
type genDataTypes = SelectStateTransform[]

export const setErrorFetchGenPage = (errorMessage: errorMessageTypes):IAction => ({
    type: ActionTypesGenPage.error, payload: errorMessage
});

export const setGenStatsPage = (items: genDataTypes): IAction => ({
  type: ActionTypesGenPage.genStates, payload: items
});

///////////////////////////////////////////////////////////////////

export const setMessageError = (mess: errorMessageTypes) => {
  return (dispatch: Dispatch) => { dispatch(setErrorFetchGenPage(mess)) };
};

//220721 GenDashboard page
export const fetchGenStatsAsync = () => {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const data = await postData('/query/stats/daily', {})
            const reData = refData(data)
            console.log('fetchGenStatsAsync',reData)
            dispatch(setGenStatsPage(reData))
        }catch (e){ dispatch(setErrorFetchGenPage(e.message)) }
    }
}
