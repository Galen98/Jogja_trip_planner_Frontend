import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Content from './Content';


//import bootstrap CSS

import 'bootstrap/dist/css/bootstrap.min.css'

import Alert from 'react-bootstrap/Alert';

//import custom CSS
import './index.css';

//BrowserRouter dari react router
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Content />
      <App />
     
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);