import produce from "immer";
import {userFetch, objsData, objsFetch, relObjs, eventsObj} from './cons.types';

//
// const initionalDateEnd = () => {
//   let newDate = new Date();//.toISOString().split('T')[0];
//   return newDate.toISOString().split('T')[0];
// }

const INITIAL_STATE = {
    errorFetchUserData: null, // FOR OBJS PAGE TAB1 210521
    errorFetchObjData: null, // FOR OBJS PAGE TAB1 210521
    userOfAuthData: null, // FOR OBJS PAGE TAB1 210521
    orgDataOfAuthUser: null, // FOR OBJS PAGE TAB1 210521
    objsDataOfAuthUser: null, // FOR OBJS PAGE TAB1 210521
    dataOfObjsForList: null, // FOR OBJS PAGE TAB1 210521
    objRelatives: [], //String[] // FOR dataOfObjsForList 280521 смежные объекты
    activeObjDataOfAuthUser: null, // выделенный объект - выбранный пользователем /consent page 270521
    objDataFromLocalAPI: [], // выделенный объект - выбранный пользователем /consent page 270521
    objectsData: {}, // выделенный объект - выбранный пользователем /consent page 270521
    relData: [], // выделенный объект - выбранный пользователем /consent page 270521
    curObjId: null, // выделенный объект - выбранный пользователем /consent page 270521
    activeRelId: null, // выделенный объект - выбранный пользователем /consent page 270521
    activeObjAndRel: [{id: 0, objName: ''},{id: 1, relName: ''}], // выделенный объект - выбранный пользователем /consent page 270521
    eventsActiveObj:  null, // выделенный объект - выбранный пользователем /consent page 270521
    // eventsActiveObj: {data: {recs:null}}, // выделенный объект - выбранный пользователем /consent page 270521
    visibleEventsObj: true, // выделенный объект - выбранный пользователем /consent page 270521
    // curObjFilterDateStart: '2021-01-01',
    // curObjFilterDateEnd: new Date().toISOString().split('T')[0],
};

const consentReducer = (state = INITIAL_STATE, action) => {
    return produce(state, draft => {
    switch (action.type) {
        case userFetch.SET_ERROR_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            draft.errorFetchUserData = action.payload
            return
        case userFetch.SET_ERROR_OBJ_OF_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            draft.errorFetchObjData = action.payload
            return
        case userFetch.GET_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            draft.userOfAuthData = action.payload
            return
        case userFetch.GET_ORG_OF_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            draft.orgDataOfAuthUser = action.payload
            return
         case relObjs.SET_ACTIVE_REL_OBJ_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
             draft.activeRelId = action.payload
             return
        case userFetch.GET_OBJS_OF_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            draft.dataOfObjsForList = action.payload.data.objects
            return
        case relObjs.FETCH_REL_OBJ_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 070621
            let newDataRel = state.relData //.concat(action.payload.data);
            newDataRel[action.payload.obj_id] = action.payload.data
            console.log('FETCH_REL_OBJ_FOR_CONSENT_PAGE: ',action.payload.data)

            draft.relData = newDataRel
            return

        case objsFetch.LOCAL_DATA_OF_OBJS_FOR_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521

            if (state.objDataFromLocalAPI.length) {
                let index = state.objDataFromLocalAPI.indexOf(obj => obj.objId === action.payload.objId);

                if (index >= 0) {
                    return state
                }
                draft.objDataFromLocalAPI.push(action.payload);
                return

            } else {
                draft.objDataFromLocalAPI = [...state.objDataFromLocalAPI, action.payload]
                return
            }

        case objsData.SET_ACTIVE_OBJ_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            draft.activeObjDataOfAuthUser = action.payload
            return

        case objsData.SET_ACTIVE_TWO_OBJS_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            //setActiveObjAndRel([{id: 0, objName: ''},{id: relId, relName: ''}])
            let objID = action.payload[0].id
            let objName = action.payload[0].objName
            // let obj = action.payload[0]
            let relID = action.payload[1].id
            let relName = action.payload[1].relName
            // let rel = action.payload[1]
            let lastState = state.activeObjAndRel

            if(objID > 1 && relID > 1){
                draft.activeObjAndRel = action.payload
                return
            }else if(objID > 1){
                if(!objName){ objName = lastState[0].objName }
                draft.activeObjAndRel[0] = {id: objID, objName: objName}
                return
            }else if(relID > 1){
                if(!relName){ relName = lastState[1].relName }
                draft.activeObjAndRel[1] = {id: relID, relName: relName}
                return
            }else {
                // draft.activeObjAndRel = action.payload
                return
            }
        case objsData.SET_CUR_OBJ_ID_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            draft.curObjId = action.payload
            return
        case objsFetch.EVENTS_OF_OBJS_FOR_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            let newArr;
            if (state.objRelatives.length) {
                newArr = state.objRelatives.concat(action.payload.data);

            } else if (state.objRelatives.length === 0) {
                newArr = action.payload.data;
            }
            draft.objRelatives = newArr
            return
        case objsFetch.DATA_ONE_OBJ_FOR_AUTH_USER_FOR_CONSENT_PAGE_E: // FOR OBJS PAGE TAB1 210521

            // console.log('DATA_ONE_OBJ_FOR_AUTH_USER_FOR_CONSENT_PAGE_E', action.payload)
            draft.objectsData[action.payload.obj_id] = action.payload
            return

        case objsFetch.EVENTS_ONE_OBJ_FOR_AUTH_USER_FOR_CONSENT_PAGE_E: // FOR OBJS PAGE TAB1 080621
            // let newArr3 = state.eventsActiveObj //
            console.log('EVENTS_ONE_OBJ_FOR_AUTH_USER_FOR_CONSENT_PAGE_E: ',action.payload)
            return state
        case objsData.UPDATE_SME_OBJS_FOR_CONSENT_PAGE:
            let newAddress = (action.payload.objName.objName || ' ').replace('улица','ул.');
            console.log('newAddress', newAddress)
            let newObjArr = state.dataOfObjsForList.map((el, index) => index === action.payload.objId
                ? { ...el, objName: newAddress }
                : el);

            if (state.dataOfObjsForList) {
                draft.dataOfObjsForList = newObjArr
                return
            } else {
                return state
            }

        case eventsObj.FETCH_EVENT_OF_OBJ: // FOR OBJS PAGE TAB1 210521
            draft.eventsActiveObj = action.payload
            return
        case eventsObj.SWITCH_EVENT_SHOW: // FOR OBJS PAGE TAB1 210521
            draft.visibleEventsObj = action.payload
            return

        default:
            return state;
    }
    })
};

export default consentReducer;

//// given a state
// state = {items: [{name: 'Fred', value: 1}, {name: 'Wilma', value: 2}]}
//
// // This will work without mutation as it clones the modified item in the map:
// this.state.items
//    .map(item => item.name === 'Fred' ? {...item, ...{value: 3}} : item)
//
// this.setState(newItems)