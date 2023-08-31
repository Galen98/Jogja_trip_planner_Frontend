import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



//import bootstrap CSS

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import 'react-bulma-dropdown/dist/main.css';
import Alert from 'react-bootstrap/Alert';

//import custom CSS
import './index.css';

//BrowserRouter dari react router
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  
  <React.StrictMode>
    <BrowserRouter>
      <App />
     
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);