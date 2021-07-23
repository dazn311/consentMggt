export const FetchDataGenPage = {
    FETCH_ALL_DATA_FOR_GEN_PAGE: 'FETCH_ALL_DATA_FOR_GEN_PAGE', //from GenPage
    ERROR_FETCH_ALL_DATA_FOR_GEN_PAGE: 'ERROR_FETCH_ALL_DATA_FOR_GEN_PAGE', //from GenPage
    SUCCESS_FETCH_ALL_DATA_FOR_GEN_PAGE: 'SUCCESS_FETCH_ALL_DATA_FOR_GEN_PAGE', //from GenPage
};

export enum ActionTypesGenPage {
    error = 'ERROR_FETCH_ALL_DATA_FOR_GEN_PAGE',
    success = 'SUCCESS_FETCH_ALL_DATA_FOR_GEN_PAGE',
    genStates = 'FETCH_ALL_DATA_FOR_GEN_PAGE'
}

interface IActionError {
    type: ActionTypesGenPage.error;
    payload: string | null;
}

interface IActionSuccess {
    type: ActionTypesGenPage.success;
    payload: boolean;
}
export interface SelectState {
    daily_messages: number;
    daily_recs: number;
    daily_sogl_recs: number;
    total_messages: number;
    total_mggt_objects: number;
    total_objects: number;
    total_recs: number;
    total_rel_objects: number;
    total_sogl_objects: number;
    total_sogl_recs: number;
    total_users: number;
}

export interface IActionData {
    type: ActionTypesGenPage.genStates;
    payload: SelectState;
}

export type IAction = IActionError | IActionSuccess | IActionData

export default FetchDataGenPage;
  