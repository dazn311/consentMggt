import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import AdminPanelTrest from './screens/AdminPanelTrest/adminPanelTrest.component';
// import SimpleGraph from './screens/simpleGraph/simpleGraph.component'
import Dashboard from './screens/dashboard/Dashboard';
import AuthDashboard from './screens/auth-dashboard/AuthDashboard';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/users">
            <AuthDashboard />
          </Route>
          <Route path="/adminpanel">
            <AdminPanelTrest />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
