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
import Formprofile from './Pages/Formprofile';

import Profile from './Pages/Profile';
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
     
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit/:id" component={Formprofile} />

      </Switch>
      
  
      

    </div>
    
  );
}

export default App;