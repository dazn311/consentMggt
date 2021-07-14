import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


// import TabOGH from './TabOGH' 
import TabOneMenu from './FirstTab/TabFirst-objCard'
import TabTwoMenu from './TwoTab/tabTwoMenu'

import {selectObjsInfoPage
    // , selectObjsPage
} from "../../store/adminPanelTrest/StatisticPage.selectors";
import {selectCurObjRec, selectCurObjRecNotFilter} from "../../store/objs/obj.selectors";
import {selectErrorFetch} from "../../store/adminPanelTrest/adminPanelTrest.selectors";
import {objCurrentSelector} from "../../store/adminPanelTrest/objspages.selectors";


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
  return { id: `scrollable-auto-tab-${index}`, 'aria-controls': `scrollable-auto-tabpanel-${index}`  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));




const TabMenu = ({idObj, currObj, selectCurObjRec, objCurrentSel, selectCurObjRecNotFilter}) => {

    const [value, setValue] = useState(0);
    const [showTab2, setShowTab2] = useState(false);
    const classes = useStyles();

     const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // console.log('selectCurObjRec', selectCurObjRec) // []
    // console.log('objCurrentSel', objCurrentSel) //{objID: 21679, objName: "Красноказарменная площадь ОО", objRelatives: Array(3), objAsuID: 0, objStatus: 1, …}
    // console.log('currObj', currObj) //currObj {objID: 21679, objName: "Красноказарменная площадь ОО", objRelatives: Array(3), objAsuID: 0, objStatus: 1, …}
    // console.log('idObj', idObj) //21679


    React.useEffect(() => {
        if (selectCurObjRecNotFilter) {
            // if (selectCurObjRec) {
                setShowTab2(true);
            // }else {
            //     setShowTab2(false);
            // }
        }else {
            setShowTab2(false);
        }
    },[selectCurObjRecNotFilter])

// debugger

    return (
            <div className={classes.root}>
                <Tabs
                  orientation={ window.innerWidth < 450 ? 'vertical': 'horizontal'}
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Карточка объекта" {...a11yProps(0)} />
                  {showTab2 ? <Tab  label="События объекта" {...a11yProps(1)} />
                  : <Tab disabled={true}  label="События объекта" {...a11yProps(1)} /> }
                </Tabs>
              <TabPanel   value={value} index={0}>
                  <TabOneMenu idObj={idObj} currObj={currObj} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                  {showTab2 && <TabTwoMenu idObj={idObj} selectObjs={selectCurObjRec} selectCurObjRec={selectCurObjRec} />}

              </TabPanel>
            </div>
          );
}


const mapStateToProps = createStructuredSelector ({
    selectCurObjRecNotFilter: selectCurObjRecNotFilter, // события короткие данные для таблицы
    selectCurObjRec: selectCurObjRec, // события короткие данные для таблицы
    selectObjsInfoPage: selectObjsInfoPage, // события короткие данные для таблицы
    selectErrorFetch: selectErrorFetch,
    objCurrentSel: objCurrentSelector,
});


export default connect(mapStateToProps)(TabMenu);