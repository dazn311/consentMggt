import React, { useState} from 'react';
import PropTypes from 'prop-types';

 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


// import TabOGH from './TabOGH'
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
        <Box p={3}>
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
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const TabMenu = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(newValue); 
  };

 
 
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          orientation={ window.innerWidth < 450 ? 'vertical': 'horizontal'}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Статистика по событиям" {...a11yProps(0)} />
          <Tab label="Статистика по системы" {...a11yProps(1)} />
          <Tab label="Статистика по ОГХ" {...a11yProps(2)} />
          {/* <Tab label="Пользователи онлайн" {...a11yProps(3)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel   value={value} index={0}>
          <TabOneMenu />
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




// const mapStateToProps = createStructuredSelector ({
//     eventShortPoints: selectEventShortPoints, // события короткие данные для таблицы
//     statusEventPoint: selectStatusEventPoint, // классификация статусов "new_msg"
//     statusEnumEventPointColor: selectStatusEnumEventPointColor, // for color elements
//   });
  
// const mapDispatchToProps = (dispatch) => ({
//     // Для событий новых и закрытых
//     fetchEventForPeriod: (startDate, endDate) => dispatch(fetchEventForPeriodAsync(startDate, endDate)),
// });  

export default TabMenu;

  // export default connect(null, mapDispatchToProps)(TabMenu);