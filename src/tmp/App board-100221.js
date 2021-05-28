// import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Dashboard from './screens/dashboard';
// import AuthDashboard from './screens/auth-dashboard/AuthDashboard';
// import UsersDashboard from './screens/users';
// import HistoriesDashboard from './screens/historyChanges';

// const Dashboard = lazy(() => import('./screens/dashboard'));
// const HistoriesDashboard = lazy(() => import('./screens/historyChanges'));
// const UsersDashboard = lazy(() => import('./screens/users'));

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
