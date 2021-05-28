import React from 'react';
import {Link, withRouter} from 'react-router-dom'; 

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import HistoryChange from '@material-ui/icons/History';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuItem from '@material-ui/core/MenuItem';
import BusinessIcon from '@material-ui/icons/Business'; 
 
 
const MainListItems = ( {location,  drawerClose} ) => (
  
  <div >
    <MenuItem    component={Link} to="/stats"   selected={location.pathname === '/stats'}>
      <ListItemIcon>
        <DashboardIcon color={location.pathname === '/stats' ? "primary" : "inherit"} /> 
      </ListItemIcon>
      <ListItemText primary="Главная" onClick={drawerClose} />
    </MenuItem>
    {/* <MenuItem  component={Link} to="/stats/ogh"  selected={location.pathname === '/stats/ogh'}>
      <ListItemIcon>
        <HistoryChange />
      </ListItemIcon>
      <ListItemText primary="Таблица ОГХ" />
    </MenuItem> */}
      
    {/*<MenuItem    component={Link} to="/stats/objs"  selected={location.pathname === '/stats/objs'}>*/}
    <MenuItem    component={Link} to="/stats/objs"  selected={location.pathname.includes('obj') }>
      <ListItemIcon>
        {/*<BusinessIcon color={location.pathname === '/stats/objs' ? "primary" : "inherit"} />*/}
        <BusinessIcon color={location.pathname.includes('obj') ? "primary" : "inherit"} />
      </ListItemIcon>
      <ListItemText primary="Объекты" onClick={drawerClose} />
    </MenuItem> 

    {/* <MenuItem  component={Link} to="/stats/users"  selected={location.pathname === '/stats/users'}> */}
    <MenuItem    component={Link} to="/stats/users"  selected={location.pathname.includes('user') }>
      <ListItemIcon>
        <PeopleIcon  color={location.pathname.includes('user') ? "primary" : "inherit"} />
        {/* <PeopleIcon  color={location.pathname === '/stats/users' ? "primary" : "inherit"} /> */}
      </ListItemIcon>
      <ListItemText primary="Пользователи" />
    </MenuItem>
     
    <MenuItem    component={Link} to="/stats/gen"  selected={location.pathname === '/stats/gen'}>
      <ListItemIcon>
        <BarChartIcon color={location.pathname === '/stats/gen' ? "primary" : "inherit"} />
      </ListItemIcon>
      <ListItemText primary="Текущая статистика"  selected={location.pathname === '/stats/gen'}  />
    </MenuItem>

    <ListItem    button disabled >
      <ListItemIcon >
        <LayersIcon   />
        {/* {location.pathname} */}
      </ListItemIcon>
      <ListItemText primary="Управление" selected={location.pathname === '/stats/ogh'} />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Статистика</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Текущий месяц" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Прошлый квартал" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="От ноября 2020" />
    </ListItem>
  </div>
);
 

export default withRouter(MainListItems);

 
