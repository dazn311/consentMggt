import { themeData } from './theme.types';   


 
export const switchTheme = theme => ({
  type: themeData.SWITCH_THEME_ALL_PAGES,
  payload: theme
}); 

/////////////// for User Card Page 050521 ///////////////////////////////////  
export const setThemesAsync = (data)  => {
  // console.log('👉 setThemesAsync start:' );
  return (dispatch) => { 
          dispatch(switchTheme(data));
  };
};

/////////////////////////
