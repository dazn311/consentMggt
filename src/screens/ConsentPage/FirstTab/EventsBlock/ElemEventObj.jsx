import React  from "react";
import PropTypes from 'prop-types';
// import {Tooltip} from "@material-ui/core";

import {useStyles} from "./eventStyles";

const ElemEventObj = ({selEvnId, activeId = false, event = {rec_id: 0, rec_status: 0}}) =>  {
    const classes = useStyles()
    return (
        <div className={classes.elemEventObjWrap} onClick={() => { selEvnId(event.rec_id) }} >
            <div className={classes.elemEventObjFirstElem} style={{width: 4, backgroundColor: ""}} />
            <div className={classes.elemEventObjSecondElem} style={{ backgroundColor: event.rec_id === activeId ? '#ffff0014' : '' }}>
                <div>{" "}<span style={{color: 5 === event.rec_status ? "greenyellow" : "whitesmoke"}}>{" "}{5 === event.rec_status ? " √ " : " - "} </span>{" "}{event.rec_name} </div>
                <div style={{color: "burlywood"}}>{event.sender.username && event.sender.username}</div>
            </div>
        </div>
    )
}

ElemEventObj.propTypes = {
    activeId: PropTypes.bool.isRequired,
    selEvnId: PropTypes.func,
    event: PropTypes.object.isRequired
}

export default ElemEventObj;

// const classes = useStyles();

// const showDetail = () => {
// console.log('show idxS activeObjInx', idxS, activeObjInx)
// console.log('show objStatus')
// };

// console.log('event', window.toJS(event) )


// console.log('event',event.operators.username)

// setIdOfActiveObj("obj.objID");
// setIdOfActiveObj(idxS)
// onMouseOut={hideDetail}
//  onMouseOver={showDetail}


// const setIdOfActiveObj = () => {
// console.log('show idxS activeObjInx', idxS, activeObjInx)
// console.log('show objStatus')
// };


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

