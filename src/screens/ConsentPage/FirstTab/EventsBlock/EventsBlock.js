import React from "react";

import { observer } from "mobx-react";
import stateObjsMobx from "../../../../store/consent/objsConsent/objsCons.mobx";

import EventsListPanel from "./EventsListPanel";
import InfoPanel from "./eventComponents/InfoPanel.eventsObj.js";
import FilterBnt from "./eventComponents/FilterBnt.eventsObj.js";
import LoaderList from "../OrgBlockInfo/components/LoaderList";

const EventsBlock = observer(({visibleBtn}) => {

  if (stateObjsMobx.eventState.amount < 1) {
    return <LoaderList title={'загрузка событий...'}/>
  }

  let selEvnId =  (id) => {
      stateObjsMobx.eventState.selectedRecId = id
  }

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


//   let selEvnId = React.useCallback((id) => {
//     stateObjsMobx.eventState.selectedRecId = id
// },[stateObjsMobx])

// const eventProps = {selEvnId,activeId: stateObjsMobx.eventState.selectedRecId, eventsList: stateObjsMobx.filterEvents.evnData.recs}

// console.log('stateObjsMobx.selectedEvent.recId',stateObjsMobx.selectedEvent.recId)