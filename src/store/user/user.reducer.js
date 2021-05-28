import { UserActionTypes, userData } from './user.types';
import USERS_DATA from './userPage.data';

const initionalDateEnd = () => {
  let newDate = new Date();//.toISOString().split('T')[0];
  return newDate.toISOString().split('T')[0];
}

const INITIAL_STATE = {
  errorFetchUserData: null, // for user page info
  curUserAllData: {}, // for user page info
  curUserShort: USERS_DATA.curUserShort , // for user page info
  curUserStatsData: {} , // for user page info
  filterRecStatus: 0 , // for curUserStatsData for active tab2 for userDetails
  filterRecDateStart: '2021-01-01' , // for curUserStatsData for active tab2 for userDetails
  filterFieldObj: '' , // for curUserStatsData for active tab2 for userDetails
  filterRecDateEnd: initionalDateEnd() , // for curUserStatsData for active tab2 for userDetails
  curUser: USERS_DATA.curUser // in login
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userData.ERROR_FETCH_USER_DATA_CUR_FOR_USER_DETAILS_PAGE:
      return {
        ...state,
        errorFetchUserData: action.payload
      };
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        curUser: action.payload
      };
    case userData.SET_USER_SHORT_CUR_FOR_USER_CARD_PAGE:
      return {
        ...state,
        curUserShort: action.payload
      };
    case userData.FETCH_USER_CURRENT_FOR_USER_CARD_DETAILS_PAGE:
      return {
        ...state,
        curUserAllData: action.payload
      };
    case userData.FETCH_USER_STATS_FOR_USER_CARD_DETAILS_PAGE:
      return {
        ...state,
        curUserStatsData: action.payload
      };
    case userData.FILTER_USER_REC_TYPE_FOR_USER_ACTIVE_CARD_DETAILS_PAGE:
      return {
        ...state,
        filterRecStatus: action.payload
      };
    case userData.FILTER_USER_FIELD_FOR_USER_ACTIVE_CARD_DETAILS_PAGE:
      return {
        ...state,
        filterFieldObj: action.payload
      };
    case userData.FILTER_USER_DATE_START_FOR_USER_ACTIVE_CARD_DETAILS_PAGE:
      return {
        ...state,
        filterRecDateStart: action.payload
      };
    case userData.FILTER_USER_DATE_END_FOR_USER_ACTIVE_CARD_DETAILS_PAGE:
      return {
        ...state,
        filterRecDateEnd: action.payload
      };
    default:
      return state;
  }
};
 
export default userReducer;
