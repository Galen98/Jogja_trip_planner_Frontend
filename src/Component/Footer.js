import React, { useState, Component  } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';
class Footer extends Component {
  render() {
    return (
      <>
      <div>
        <div style={{marginTop:"100px"}}></div> <div className='footerx shadow-md'> <p>&copy; Copyright 2023 Jogja Travel Recommendation</p> </div>
      </div>
      </>
    );
  }
}

export default Footer;