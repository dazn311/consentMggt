import React, {useCallback} from "react";
import stateObjsMobx from '../../../../../../store/consent/objsConsent/objsCons.mobx';

const ElemRel = ({obj, isActive = false}) => {

    const setIdObj = useCallback((objID, objName) => { stateObjsMobx.selectRelObj(objID, objName)  }, [])

    const styleObjLstItem = {
        paddingLeft: 4,
        borderBottom: '1px solid grey',
        maxWidth: 250,
        width: '-webkit-fill-available',
        color: isActive ? "#ffff008c" : 'darkgoldenrod',
        backgroundColor: isActive ? "4B3E3F" : '#403E3F',
        // transform: isActive ? "scale(1.1)" : 'scale(1)'
    };
    return (
            <div style={{display: 'flex', cursor: 'pointer'}}  onClick={  () =>  setIdObj(obj.obj_rel_id, obj.obj_rel_name) }  >
                <div style={{width: 4, backgroundColor: '#92927252'}} />
                <div style={styleObjLstItem} >&nbsp;{obj.obj_rel_name} </div>
            </div>
    )
}

export default ElemRel