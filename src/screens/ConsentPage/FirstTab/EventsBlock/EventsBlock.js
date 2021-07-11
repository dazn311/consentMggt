import React from "react";

import { observer } from "mobx-react";
import stateObjsMobx from "../../../../store/consent/objsConsent/objsCons.mobx";

import EventsListPanel from "./EventsListPanel";
import InfoPanel from "./eventComponents/InfoPanel.eventsObj.js";
import FilterBnt from "./eventComponents/FilterBnt.eventsObj.js";

const EventsBlock = observer(({visibleBtn}) => {

  if (stateObjsMobx.eventState.amount < 1) {
    return <div>Нет событий.</div>;
  }

  let selEvnId = (id) => {
      stateObjsMobx.eventState.selectedRecId = id
  }

    // console.log('stateObjsMobx.selectedEvent.recId',stateObjsMobx.selectedEvent.recId)
  return (
    <div className="events-obj-f">

      <EventsListPanel selEvnId={selEvnId} activeId={stateObjsMobx.eventState.selectedRecId} eventsList={stateObjsMobx.filterEvents.evnData.recs} />

      <div style={{ marginLeft: 74, position: "relative", opacity: visibleBtn ? 1: 0 }}>
        <FilterBnt setFilterType={stateObjsMobx.setFilterEvents.bind(stateObjsMobx)}
        eventsFilterID={stateObjsMobx.filterTypeEvents}
        // setEvFilter={setEvFilter}
        />

        <InfoPanel />

      </div>
    </div>
  );

});

export default EventsBlock;
