import React,{ useState} from 'react';
// import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { TransitionGroup } from 'react-transition-group'

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';

import Box from '@material-ui/core/Box';
import { blue, blueGrey, lightBlue, lightGreen } from '@material-ui/core/colors';

import './App.styles.scss';

import Header from './components/header/header.component';

// import { fetchCurrentUserAsync } from './store/user/user.actions'

import clsx from 'clsx';


import Dashboard from './screens/dashboard'; 
import HistoriesChange from './screens/historyChanges/index'; 
import UsersPage from './screens/usersPage/index'; 
import UserDetails from './screens/userDetails';
import ObjPage from './screens/objPage'; 
import ObjCard from './screens/objCard';
import GeneralPage from './screens/gen';
import Footer from './components/footer';
import ConsentPage from "./screens/ConsentPage/ConsentPage";
 

const darkTheme = createMuiTheme({
  palette: {
    primary: { 
      // main: lightGreen[500],
      // dark: lightGreen[700],
      main: '#8bc34a9c',
      // dark: '#8bc34a9c',
    },
    secondary: { 
      // main: lightGreen[500],
      main: '#8bc00a9c',
      // dark: blueGrey[700]
    },
    background: {
      // default: lightGreen[900],
      // paper: 'grey', 
    },
    redLight: 'rgb(234 128 128 / 60%)',
    purple: '#a4a5d8',
    type: 'dark' 
  },
  
}, ruRU);  

const lightTheme = createMuiTheme({
  palette: {
    primary: { 
      light: '#1769aa', 
      main: '#1769aa', 
    },
    secondary: {
      light: lightBlue[500],
      main: lightBlue[500], 
    },
    background: {
      // default: lightGreen[900],
      // paper: 'grey', 
    },
    redLight: 'rgb(234 128 128 / 60%)',
    purple: '#a4a5d8',
    type: 'light'
  },
  
}, ruRU);  

const useStyles = makeStyles((theme) => ({
  root: {
      width: '100%',
  },
  container: {
      // display: 'flex',
      // minWidth: '100%'
      // marginLeft: 240
  }, 
}));

const App = () => { 
  const [darkThemeS, setDarkThemeS] = useState(true);
  const classes = useStyles(); 

  const setTheme = () => {
    setDarkThemeS(!darkThemeS);
    
  }

  return (
    <div className={clsx(classes.root )} >
      <ThemeProvider theme={darkThemeS ? darkTheme : lightTheme}>
      <TransitionGroup  timeout={150} >
          <Router>
            <Header setTheme={setTheme} >
                <div className={clsx(classes.container )} >
                  <Switch>
                    <Route exact path="/stats/consent">
                      <ConsentPage />
                    </Route>
                    <Route exact path="/stats/ogh">
                      <HistoriesChange />
                    </Route>
                    <Route
                    path="/stats/user/:iduser"
                    render={props => <UserDetails {...props} />}
                    >

                      {/* <UserDetails /> */}

                    </Route>
                    <Route exact path="/stats/users">
                      <UsersPage />
                    </Route>
                    <Route  path="/stats/obj/:idobj">
                      <ObjCard />
                    </Route>
                    <Route exact path="/stats/objs">
                      <ObjPage />
                    </Route>
                    <Route path="/stats/gen">
                      <GeneralPage />
                    </Route>
                    <Route exact path="/stats/dash">
                      <Dashboard />
                    </Route>
                    <Route >
                      <ConsentPage />
                    </Route>
                  </Switch>
                </div>
            </Header>
            <Box pt={2} pb={2}>
               <Footer />
            </Box>
          </Router>
      </TransitionGroup>
      </ThemeProvider>
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   fetchCurrentUser: (id) => dispatch(fetchCurrentUserAsync(id)),
// });

export default App
// export default connect(null,mapDispatchToProps)(App);
