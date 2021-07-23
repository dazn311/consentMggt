import React from "react";
import {v4 as uuIdv4} from "uuid";

import ListItemText from "@material-ui/core/ListItemText";

import {useStyles} from "./eventStyles";
import ElemEventObj from "./ElemEventObj.jsx";

const MapElems = (props) => (props.eventsList.map((ev) => <ElemEventObj key={uuIdv4()} {...props} event={ev}/>))

const ListItemEvents = (props) => {
    const classes = useStyles()
    return (<ListItemText className={classes.listItemText} disableTypography secondary={<MapElems {...props}/>}/>);
};

export default ListItemEvents
