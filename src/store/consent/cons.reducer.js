import {userFetch, objsData, objsFetch, relObjs} from './cons.types';

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
    objsData: [], // выделенный объект - выбранный пользователем /consent page 270521
    relData: [], // выделенный объект - выбранный пользователем /consent page 270521
    curObjId: null, // выделенный объект - выбранный пользователем /consent page 270521
    activeRelId: null, // выделенный объект - выбранный пользователем /consent page 270521
    // curObjFilterDateStart: '2021-01-01',
    // curObjFilterDateEnd: new Date().toISOString().split('T')[0],
};

const consentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userFetch.SET_ERROR_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            return {
                ...state,
                errorFetchUserData: action.payload
            };
        case userFetch.SET_ERROR_OBJ_OF_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            return {
                ...state,
                errorFetchObjData: action.payload
            };
        case userFetch.GET_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            return {
                ...state,
                userOfAuthData: action.payload
            };
        case userFetch.GET_ORG_OF_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            return {
                ...state,
                orgDataOfAuthUser: action.payload
            };
         case relObjs.SET_ACTIVE_REL_OBJ_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            return {
                ...state,
                activeRelId: action.payload
            };
        case userFetch.GET_OBJS_OF_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521

            return {
                ...state,
                dataOfObjsForList: action.payload.data.objects
                // objsDataOfAuthUser: action.payload
            };
        case relObjs.FETCH_REL_OBJ_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 070621
            let newDataRel = state.relData //.concat(action.payload.data);
            newDataRel[action.payload.obj_id] = action.payload.data
            console.log('action.payload.data: ',action.payload.data)
            return {
                ...state,
                relData: newDataRel
            };
            // if(!action.payload.data) return state
            // let newData = [...state.relData] //.push(action.payload.data) //  action.payload.data
            // newData = [...newData,action.payload.data] //  action.payload.data
            //
            // return { ...state, relData: newData }

        case objsFetch.LOCAL_DATA_OF_OBJS_FOR_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521

            if (state.objDataFromLocalAPI.length) {
                let index = state.objDataFromLocalAPI.indexOf(obj => obj.objId === action.payload.objId);

                if (index >= 0) {
                    return state
                }
                let newData = state.objDataFromLocalAPI//.push(action.payload);
                newData.push(action.payload);
                return {
                    ...state,
                    objDataFromLocalAPI: newData
                };
            } else {
                return {
                    ...state,
                    objDataFromLocalAPI: [...state.objDataFromLocalAPI, action.payload]
                };
            }

        case objsData.SET_ACTIVE_OBJ_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            return {
                ...state,
                activeObjDataOfAuthUser: action.payload
            };
        case objsData.SET_CUR_OBJ_ID_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            return {
                ...state,
                curObjId: action.payload
            };
        case objsFetch.EVENTS_OF_OBJS_FOR_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            let newArr;
            if (state.objRelatives.length) {
                newArr = state.objRelatives.concat(action.payload.data);

            } else if (state.objRelatives.length === 0) {
                newArr = action.payload.data;
            }

            return {
                ...state,
                objRelatives: newArr
            };
        case objsFetch.DATA_ONE_OBJ_FOR_AUTH_USER_FOR_CONSENT_PAGE_E: // FOR OBJS PAGE TAB1 210521
            let newArr2 = state.objsData //.concat(action.payload.data);
            newArr2[action.payload.obj_id] = action.payload
            // console.log('objsData: ',newArr2)
            return {
                ...state,
                objsData: newArr2
            };
        case objsData.UPDATE_SME_OBJS_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
            // console.log(action.payload.objName.objName,action.payload.objId)
            let newAdress = action.payload.objName.objName;
            // console.log('newAdress', newAdress)
            if (newAdress.includes('улица,')) {
                let tmp = newAdress.split(' ');
                let getIndex = tmp.indexOf('улица,');
                tmp[getIndex] = 'ул.';
                newAdress = tmp.join(' ');
            } else if (newAdress.includes('улица')) {
                let tmp = newAdress.split(' ');
                let getIndex = tmp.indexOf('улица');
                tmp[getIndex] = 'ул.';
                newAdress = tmp.join(' ');
            }

            console.log('newAdress', newAdress)
            let newObjArr = state.dataOfObjsForList.map((el, index) => index === action.payload.objId ? {
                ...el,
                objName: newAdress
            } : el);

            // newObjArr[action.payload.objId] = action.payload.data.objects
            if (state.dataOfObjsForList) {
                return {...state, dataOfObjsForList: newObjArr};
            } else {
                return state
            }


        // return { ...state, dataOfObjsForList: newObjArr };

        default:
            return state;
    }
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