//import react
import React from 'react';

//import react router dom
import { Switch, Route } from "react-router-dom";

//import component Register
import Homepage from './Pages/Homepage';

function Content() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>   
    </div>
    
  );
}

export default Content;