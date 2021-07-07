import React, {useCallback, useEffect, useState} from "react";
// import {connect} from "react-redux";

import {Tooltip} from "@material-ui/core";
// import {makeStyles} from "@material-ui/core/styles";

// import {relObjsList} from "../../../../../api/relObj-api";
// import {createStructuredSelector} from "reselect";
// import {activeObjAndRelSelector} from "../../../../../store/consent/cons.selectors";

import {useStyles} from "./eventStyles";

const objStatus3 = (objStatus) => {
    if (objStatus === 2) { return 'в работе'
    } else if (objStatus === 5) { return 'согласован'
    } else if (objStatus === 1) {return 'добавлен в DB' }
}

const ElemObj = ({ obj,  setIdOfActiveObj,    setActiveObjAndRel, activeObjAndRelS}) => {
    const [objIdS] = useState(obj.objID)
    const [colorS, setColorS] = useState(null)
    const [objStatus] = useState(objStatus3(obj.objStatus))
    const [longText] = useState(`Статус: ${objStatus}. Событий: ${obj.objRecsAmount} (${obj.objType})`)

    const classes = useStyles();

    // console.log('setActiveObjAndRel',setActiveObjAndRel)
    useEffect(() => {
        if (activeObjAndRelS && activeObjAndRelS[0].id === objIdS) {setColorS('grey')
        } else {setColorS(null)}

    }, [activeObjAndRelS, objIdS])

    // const showDetail = () => {
    //     // console.log('show idxS activeObjInx', idxS, activeObjInx)
    //     // console.log('show objStatus')
    // }

    const setActiveObjAndRelHandler = useCallback((objID, objName) => {
        setActiveObjAndRel([{id: objID, objName: objName},{id: 1, relName: ''}])
    },[setActiveObjAndRel])

    const objStatus2 = useCallback(() => {
        if (objStatus === 'в работе') { return 'darkblue'
        } else if (objStatus === 'согласован') {return 'green'
        } else if (objStatus === 'нет событий') {return 'grey' }
    },[objStatus])

    // console.log('4343 obj',obj)
    return (<Tooltip title={longText} classes={{tooltip: classes.customWidth}}>
        <div style={{display: 'flex'}}
             onClick={() => {
                 setIdOfActiveObj(obj.objID)
                 setActiveObjAndRelHandler(obj.objID, obj.objName)
                 // setIdOfActiveObj(idxS)
             }}
            // onMouseOut={hideDetail}
            //  onMouseOver={showDetail}
        >
            <div style={{width: 4,color: 'transparent', backgroundColor: objStatus2()}} />
            <div
                style={{
                    // color: objID === activeObjId ? 'yellow' : '',
                    paddingLeft: 4,
                    borderBottom: '1px solid grey',
                    maxWidth: 250,
                    width: '-webkit-fill-available',
                    backgroundColor: colorS //objIdS === activeObjId ? '#ffff0014' : '', //color //objStatus === 'согласован' && 'green'
                }}
            >&nbsp;{obj.objName}
            </div>
        </div>
    </Tooltip>)
}

// const mapStateToProps = createStructuredSelector({
//     activeObjAndRelS: activeObjAndRelSelector, // данные для карты выделенного смежного объекта
// });

// const mapDispatchToProps = (dispatch) => ({
//     setActiveObjAndRel: (objData) => dispatch(relObjsList.setActiveObjAndRelAsync(objData)),
// });

export default  ElemObj