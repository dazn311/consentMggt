import {  eventsObj} from './evt.types';

const INITIAL_STATE = {
    currentEventObj: null, // FOR MAP & Chat PAGE TAB1 160621
};

const eventsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case eventsObj.SET_CURRENT_EVENT: // FOR MAP & Chat PAGE TAB1 160621
            return {
                ...state,
                currentEventObj: action.payload
            };
        default:
            return state;
    }
};

export default eventsReducer;