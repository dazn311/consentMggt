import React, {useCallback} from "react";
import stateObjsMobx from '../../../../../../store/consent/objsConsent/objsCons.mobx';

const ElemObj = ({obj, isActive}) => {
    const setIdObj = useCallback((objID, objName) => {
        stateObjsMobx.selectObj(objID, objName)
    }, [])
    
    const styleObjLstItem = {
        paddingLeft: 4,
        borderBottom: '1px solid grey',
        maxWidth: 250,
        minWidth: 220,
        width: '-webkit-fill-available',
        color: isActive ? "#ffff008c" : 'darkgoldenrod',
        backgroundColor: isActive ? "4B3E3F" : '#403E3F',
        // transform: isActive ? "scale(1.1)" : 'scale(1)'
    };
    return (
            <div style={{display: 'flex', cursor: 'pointer'}} onClick={() => setIdObj(obj.objID, obj.objName)}  >
                <div style={{width: 4, backgroundColor: '#92927252'}}></div>
                <div style={styleObjLstItem} >&nbsp;{obj.objName } </div>
            </div>
    )
}

export default ElemObj