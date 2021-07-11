import React from "react";
import { useStyles } from "./eventStyles";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ListItemText from "@material-ui/core/ListItemText";

import ListItemEvents from "./ListItemEvents";

const CaptionStyles = {
  marginLeft: 4,
  borderLeft: "1px solid grey",
  paddingLeft: 4,
  color: "darkgrey",
  transform: "rotate(-90deg)",
  position: "absolute",
  left: 8,
  top: 20,
  fontSize: "initial",
};

const EventsListPanel = ({ selEvnId, activeId, eventsList = [] }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem  style={{ minHeight: 420, minWidth: 380, marginTop: 20 }}>
        <ListItemAvatar>
          <Avatar className={classes.MuiAvatarRoot}>
            <div>
              <ListItemText className={classes.ListItemTextRelObjs} secondary={eventsList && eventsList.length} />
              <HomeWorkIcon />
              <div style={CaptionStyles}>События</div>
            </div>
          </Avatar>
        </ListItemAvatar>

        <ListItemEvents  selEvnId={selEvnId} activeId={activeId} eventsList={eventsList} visibleList={true} />
      </ListItem>
    </>
  );
};

export default EventsListPanel
