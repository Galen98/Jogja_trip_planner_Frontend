import React, { useState, Component  } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';
class Footerhome extends Component {
  render() {
    return (
      <>
      <footer className="footer has-text-white" style={{backgroundColor:"black"}}>
        
      <div className="content has-text-centered">
        <p>Copyright © Jogja Travel Recommendation</p>
      </div>
 <br/>
  <div className="columns">
    <div className="column is-one-half">
      <h4 className="bd-footer-title 
                 has-text-weight-medium
                 has-text-centered">
        <img src="./logonews.png" style={{width:"100px"}}/>
        <p className='mt-4 has-text-weight-semibold is-size-4'>Jogja Travel Recommendation</p>
        <p className='has-text-weight-light mt-4'>By Jogja Borobudur Tour & Travel</p>
        <br/>
        <span class="icon-text">
            <span className='mr-5'>
            <button className="button">
    <span className="icon">
      <i className="fab fa-instagram"></i>
    </span>
    <span>Instagram</span>
  </button>
  </span>
  <span>
            <button class="button">
    <span class="icon">
      <i class="fa fa-tripadvisor"></i>
    </span>
    <span>tripadvisor</span>
  </button>
  </span>
          </span>
      </h4>
        <br/>
    </div>
  
    
    <div class="column">
      <h4 class="bd-footer-title 
                 has-text-weight-medium 
                 has-text-justify">
        Support
      </h4>
  
      <br/>
      <p class="bd-footer-link">
         <a href="https://">
          <span class="icon-text">
            <span>Kebijakan privasi</span>
          </span>
         </a>
          <br />
          <br/>
          <a href="https://">
              <span class="icon-text">
                <span>Syarat dan ketentuan</span>
              </span>
            </a>
          <br />
          <br/>
          <a href="https://">
              <span class="icon-text">
                <span>Inspirasi perjalanan</span>
              </span>
          </a>
          <br />
          <br/>
      </p>
    </div>
  
    
    <div class="column">
      <h4 class="bd-footer-title
                 has-text-weight-medium
                 has-text-justify">
        Contact us
      </h4>
      <br/>
      <p class="bd-footer-link">
          <a href="https://">
              <span class="icon-text">
                <span>About us</span>
              </span>
            </a>
          <br />
          <br/>
          <a href="https://">
              <span class="icon-text">
                <span>Contact</span>
              </span>
            </a>
          <br />
          <br/>
          <a href="https://">
              <span class="icon-text">
                <span>FAQ</span>
              </span>
            </a>
      </p>
  
    </div>
  </div>
</footer>
      </>
    );
  }
}

export default Footerhome;