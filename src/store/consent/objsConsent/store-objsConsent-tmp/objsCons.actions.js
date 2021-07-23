import {objectsData, objectsFetch} from './objsCons.types';

export const startFetchObjects = (objId) => ({
    type: objectsFetch.START_FETCH_OF_OBJS,
    payload: objId
});

export const errorFetchObjects = (error) => ({
    type: objectsFetch.ERROR_FETCH_OF_OBJS,
    payload: error
});

export const successFetchObjects = (objs) => ({
    type: objectsFetch.SUCCESS_FETCH_OF_OBJS,
    payload: objs
});

export const selectedObjects = (objs) => ({
    type: objectsData.SELECTED_OBJECT,
    payload: objs
});

export const selectedRelative = (objs) => ({
    type: objectsData.SELECTED_REL_OBJECT,
    payload: objs
});

/////////////////////////





