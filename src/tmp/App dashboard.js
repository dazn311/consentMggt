import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

// import Dashboard from './screens/dashboard';
import AuthDashboard from './screens/auth-dashboard/AuthDashboard';
// import UsersDashboard from './screens/users';
// import HistoriesDashboard from './screens/historyChanges';

const Dashboard = lazy(() => import('./screens/dashboard'));
const HistoriesDashboard = lazy(() => import('./screens/historyChanges'));
const UsersDashboard = lazy(() => import('./screens/users'));

function App() {
  return (
    <div className="App">
      <Router>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Switch>
          <Route exact path="/" lazi>
            <Dashboard />
          </Route>
          <Route path="/login">
            <AuthDashboard />
          </Route>
          <Route path="/history">
            <HistoriesDashboard />
          </Route>
          <Route path="/users">
            <UsersDashboard />
          </Route>
          <Route >
            <Dashboard />
          </Route>
          
        </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
