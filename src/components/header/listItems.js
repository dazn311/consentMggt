import React from 'react';
import {Link, withRouter} from 'react-router-dom'; 

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArchiveIcon from '@material-ui/icons/Archive';
// import HistoryChange from '@material-ui/icons/History';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuItem from '@material-ui/core/MenuItem';
import BusinessIcon from '@material-ui/icons/Business';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PersonIcon from '@material-ui/icons/Person';
import {SatelliteTwoTone} from "@material-ui/icons";

const MainListItems = ( {location,  drawerClose} ) => {

    let activePage = 'dash';

    if (location.pathname === '/stats/gen') {
        activePage = 'gen';
    }else if (location.pathname === '/stats/dash') {
        activePage = 'dash';
    }else if (location.pathname === '/stats/consent') {
        activePage = 'consent';
    }else if (location.pathname === '/stats/users') {
        activePage = 'users';
    }else if (location.pathname.includes('user')) {
        activePage = 'user';
    }else if (location.pathname === '/stats/objs') {
        activePage = 'objs';
    }else if (location.pathname.includes('obj')) {
        activePage = 'obj';
    }

    // console.log('activePage', activePage)

    return(

        <div>
            <MenuItem component={Link} to="/stats/dash" selected={activePage === 'dash'}>
                <ListItemIcon>
                    <DashboardIcon color={activePage === 'dash' ? "primary" : "inherit"}/>
                </ListItemIcon>
                <ListItemText primary="Общая статистика" onClick={drawerClose}/>
            </MenuItem>

            <MenuItem component={Link} to="/stats/objs" selected={activePage === 'obj' || activePage === 'objs' }>
                <ListItemIcon>
                    {location.pathname.includes('obj')
                        ? (activePage === 'obj' ? <ApartmentIcon color={"primary"} /> : <BusinessIcon color={"primary"} /> )
                        : <BusinessIcon color={"inherit"}/>
                    }

                </ListItemIcon>
                <ListItemText primary="Объекты" onClick={drawerClose}/>
            </MenuItem>

            <MenuItem component={Link} to="/stats/users" selected={activePage === 'user' || activePage === 'users'}>
                <ListItemIcon>
                    {location.pathname.includes('user')
                        ? (activePage === 'user' ? <PersonIcon color={"primary"} /> : <PeopleIcon color={"primary"} /> )
                        : <PeopleIcon color={"inherit"}/>
                    }
                </ListItemIcon>
                <ListItemText primary="Пользователи"/>
            </MenuItem>

            <MenuItem component={Link} to="/stats/gen" selected={activePage === 'gen'}>
                <ListItemIcon>
                    <BarChartIcon color={location.pathname === '/stats/gen' ? "primary" : "inherit"}/>
                </ListItemIcon>
                <ListItemText primary="Текущая статистика" selected={location.pathname === '/stats/gen'}/>
            </MenuItem>


            <MenuItem component={Link} to="/stats/consent" selected={activePage === 'consent'}>
                <ListItemIcon>
                    <LayersIcon color={activePage === 'consent' ? "primary" : "inherit"}/>
                </ListItemIcon>
                <ListItemText primary="Согласование" onClick={drawerClose}/>
            </MenuItem>
            <ListItem button disabled>
                <ListItemIcon>
                    <ArchiveIcon/>
                </ListItemIcon>
                <ListItemText primary="Архив" selected={location.pathname === '/stats/ogh'}/>
            </ListItem>
        </div>
    )
};

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

 
