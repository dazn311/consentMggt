import React,{ useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import SearchPanel from './SearchPanel';
import StateElements from './stateElements';
import TabUsersComponent from "./TabUsers.component";

import { fetchAllUsersFromDB , setUsersNameFilterTxtForUsersPage, setOrgNameFilterTxtForUsersPage } from '../../../store/adminPanelTrest/adminPanelTrest.actions';
import { selectAllUsersFromDb } from '../../../store/adminPanelTrest/adminPanelTrest.selectors';
import { setCurUserShortAsync, fetchUserById } from '../../../store/user/user.actions';

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
    // width:'100%'
 
  }, 
  searchPanel: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: theme.palette.background.paper,
    padding: '4px',
    // marginTop: '8px',
    borderRadius: '4px',
    margin: '0px 0px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  }
}));

// const filterSearchTextUser = (selectAllUsers=[], filterUser) => {
//   // console.log('filterSearchTextUser',filterUser)
//   return [{user_name:'va'},{user_name:'vs'}].filter((elem) => elem.user_name.includes(filterUser))
//   // return selectAllUsers.filter((elem) => elem.user_name.includes(filterUser))
//
// }
/////////////////////////////////////////////////////////////////////

const TabOneMenu = ({ fetchAllUsers, selectAllUsers, setUsersFilter,setOrgNameFilter, setCurUserShort, fetchUserById }) => {

  const [page, setPage] = React.useState(1);
  const [amObjsValue, setAmObjsValue] = React.useState(0);

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!selectAllUsers.length){
      fetchAllUsers();
      // console.log('fetchAllUsers');
    }
  },[fetchAllUsers,selectAllUsers.length])

  useEffect(() => {
    if (!selectAllUsers.length){
      setPage(1);
    }
    if (amObjsValue < selectAllUsers.length) {
      setAmObjsValue(selectAllUsers.length)
    }

  },[selectAllUsers.length, amObjsValue])

  // console.log('selectAllUsers',selectAllUsers);
  // console.log('Page',page);
  // console.log('parseInt selectAllUsers.length',parseInt(selectAllUsers.length / 10));

  // const setObjsValue = () => {
  //     if (amObjsValue < selectAllUsers.length) {
  //       setAmObjsValue(selectAllUsers.length)
  //     }
  // }

  const fetchSearchObj = () => { console.log('sd')}

  const setSearchTextUser = (val) => { setPage(1); setUsersFilter(val); console.log('setSearchTextUser',val)}
  const setSearchTextOrg = (val) => { setPage(1); setOrgNameFilter(val); console.log('setSearchTextOrg',val)}

  // const showEvents = () => { console.log('showEvents')}

  const handleChangePage = (event, page) => {  setPage(page);}

  const showEvents = (row) => {
    setCurUserShort(row);
    fetchUserById(row.user_id); // to local bd
    history.push({ pathname: `/stats/user/${row.user_id}`, row: row });


  }

  return (
      <React.Fragment>
        <div className={classes.seeMore}>
          <StateElements amObjsValue={amObjsValue} amObjsValueCurrent={selectAllUsers.length} />
          <div className={classes.searchPanel}>
            <SearchPanel  setSearchTextUser={setSearchTextUser} setSearchTextOrg={setSearchTextOrg} />
            <Button onClick={()=>{fetchSearchObj('0')}} style={{height: '43px', marginLeft: 8}} variant="contained" color="primary">
              Поиск
            </Button>

          </div>
          <TabUsersComponent
              tabValue={selectAllUsers}
              showEvents={showEvents}
              handleChangePage={handleChangePage}
              page={page}
              amObjsValue={amObjsValue}
          />
        </div>
      </React.Fragment>
  );
}


// const mapStateToProps = createStructuredSelector ({
//   selectAllUsers: filterSearchTextUser(selectAllUsersFromDb, 'ав'), // события короткие данные для таблицы
// });
const mapStateToProps = createStructuredSelector ({
  selectAllUsers: selectAllUsersFromDb, // события короткие данные для таблицы
});

// const mapStateToProps = createStructuredSelector ({
//   selectAllUsers: filterUser => selectAllUsersFromDb.filter((elem) => elem.user_name.contains(filterUser)), // события короткие данные для таблицы
// });

const mapDispatchToProps = (dispatch) => ({
  setCurUserShort: (row) => dispatch(setCurUserShortAsync(row)),
  fetchAllUsers: () => dispatch(fetchAllUsersFromDB()),
  fetchUserById: (userID) => dispatch(fetchUserById(userID)),
  setUsersFilter: (val) => dispatch(setUsersNameFilterTxtForUsersPage(val)),
  setOrgNameFilter: (val) => dispatch(setOrgNameFilterTxtForUsersPage(val)),
});
export default connect(mapStateToProps,mapDispatchToProps)(TabOneMenu); 
