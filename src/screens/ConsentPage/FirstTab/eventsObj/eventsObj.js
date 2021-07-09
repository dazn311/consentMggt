import React from "react";

import { observer } from "mobx-react";
import stateObjsMobx from "../../../../store/consent/objsConsent/objsCons.mobx";

// import SendIcon from '@material-ui/icons/Send';

import EventsListPanel from "./EventsListPanel";
import InfoPanel from "./eventComponents/InfoPanel.eventsObj.js";
import FilterBnt from "./eventComponents/FilterBnt.eventsObj.js";

const EventsObj = observer(({visableBtn}) => {

  if (stateObjsMobx.objectsEvn.amount < 1) {
    return <div>Нет событий.</div>;
  }

  let selEvnId = (id) => {
      stateObjsMobx.selectedEvent.recId = id
  }

    // console.log('stateObjsMobx.selectedEvent.recId',stateObjsMobx.selectedEvent.recId)
  return (
    <div className="events-obj-f">
      <EventsListPanel selEvnId={selEvnId} activeId={stateObjsMobx.selectedEvent.recId} eventsList={stateObjsMobx.filterEvents.data.recs} />

      <div style={{ marginLeft: 74, position: "relative", opacity: visableBtn ? 1: 0 }}>
        <FilterBnt setFilterType={stateObjsMobx.setFilterEvents.bind(stateObjsMobx)}
        eventsFilterID={stateObjsMobx.filterTypeEvents}
        // setEvFilter={setEvFilter}
        />

        <InfoPanel />

      </div>
    </div>
  );

});

export default EventsObj;
