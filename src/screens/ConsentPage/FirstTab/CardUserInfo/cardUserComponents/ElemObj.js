import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import {Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import {relObjsList} from "../../../../../api/relObj-api";
import {createStructuredSelector} from "reselect";
import {activeObjAndRelSelector} from "../../../../../store/consent/cons.selectors";

export const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        border: '1px solid #8080802e',
        margin: window.innerWidth < 500 ? 0 : theme.spacing(1),
        padding: window.innerWidth < 500 ? 0 : theme.spacing(1),
    },
    span: {
        color: '#1976d2'
    },
    red: {
        color: 'red',

    },
    customWidth: {
        maxWidth: 500,
        backgroundColor: 'black'

    },
    burlywood: {backgroundColor: "burlywood"},
    purple: {
        color: theme.palette.purple //'#a4a5d8'
    },
    MuiAvatar: {
        root: {
            width: 40,
            height: 40,
            display: 'flex',
            overflow: 'unset',
            position: 'relative',
            fontSize: '1.25rem',
            alignItems: 'center',
            flexShrink: 0,
            fontFamily: ' "Roboto", "Helvetica", "Arial, sans-serif" ',
            lineHeight: 1,
            userSelect: 'none',
            borderRadius: '50%',
            justifyContent: 'center'
        }

    },
    MuiAvatarRoot: {
        width: 40,
        height: 40,
        display: 'flex',
        overflow: 'unset',
        position: 'relative',
        fontSize: '1.25rem',
        alignItems: 'center',
        flexShrink: 0,
        fontFamily: ' "Roboto", "Helvetica", "Arial, sans-serif" ',
        lineHeight: 1,
        userSelect: 'none',
        borderRadius: '50%',
        justifyContent: 'center'
    },
    ListItemTextRelObjs: {position: 'absolute', color: 'yellowgreen', bottom: -24},
    ListItemTextButtonOpen: {position: 'absolute', color: 'yellowgreen', bottom: 34},
}));

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

    }, [activeObjAndRelS])

    const showDetail = () => {
        // console.log('show idxS activeObjInx', idxS, activeObjInx)
        // console.log('show objStatus')
    }

    const setActiveObjAndRelHendler = (objID, objName) => {
        setActiveObjAndRel([{id: objID, objName: objName},{id: 1, relName: ''}])
    }

    const objStatus2 = () => {
        if (objStatus === 'в работе') { return 'darkblue'
        } else if (objStatus === 'согласован') {return 'green'
        } else if (objStatus === 'нет событий') {return 'grey' }
    }

    // console.log('4343 obj',obj)
    return (<Tooltip title={longText} classes={{tooltip: classes.customWidth}}>
        <div style={{display: 'flex'}}
             onClick={() => {
                 setIdOfActiveObj(obj.objID)
                 setActiveObjAndRelHendler(obj.objID, obj.objName)
                 // setIdOfActiveObj(idxS)
             }}
            // onMouseOut={hideDetail}
             onMouseOver={showDetail}
        >
            <div style={{width: 4, backgroundColor: objStatus2()}}></div>
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

const mapStateToProps = createStructuredSelector({

    activeObjAndRelS: activeObjAndRelSelector, // данные для карты выделенного смежного объекта
});

const mapDispatchToProps = (dispatch) => ({
    setActiveObjAndRel: (objData) => dispatch(relObjsList.setActiveObjAndRelAsync(objData)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ElemObj);