import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Dashboard from './screens/dashboard'; 
import HistoriesChange from './screens/historyChanges/index'; 
//glav control
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/ogh">
            <HistoriesChange />
          </Route>
          <Route path="/stats">
            <Dashboard />
          </Route>
          <Route path="/stats/ogh">
            <HistoriesChange />
          </Route>
          <Route >
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
