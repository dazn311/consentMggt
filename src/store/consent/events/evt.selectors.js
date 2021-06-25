import { createSelector } from 'reselect';

const eventsSelector = state => state.evtRed;

///////////// FOR OBJ Card Details page//////////////
export const currentEventObjSelector = createSelector(
  [eventsSelector],
    evtRed => evtRed.currentEventObj
);

