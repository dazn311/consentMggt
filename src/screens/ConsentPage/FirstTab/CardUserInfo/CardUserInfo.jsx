import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import {CircularProgress, Slide} from "@material-ui/core";

import {listObjs} from "./cardUserComponents/listObjs";
import {useStyles} from "./cardUserComponents/ElemObj";
import ListItemRel from "./cardUserComponents/relatives";

import {
    curObjIdSelector,
    dataOfObjsForListSelector,
    fullDataOfActiveObForMapForRelativesSelector,
    objsDataSelector
} from '../../../../store/consent/cons.selectors';
import {
    fetchObjByIdToObjsDataAsync,
    setActiveObjOfAuthUserAsync,
    setCurObjIdForConsentPageAsync
} from '../../../../store/consent/cons.actions';
import {relObjsList} from "../../../../api/relObj-api";
import OrgCardConsent from "./OrgCard/OrgCardConsent";
import ObjsCard from "./ObjsCard/ObjsCard";


const loaderForList = (title) => {
    return (<div style={{display: 'flex', alignSelf: 'center', paddingRight: 8}}>
        <div>{title}</div>
        <CircularProgress/>
    </div>)
}

////////////////////////////////////
const CardUserInfo = ({
                          userOfAuthData,
                          setCurObjIdForConsentPage,
                          dataOfObjsForList,
                          fetchObjByIdToObjsData,
                          setActiveObjAndRel
                      }) => {
    const [objectsOfCurOrg, setObjsOfCurOrg] = useState(loaderForList(' Загрузка списка объектов..'));
    const classes = useStyles();

    // console.log('userOfAuthData',userOfAuthData);

////////////////////////////////////

    const setIdOfActiveObj = useCallback((objId) => {
        fetchObjByIdToObjsData(objId)
        setCurObjIdForConsentPage(objId)

        let nameObj = dataOfObjsForList[0].objName
        let idRel = dataOfObjsForList[0].objRelatives[0] | dataOfObjsForList[0].objRelatives[1]
        setActiveObjAndRel([{id: objId, objName: nameObj}, {id: idRel, relName: ''}])
    }, [dataOfObjsForList, fetchObjByIdToObjsData, setActiveObjAndRel, setCurObjIdForConsentPage])

    const updateObjsList = useCallback((objID) => {
        if (dataOfObjsForList) {
            setObjsOfCurOrg(listObjs(dataOfObjsForList, objID, setIdOfActiveObj))
        }
    }, [dataOfObjsForList, setIdOfActiveObj])

    ////////////////////////////////////
    useEffect(() => {
        if (dataOfObjsForList) {
            updateObjsList(dataOfObjsForList[0].objID)
        }
    }, [dataOfObjsForList, updateObjsList])

    //040621
    useEffect(() => {
        if (dataOfObjsForList) {
            fetchObjByIdToObjsData(dataOfObjsForList[0].objID)
            setIdOfActiveObj(dataOfObjsForList[0].objID)
            if (dataOfObjsForList[0].objRelatives.length) {
                let relID = dataOfObjsForList[0].objRelatives[0].obj_rel_id
                if (!relID) {
                    relID = dataOfObjsForList[0].objRelatives[1].obj_rel_id
                }
                fetchObjByIdToObjsData(relID)

            }

        }
    }, [dataOfObjsForList, fetchObjByIdToObjsData, setIdOfActiveObj])

    if (!userOfAuthData) {
        return (<div>нет данных об организации</div>)
    }
////////////////////////////////////

    // console.log('155 objsData', objsData)
////////////////////////////////////
    return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <div>
                <List className={classes.root} >
                    <OrgCardConsent/>
                </List>
                <List className={classes.root}>
                    <ObjsCard length={dataOfObjsForList && dataOfObjsForList.length} objectsOfCurOrg={objectsOfCurOrg} />
                </List>
                <List className={classes.root}>
                    <ListItemRel/>

                </List>
            </div>
        </Slide>
    );
}
//
// const mapStateToProps = createStructuredSelector({
//     dataOfObjsForList: getListObjects(state), // события короткие данные для таблицы
//     // dataOfObjsForList: dataOfObjsForListSelector, // события короткие данные для таблицы
//     objsData: objsDataSelector, // события короткие данные для таблицы
//     fullDataOfActiveObForMapForRelatives: fullDataOfActiveObForMapForRelativesSelector, // события короткие данные для таблицы
//     curObjIdSel: curObjIdSelector, // события короткие данные для таблицы
// });

const mapStateToProps = (state, props) => {
    return {
        dataOfObjsForList: dataOfObjsForListSelector(state), // события короткие данные для таблицы
        // dataOfObjsForList: getListObjects(state), // события короткие данные для таблицы
        // dataOfObjsForList: dataOfObjsForListSelector(state), // события короткие данные для таблицы
        objsData: objsDataSelector(state), // события короткие данные для таблицы
        fullDataOfActiveObForMapForRelatives: fullDataOfActiveObForMapForRelativesSelector(state), // события короткие данные для таблицы
        curObjIdSel: curObjIdSelector(state), // события короткие данные для таблицы
    };
};


const mapDispatchToProps = (dispatch) => ({
    fetchObjByIdToObjsData: (objId) => dispatch(fetchObjByIdToObjsDataAsync(objId)),
    setIdOfActiveObjOfAuthUser: (obj) => dispatch(setActiveObjOfAuthUserAsync(obj)),
    setCurObjIdForConsentPage: (objId) => dispatch(setCurObjIdForConsentPageAsync(objId)),
    setActiveRelId: (objId) => dispatch(relObjsList.setActiveRelIdAsync(objId)),
    setActiveObjAndRel: (objData) => dispatch(relObjsList.setActiveObjAndRelAsync(objData)),
});
// export default CardUserInfo;
export default connect(mapStateToProps, mapDispatchToProps)(CardUserInfo);
