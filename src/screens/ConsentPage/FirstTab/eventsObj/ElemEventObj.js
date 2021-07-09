import React  from "react";
// import {Tooltip} from "@material-ui/core";

// import {useStyles} from "./eventStyles";

const ElemEventObj = ({selEvnId, activeId = false, event = {rec_id: 0, rec_status: 0}}) => {
    // const classes = useStyles();

    const showDetail = () => {
        // console.log('show idxS activeObjInx', idxS, activeObjInx)
        // console.log('show objStatus')
    };

    // console.log('event', window.toJS(event) )

    return (
        <div style={{display: "flex", cursor: 'pointer'}}
             onClick={() => {
                 selEvnId(event.rec_id)
                 // setIdOfActiveObj("obj.objID");
                 // setIdOfActiveObj(idxS)
             }}
            // onMouseOut={hideDetail}
             onMouseOver={showDetail}>

            <div style={{width: 4, backgroundColor: ""}} />
            <div style={{
                    // color: objID === activeObjId ? 'yellow' : '',
                    paddingLeft: 4, paddingTop: 4,  borderBottom: "1px solid grey",  maxWidth: 350, width: "-webkit-fill-available",
                    backgroundColor: event.rec_id === activeId ? '#ffff0014' : '', //color //objStatus === 'согласован' && 'green'
                }}>
                <div>
                    {" "}
                    <span style={{color: 5 === event.rec_status ? "greenyellow" : "whitesmoke"}}>
                    {" "}
                        {5 === event.rec_status ? " √ " : " - "}
                     </span>{" "}
                    {event.rec_name}
                </div>
                <div style={{color: "burlywood"}}>
                    {event.sender.username && event.sender.username}
                </div>
            </div>
        </div>
    );
};

export default ElemEventObj;


// console.log('event',event.operators.username)

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

