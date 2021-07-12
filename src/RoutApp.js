import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from "react-router-dom";

import Box from '@material-ui/core/Box';

// import './App.styles.scss';


// import { fetchCurrentUserAsync } from './store/user/user.actions'


import Header from './components/header/header.component';
import Dashboard from './screens/dashboard';
import HistoriesChange from './screens/historyChanges/index';
import UsersPage from './screens/usersPage/index';
import UserDetails from './screens/userDetails';
import ObjPage from './screens/objPage';
import ObjCard from './screens/objCard';
import GeneralPage from './screens/gen';
import Footer from './components/footer';
import ConsentPage from "./screens/ConsentPage/ConsentPage";

// const Dashboard = lazy(() =>
//     import('./screens/dashboard')
// )

const RoutApp = ({setTheme}) => {
    // console.log('reload RoutApp')
    return (
        <Router>
            <Header setTheme={setTheme}/>
            <Switch>
                <Route exact path="/stats/consent">
                    <ConsentPage/>
                </Route>
                <Route exact path="/stats/ogh">
                    <HistoriesChange/>
                </Route>
                <Route path="/stats/user/:iduser"
                       render={props => <UserDetails {...props} />}>
                    {/* <UserDetails /> */}
                </Route>
                <Route exact path="/stats/users">
                    <UsersPage/>
                </Route>
                <Route path="/stats/obj/:idobj">
                    <ObjCard/>
                </Route>
                <Route exact path="/stats/objs">
                    <ObjPage/>
                </Route>
                <Route path="/stats/gen">
                    <GeneralPage/>
                </Route>
                {/*<Suspense fallback={<div>..Loading suspense</div>}>*/}
                <Route exact path="/stats/dash">
                    <Dashboard/>
                </Route>
                {/*</Suspense>*/}
                <Route exact path="/stats">
                    <Redirect from='/stats' to="/stats/consent"/>
                </Route>
                <Route exact path="/">
                    <Redirect from='/' to="/stats/consent"/>
                </Route>
            </Switch>

            <Box pt={2} pb={2}>
                <Footer/>
            </Box>
        </Router>
    );
}

export default RoutApp
