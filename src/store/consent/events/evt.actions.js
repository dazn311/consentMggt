import {eventsObj} from './evt.types';

export const setCurrentEventOfObj = eventId => ({
    type: eventsObj.SET_CURRENT_EVENT,
    payload: eventId
});

export const setCurrentEventOfObjAsync = (eventId) => dispatch => {
    dispatch(setCurrentEventOfObj(eventId))
};

