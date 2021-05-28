import React from 'react';


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import SearchPanel from './SearchPanel';
// import TabUsers from './TabUsers';
import StateElements from './stateElements';
import TabUsersComponent from "./TabUsers.component";
// import EventDetail from "./EventDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
    // minWidth:1400,
  },
  amObjs:{alignSelf: 'center',marginLeft:10, padding: '4px 16px'},
  seeMore: {
    marginTop: theme.spacing(0), 

  },
  datePick: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    margin: '10px 0px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  }
}));


const TabOneMenuComponent = ({ tabValue, fetchSearchObj , showEvents, handleChangePage }) => {

  const classes = useStyles();


  return (
      <React.Fragment> 
        <div className={classes.seeMore}>
          <StateElements amObjsValue={'amObjsValue'} amObjsValueCurrent={'amObjsValueCurrent'} />
          <div className={classes.datePick}>
            <SearchPanel  setSearchTextObj={'setSearchTextObj'} setSearchTextOrg={'setSearchTextOrg'} />
            <Button onClick={()=>{fetchSearchObj('0')}} style={{height: '43px'}} variant="contained" color="primary">
              Поиск
            </Button>
  
          </div>
          <TabUsersComponent
              tabValue={tabValue}
              showEvents={showEvents}
              handleChangePage={handleChangePage}
          />

        </div>
      </React.Fragment>
  );
}



export default  TabOneMenuComponent ;
