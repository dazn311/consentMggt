// import React, { Suspense, lazy } from 'react';
import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import AuthDashboard from './screens/auth-dashboard/AuthDashboard';

// const AuthDashboard = lazy(() => import('./screens/auth-dashboard/AuthDashboard'));

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <AuthDashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
