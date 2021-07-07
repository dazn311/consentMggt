import React from 'react';
// import {Link} from 'react-router-dom';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const ThemeItem = ({setTheme}) => {

    return (
        <MenuItem  onClick={setTheme}>
            <ListItemIcon>
                <WbSunnyIcon color={"primary"}/>
            </ListItemIcon>
            <ListItemText primary="Тема Оформления"/>
        </MenuItem>
    )
};


export default  ThemeItem
