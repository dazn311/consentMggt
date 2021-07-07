import React from "react";
import { useStyles } from "./ElemObj";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ListItemText from "@material-ui/core/ListItemText";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
// import {createStructuredSelector} from "reselect";
// import {relListShortDataSelector} from "../../../../../../store/consent/cons.selectors";
// import {connect} from "react-redux";
// import ElemEventObj from "./ElemEventObj";
import ListItemEvents from "./ListItemEvents";
// import {eventsObjList} from "../../../../../../api/eventsObj-api";
// import {visibleEventsObjSelector} from "../../../../../../store/consent/cons.selectors";
// import {activeRelIdSelector, curObjIdSelector} from "../../../../../../store/consent/cons.selectors";

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

const EventsListPanel = ({ eventsList = [], switchVisibleLst, visibleList }) => {
  // const [visibleListS, setVisibleListS] = useState(true)
  const classes = useStyles();
  // const switchVisibleLst = () => {
  //     console.log('switch')
  //     eventsObjList.switchVisibleLst(visibleListS)
  //     // switchVisibleLst(true)
  //     setVisibleListS(prev => prev = !prev)
  // }

  return (
    <>
      <ListItem style={{ minHeight: 500, minWidth: 380 }}>
        <ListItemAvatar>
          <Avatar className={classes.MuiAvatarRoot}>
            <ListItemText className={classes.ListItemTextRelObjs} secondary={eventsList && eventsList.length} />
            <HomeWorkIcon />
            <div style={CaptionStyles}>События</div>
          </Avatar>
        </ListItemAvatar>
        <ListItemEvents eventsList={eventsList} visibleList={visibleList} />
      </ListItem>
    </>
  );
};

// const mapStateToProps = createStructuredSelector({
//     // curObjIdS: curObjIdSelector,
//     // activeRelIdS: activeRelIdSelector,
//     // relListShortDataS: relListShortDataSelector,
// });
//
//
// const mapDispatchToProps = (dispatch) => ({
//     // fetchObjByIdToObjsData: (objId) => dispatch(fetchObjByIdToObjsDataAsync(objId)),
// })

export default EventsListPanel;
// export default connect(mapStateToProps, mapDispatchToProps)(EventsListPanel);
