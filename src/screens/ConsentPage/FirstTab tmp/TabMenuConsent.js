import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


// import TabTwoMenu from './TwoTab/tabTwoMenu'
import {selectObjsInfoPage} from "../../store/adminPanelTrest/StatisticPage.selectors";
import {selectCurrentObj} from "../../store/objs/obj.selectors";
import {selectErrorFetch} from "../../store/adminPanelTrest/adminPanelTrest.selectors";
import TabFirstConsent from "./FirstTab/TabFirstConsent";


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
//
// function a11yProps(index) {
//   return {
//     id: `scrollable-auto-tab-${index}`,
//     'aria-controls': `scrollable-auto-tabpanel-${index}`,
//   };
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const TabMenuConsent = ({idObj, currObj}) => {

    // const [value, setValue] = useState(0);
    // const [showTab2, setShowTab2] = useState(false);
    const classes = useStyles();

    //  const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    // console.log('selectCurrentObj', selectCurrentObj)
    // console.log('currObj', currObj)
    // console.log('idObj', idObj)

    // useEffect(() => {
    //     if (selectCurrentObj) {
    //         if (selectCurrentObj.length) {
    //             setShowTab2(true);
    //         }else {
    //             setShowTab2(false);
    //         }
    //     }else {
    //         setShowTab2(false);
    //     }
    // },[selectCurrentObj])

    return (
            <div className={classes.root}>
              {/*  <Tabs*/}
              {/*    orientation={ window.innerWidth < 450 ? 'vertical': 'horizontal'}*/}
              {/*    value={value}*/}
              {/*    onChange={handleChange}*/}
              {/*    indicatorColor="primary"*/}
              {/*    textColor="primary"*/}
              {/*    variant="scrollable"*/}
              {/*    scrollButtons="auto"*/}
              {/*    aria-label="scrollable auto tabs example"*/}
              {/*  >*/}
              {/*    <Tab label="Согласование событий" {...a11yProps(0)} />*/}
              {/*    {showTab2 && <Tab  label="События объекта" {...a11yProps(1)} />}*/}
              {/*  </Tabs>*/}
              {/*<TabPanel   value={value} index={0}>*/}
                  <TabFirstConsent idObj={idObj} currObj={currObj} />
              {/*</TabPanel>*/}
              {/*<TabPanel value={value} index={1}>*/}
              {/*    {showTab2 && <TabTwoMenu idObj={idObj} selectObjs={currObj} />}*/}

              {/*</TabPanel>*/}
            </div>
          );
}


const mapStateToProps = createStructuredSelector ({
    selectCurrentObj: selectCurrentObj, // события короткие данные для таблицы
    selectObjsInfoPage: selectObjsInfoPage, // события короткие данные для таблицы
    selectErrorFetch: selectErrorFetch,
});


export default connect(mapStateToProps)(TabMenuConsent);