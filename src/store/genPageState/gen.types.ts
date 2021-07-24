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

export interface SelectStateTransformData {
    caption: string;
    desc: number;
}
export interface SelectStateTransform {
    title: string,
    data: SelectStateTransformData[] //{caption: 'Всего объектов наших', desc: data.total_mggt_objects}
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
    payload: SelectStateTransform[];
}

export type IAction = IActionError | IActionSuccess | IActionData


export interface dataFromServer {
    daily_messages: number, // 1138
    daily_recs: number, // 220
    daily_sogl_recs: number, // 242
    total_messages: number, // 139567
    total_mggt_objects: number, // 8808
    total_objects: number, //  20550
    total_recs: number, //  28557
    total_rel_objects: number, // 11742
    total_sogl_objects: number, //  4238
    total_sogl_recs: number, // 25126
    total_users: number, // 829
}

export default FetchDataGenPage;
  