import React, { useState} from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

 
import TabOneMenu from './FirstTab/tabOneMenu'
import TabTwoMenu from './TwoTab/tabTwoMenu'
import TabThirdMenu from './ThirdTab/tabThirdMenu'

 
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
        <Box  style={{padding: 0}} >
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
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const TabMenu = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  };
 

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          orientation={ window.innerWidth < 450 ? 'vertical': 'horizontal'}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="standard"
          // scrollButtons="auto"
          aria-label="scrollable auto tabs example" 
           
        >
          <Tab label="Список объектов" {...a11yProps(0)} />
          <Tab label="Графики объектов" {...a11yProps(1)} />
          <Tab label="Статистика по ОГХ" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel   value={value} index={0} >
          <TabOneMenu />
      </TabPanel>
      <TabPanel value={value} index={1}>
          <TabTwoMenu />
      </TabPanel> 
      <TabPanel value={value} index={2}>
      <TabThirdMenu />
      </TabPanel> 
    </div>
  );
}





export default TabMenu;
 