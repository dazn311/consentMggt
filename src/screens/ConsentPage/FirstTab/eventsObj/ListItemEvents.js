import React from "react";
import { v4 as uuIdv4 } from "uuid";

import ListItemText from "@material-ui/core/ListItemText";

import ElemEventObj from "./ElemEventObj";

const ListItemEvents = ({ eventsList, visibleList = true }) => {
  // console.log("eventsList", eventsList);
  return (
    <ListItemText style={{ maxHeight: 500, overflow: visibleList ? "auto" : "auto", maxWidth: visibleList ? 420 : 2,
        // , maxWidth : 420
        // , display: visibleList ? 'block' : 'none'
        transition: "all 0.5s ease-out",
      }}
      // primary="Сотытия объекта"
      secondary={
        // <EventsList  eventsList={eventsList} />}
        eventsList.map((ev) => { return <ElemEventObj key={uuIdv4()} event={ev} />  })
      }
    />

    // <div >
    //     {eventsList.length &&
    //     eventsList.map(ev => {
    //         return <ElemEventObj  event={ev} />
    //     })
    //     }
    // </div>
  );
};

export default ListItemEvents
