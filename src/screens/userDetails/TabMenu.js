import React, { useState,useEffect} from 'react';
import PropTypes from 'prop-types';


import { useHistory } from 'react-router';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


// import TabOGH from './TabOGH' 
import TabOneMenu from './FirstTab/tabOneMenu'
import TabTwoMenu from './TwoTab/tabTwoMenu'
import TabThirdMenu from './ThirdTab/tabThirdMenu'


// import { fetchEventForPeriodAsync } from '../../store/adminPanelTrest/adminPanelTrest.actions'; 

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));



///////////////////////////////////////////////////////////////////

const TabMenu = ({idUser, curUser}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);


  // const match = useRouteMatch();
  const history = useHistory();
   

  const location = history.location.pathname.split('/')[4];
  // console.log('location', location);
  useEffect(() => {
    if (location === "edit") {
      setValue(2);
    }else if (location === "info") {
      setValue(0);
    }else if (location === "active") {
      setValue(1);
    }
    // history.push({
    //   pathname: `${match.url}/info`
    // })
  },[])
    

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


 
  return (
    <div className={classes.root}>
      {/* <AppBar position="static" color="default"> */}
        <Tabs
          value={value}
          orientation={ window.innerWidth < 450 ? 'vertical': 'horizontal'}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="standard"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Общие сведения" {...a11yProps(0)} />
          <Tab label="Активность" {...a11yProps(1)} />
          <Tab label="Редактирование" {...a11yProps(2)} />
          {/* <Tab label="Пользователи онлайн" {...a11yProps(3)} /> */}
        </Tabs>
      {/* </AppBar> */}
      <TabPanel   value={value} index={0}>
          <TabOneMenu idUser={idUser} curUser={curUser} />
      </TabPanel>
      <TabPanel value={value} index={1}>
          <TabTwoMenu />
      </TabPanel> 
      <TabPanel value={value} index={2}>
        <TabThirdMenu />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
      таб 4
      </TabPanel> */}
    </div>
  );
}



export default TabMenu;