import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
 
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'; 
import MenuItem from '@material-ui/core/MenuItem'; 
import WbSunnyIcon from '@material-ui/icons/WbSunny';

import { setThemesAsync } from '../../store/themes/theme.actions';
import { selectCurTheme } from '../../store/themes/theme.selectors';
  
const ThemeItem = ({setTheme, setThemes, selectCurTheme}) => {
  
  // const setTheme = () => {
  //   if ( selectCurTheme === 'light') {
  //     setThemes('dark')
  //   } else {
  //     setThemes('light')
  //   }
    
  // }

  

  // console.log('selectCurTheme',selectCurTheme);

  return(
  <MenuItem  component={Link} onClick={setTheme} > 
      <ListItemIcon >
       <WbSunnyIcon color={"primary"} /> 
      </ListItemIcon> 
      <ListItemText primary="Тема Оформления"    />
  </MenuItem>
)};
 
const mapDispatchToProps = dispatch => ({
    setThemes: (data) => dispatch(setThemesAsync(data))
  });
 

const mapStateToProps = createStructuredSelector ({ 
  selectCurTheme: selectCurTheme,
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeItem);
