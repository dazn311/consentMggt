import { themeData } from './theme.types';  

const INITIAL_STATE = {
  curTheme: 'dark' , // for user page info 
};

const themeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case themeData.SWITCH_THEME_ALL_PAGES:
      // console.log(' case themeData.SWITCH_THEME_ALL_PAGES:',action.payload);
      return {
        ...state,
        curTheme: action.payload
      };
    
    default:
      return state;
  }
};
 
export default themeReducer;
