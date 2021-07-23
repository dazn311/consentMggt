import React from "react";
import { useStyles } from "./eventStyles";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ListItemText from "@material-ui/core/ListItemText";

import ListItemEvents from "./ListItemEvents";

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
              <div className={classes.CaptionStyles} >События</div>
            </div>
          </Avatar>
        </ListItemAvatar>
        <ListItemEvents  selEvnId={selEvnId} activeId={activeId} eventsList={eventsList}  />
      </ListItem>
    </>
  );
};

export default EventsListPanel

