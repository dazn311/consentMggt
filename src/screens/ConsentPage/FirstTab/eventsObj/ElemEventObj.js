import React, { useEffect, useState } from "react";
import { Tooltip } from "@material-ui/core";

import { useStyles } from "./ElemObj";

const ElemEventObj = ({ activeObjAndRelSelector, event = [] }) => {
  const classes = useStyles();

  //   if (!activeObjAndRelSelector) {
  //     return <div>dfdf</div>;
  //   }

  const showDetail = () => {
    // console.log('show idxS activeObjInx', idxS, activeObjInx)
    // console.log('show objStatus')
  };
  const setIdOfActiveObj = () => {
    // console.log('show idxS activeObjInx', idxS, activeObjInx)
    // console.log('show objStatus')
  };
  // console.log('event',event.operators.username)
  //   const objStatus2 = () => {
  //     if (
  //       activeObjAndRelSelector[0].id === event.sender.userID &&
  //       event.receip.userID === event.sender.userID
  //     ) {
  //       return "#ff000073";
  //     } else if (activeObjAndRelSelector[0].id === event.sender.objectID) {
  //       return "darkblue";
  //     } else {
  //       return "#ff9800";
  //     }
  //   };

  //   const txtConvert = (txt) => {
  //     if (txt.includes("Дирекция")) {
  //       return txt.replace(/Дирекция/i, "Дир. ");
  //     } else if (txt.includes("Мосгоргеотрест")) {
  //       return txt.replace(/Мосгоргеотрест/i, "МГГТ");
  //     } else if (txt.includes("Жилищник района")) {
  //       return txt.replace(/Жилищник района/i, "Жил. р-на");
  //     }
  //     return txt;
  //   };
  //   const senderOrgName = () => {
  //     // console.log('show idxS activeObjInx', idxS, activeObjInx)
  //     // console.log('show objStatus')
  //     if (event.sender.objectID === activeObjAndRelSelector[0].id) {
  //       return txtConvert(event.receip.orgname);
  //     } else if (event.receip.objectID === activeObjAndRelSelector[0].id) {
  //       return (
  //         event.sender.orgname &&
  //         event.sender.orgname.includes("Мосгоргеотрест") &&
  //         "  (МГГТ)"
  //       );
  //     }
  //   };

  // console.log('event',event)

  return (
    <div
      style={{ display: "flex" }}
      onClick={() => {
        setIdOfActiveObj("obj.objID");
        // setIdOfActiveObj(idxS)
      }}
      // onMouseOut={hideDetail}
      onMouseOver={showDetail}>
      <div style={{ width: 4, backgroundColor: "" }}></div>
      <div
        style={{
          // color: objID === activeObjId ? 'yellow' : '',
          paddingLeft: 4,
          paddingTop: 4,
          borderBottom: "1px solid grey",
          maxWidth: 350,
          width: "-webkit-fill-available",
          backgroundColor: "colorS", //objIdS === activeObjId ? '#ffff0014' : '', //color //objStatus === 'согласован' && 'green'
        }}>
        <div>
          {" "}
          <span
            style={{
              color: 5 === event.rec_status ? "greenyellow" : "whitesmoke",
            }}>
            {" "}
            {5 === event.rec_status ? " √ " : " - "}
          </span>{" "}
          {event.rec_name}
        </div>
        <div style={{ color: "burlywood" }}>
          {event.sender.username && event.sender.username}
          {/*{event.sender.orgname && (event.sender.orgname.includes('Мосгоргеотрест')) && '  (МГГТ)'}*/}
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//     activeObjAndRelSelector: activeObjAndRelSelector,
// });

export default ElemEventObj;
