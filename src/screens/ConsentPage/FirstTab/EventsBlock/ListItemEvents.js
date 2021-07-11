import React from "react";
import { v4 as uuIdv4 } from "uuid";

import ListItemText from "@material-ui/core/ListItemText";

import ElemEventObj from "./ElemEventObj";

const ListItemEvents = ({ selEvnId, activeId, eventsList, visibleList = true }) => {
  // console.log("eventsList", eventsList);
  return (
    <ListItemText disableTypography style={{ maxHeight: 420, overflow: visibleList ? "auto" : "auto", maxWidth: visibleList ? 420 : 0,
        transition: "all 0.5s ease-out",
        border: '1px solid darkslategrey'
      }} secondary={  eventsList.map((ev) => <ElemEventObj key={uuIdv4()} selEvnId={selEvnId} activeId={activeId} event={ev} /> ) } />
  );
};

export default ListItemEvents
