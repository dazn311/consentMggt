import { userFetch, objsData } from './cons.types';

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
  updateObjsDataOfAuthUser: null, // FOR OBJS PAGE TAB1 210521
  activeObjDataOfAuthUser: null, // выделенный объект - выбранный пользователем /consent page 270521
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
    case userFetch.GET_OBJS_OF_AUTH_USER_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
      return {
        ...state,
        updateObjsDataOfAuthUser: action.payload.data.objects
        // objsDataOfAuthUser: action.payload
      };
    case objsData.SET_ACTIVE_OBJ_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
      return {
        ...state,
        activeObjDataOfAuthUser: action.payload
      };
    case objsData.UPDATE_SME_OBJS_FOR_CONSENT_PAGE: // FOR OBJS PAGE TAB1 210521
        // console.log(action.payload.objName.objName,action.payload.objId)
        let newAdress = action.payload.objName.objName;
        console.log('newAdress',newAdress)
        if (newAdress.includes('улица,')){
          let tmp = newAdress.split(' ');
          let getIndex = tmp.indexOf('улица,');
          tmp[getIndex] = 'ул.';
          newAdress = tmp.join(' ');
        }else if (newAdress.includes('улица')){
          let tmp = newAdress.split(' ');
          let getIndex = tmp.indexOf('улица');
          tmp[getIndex] = 'ул.';
          newAdress = tmp.join(' ');
        }

        console.log('newAdress',newAdress)
        let newObjArr =  state.updateObjsDataOfAuthUser.map((el, index) => index === action.payload.objId ? {...el, objName: newAdress} : el );

        // newObjArr[action.payload.objId] = action.payload.data.objects
        if (state.updateObjsDataOfAuthUser) {
          return { ...state, updateObjsDataOfAuthUser: newObjArr };
        }else { return state}


      // return { ...state, updateObjsDataOfAuthUser: newObjArr };

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