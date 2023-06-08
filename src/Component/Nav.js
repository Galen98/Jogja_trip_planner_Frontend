
import React, { useState, Component, useEffect  } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';
import Dropdown from 'react-bulma-dropdown'
import 'react-bulma-dropdown/dist/main.css';
    
  
function Nav() {
  
    const [isActive, setisActive] = useState(false);  
    const [user, setUser] = useState({});
    const history = useHistory();
    const token = localStorage.getItem("token");

    const fetchData = async () => {

      //set axios header dengan type Authorization + Bearer token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      //fetch user from Rest API
      await axios.get('http://localhost:8000/api/user')
      .then((response) => {

          //set response user to state
          setUser(response.data);
      })
  }

  const logoutHanlder = async () => {

    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    //fetch Rest API
    await axios.post('http://localhost:8000/api/logout')
    .then(() => {

        //remove token from localStorage
        localStorage.removeItem("token");

        //redirect halaman login
        history.push('/');
    });
};

useEffect(() => {  
  //call function "fetchData"
  fetchData();
}, []);


    
    return (
        <>
    
        <div>
        
        <style scoped>
            @import "https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"
            </style>
            <nav class="navbar is-black" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item ml-4" href="/">
      <img src="./logonews.png"/>
    </a>

    <a
            onClick={() => {
              setisActive(!isActive);
            }}
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className={`has-background-black navbar-menu ${isActive ? "is-active" : ""}`}>
    <div class="navbar-start">
      <a class="navbar-item has-text-white">
        Home
      </a>

      <a class="navbar-item has-text-white">
        Artikel
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
      {token ? (
        <Dropdown trigger={user.name}>
  <a href="/profile" className="dropdown-item">Profile</a>
  <br/>
  <a className="dropdown-item"><button className='button is-danger is-outlined' onClick={logoutHanlder}>Logout</button></a>
</Dropdown>
        ) : (
        <div class="buttons">
        <a href='/login' class="button is-light is-rounded">
          <i class="fa fa-user mr-3"></i>  Log in
          </a>
        </div>
        )}
      </div>
    </div>
  </div>
</nav>

                </div>
                
                </>
    );
  }


export default Nav;