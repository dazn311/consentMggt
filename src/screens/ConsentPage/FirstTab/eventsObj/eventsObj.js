import React, { useCallback, useState } from "react";
import { observer } from "mobx-react";

import stateObjsMobx from "../../../../store/consent/objsConsent/objsCons.mobx";

// import SendIcon from '@material-ui/icons/Send';

import EventsListPanel from "./EventsListPanel";
import InfoPanel from "./eventComponents/InfoPanel.eventsObj.js";
import FilterBnt from "./eventComponents/FilterBnt.eventsObj.js";

const filterLst = () => {};

const EventsObj = observer(({visableBtn}) => {
  const [eventsList, setEventsList] = useState([]);
  const [eventsFilterID, setEventsFilterID] = useState(0);
  const [filterEvnLst, setFilterEvnLst] = useState([]);
  const [visibleListS, setVisibleListS] = useState(true);

  const setEvFilter = useCallback((evt) => {
    setEventsFilterID(evt);
  }, []);

  if (stateObjsMobx.objectsEvn.amount < 1) {
    return <div>Нет событий.</div>;
  }
  // if (stateObjsMobx.filterEvents.amount < 10) {
  //   return <div>Событий {stateObjsMobx.filterEvents.amount}</div>;
  // }
  return (
    <div className="EventsListPanel">
      <EventsListPanel eventsList={stateObjsMobx.filterEvents.data.recs} />
      <div style={{ marginLeft: 74, position: "relative", opacity: visableBtn ? 1: 0 }}>
        <FilterBnt setFilterType={stateObjsMobx.setFilterEvents.bind(stateObjsMobx)}
        // eventsFilterID={eventsFilterID}
        // setEvFilter={setEvFilter}

        />
        <InfoPanel />
      </div>
    </div>
  );
});

export default EventsObj;
