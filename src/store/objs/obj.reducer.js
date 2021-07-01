import { objData, objFilter } from './obj.types';

//
// const initionalDateEnd = () => {
//   let newDate = new Date();//.toISOString().split('T')[0];
//   return newDate.toISOString().split('T')[0];
// }

const INITIAL_STATE = {
  errorFetchObjsData: null, // FOR OBJS PAGE TAB1 210521
  filterFieldObjs: '', // FOR OBJS PAGE TAB1
  filterFieldOrg: '', // FOR OBJS PAGE TAB1
  filterSelectorBenefice: '', // FOR OBJS PAGE TAB1
  filterSelectorStatus: '', // FOR OBJS PAGE TAB1
  filterSelectorType: '', // FOR OBJS PAGE TAB1
  filterDateStartObjs: '2021-01-01', // FOR OBJS PAGE TAB1
  filterDateEndObjs: '2021-01-01', // FOR OBJS PAGE TAB1
  curObjAllData: {}, // for user page info
  curObjFilterSender: '',
  curObjFilterOwn: '',
  curObjsFilterType: 0 , // FOR OBJ PAGE
  curObjsFilterStatus: 0 , // FOR OBJ PAGE
  curObjFilterDateStart: '2021-01-01',
  curObjFilterDateEnd: new Date().toISOString().split('T')[0],
};

const objReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case objData.ERROR_FETCH_OBJS_DATA_FOR_OBJS_PAGE: // FOR OBJS PAGE TAB1 210521
      return {
        ...state,
        errorFetchObjsData: action.payload
      };
    case objFilter.SET_FILTER_FIELD_OBJS_FOR_OBJS_PAGE: // FOR OBJS PAGE TAB1 210521
      return {
        ...state,
        filterFieldObjs: action.payload
      };
    case objFilter.SET_FILTER_FIELD_ORGS_FOR_OBJS_PAGE: // FOR OBJS PAGE TAB1 210521
      return {
        ...state,
        filterFieldOrg: action.payload
      };
    case objFilter.SET_FILTER_SELECTOR_BENEFICE_FOR_OBJS_PAGE: // FOR OBJS PAGE TAB1 210521
      return {
        ...state,
        filterSelectorBenefice: action.payload
      };
    case objFilter.SET_FILTER_SELECTOR_STATUS_FOR_OBJS_PAGE: // FOR OBJS PAGE TAB1 210521
      return {
        ...state,
        filterSelectorStatus: action.payload
      };
    case objFilter.SET_FILTER_SELECTOR_TYPE_FOR_OBJS_PAGE: // FOR OBJS PAGE TAB1 210521
      return {
        ...state,
        filterSelectorType: action.payload
      };
    case objFilter.SET_FILTER_DATE_START_OBJS_PAGE: // FOR OBJS PAGE TAB1 210521
      return {
        ...state,
        filterDateStartObjs: action.payload
      };
    case objFilter.SET_FILTER_DATE_END_OBJS_PAGE: // FOR OBJS PAGE TAB1 210521
      return {
        ...state,
        filterDateEndObjs: action.payload
      };
    case objData.SET_FILTER_SENDER_FOR_OBJ_CARD_PAGE: // FOR OBJ Card Details page
      return {
        ...state,
        curObjFilterSender: action.payload
      };
    case objData.SET_FILTER_OWN_FOR_OBJ_CARD_PAGE:// FOR OBJ Card Details page
      return {
        ...state,
        curObjFilterOwn: action.payload
      };
    case objData.SET_OBJ_CURRENT_FOR_OBJ_CARD_PAGE:// FOR OBJ Card Details page
      // console.log(' case userData.FETCH_USER_CURRENT_FOR_USER_CARD_DETAILS_PAGE:',action.payload);
      return {
        ...state,
        curObjAllData: action.payload
      };
    case objData.SET_FILTER_DATE_START_FOR_OBJ_CARD_PAGE:// FOR OBJ Card Details page
      // console.log(' case userData.FETCH_USER_CURRENT_FOR_USER_CARD_DETAILS_PAGE:',action.payload);
      return {
        ...state,
        curObjFilterDateStart: action.payload
      };
    case objData.SET_FILTER_DATE_END_FOR_OBJ_CARD_PAGE:// FOR OBJ Card Details page
      // console.log(' case userData.FETCH_USER_CURRENT_FOR_USER_CARD_DETAILS_PAGE:',action.payload);
      return {
        ...state,
        curObjFilterDateEnd: action.payload
      };
    default:
      return state;
  }
};
 
export default objReducer;
