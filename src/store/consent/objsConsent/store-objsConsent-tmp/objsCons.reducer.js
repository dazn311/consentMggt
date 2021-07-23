import produce from "immer";
import {objectsFetch, objectsData} from './objsCons.types';


const INITIAL_STATE = {
    startFetch: false,
    successFetch: false,
    errorFetch: false,
    objectsData: {},
    relativesData: {},
    curObjId: null, // выделенный объект - выбранный пользователем /consent page 270521
    activeRelId: null, // выделенный объект - выбранный пользователем /consent page 270521
    selectedObjAndRel: {obj:{id: 0, objName: ''},rel:{id: 1, relName: ''}},
};

const objsConsReducer = (state = INITIAL_STATE, action) => {
    return produce(state, draft => {
    switch (action.type) {
        case objectsFetch.START_FETCH_OF_OBJS:
            draft.startFetch = true
            draft.successFetch = false
            draft.errorFetch = false
            return
        case objectsFetch.SUCCESS_FETCH_OF_OBJS:
            draft.startFetch = false
            draft.successFetch = true
            draft.errorFetch = false
            draft.objectsData = action.payload
            return
        case objectsFetch.ERROR_FETCH_OF_OBJS:
            draft.startFetch = false
            draft.successFetch = false
            draft.errorFetch = true
            return
        case objectsData.SELECTED_OBJECT:
            draft.selectedObjAndRel["obj"] = action.payload
            return
        case objectsData.SELECTED_REL_OBJECT:
            draft.selectedObjAndRel["rel"] = action.payload
            return
        default:
            return state;
    }
    })
};

export default objsConsReducer;
