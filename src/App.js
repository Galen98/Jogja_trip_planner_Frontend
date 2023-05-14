//import react
import React from 'react';

//import react router dom
import { Switch, Route } from "react-router-dom";

//import component Register
import Register from './Pages/Register';

//import component Login
import Login from './Pages/Login';

//import component Register
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;