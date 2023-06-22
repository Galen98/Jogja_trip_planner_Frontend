/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, Component, useEffect  } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'

//import axios
import axios from 'axios';
import Dropdown from 'react-bulma-dropdown'
import 'react-bulma-dropdown/dist/main.css';
import Swal from 'sweetalert2'
  
function Header() {
  
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
      Swal.fire({
        icon: 'error',
        title: 'logout',
        text: 'Berhasil logout!',
      })
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

const isRekomen = user.id
    
    return (
        <>
        <div>
        <style scoped>
            @import "https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"
            </style>
            <nav class="navbar is-black is-fixed-top" role="navigation" aria-label="main navigation">
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
  {isRekomen ? (
    <div class="navbar-start">
    
      <a class="navbar-item has-text-white">
        Home
      </a>
      <a class="navbar-item has-text-white">
        Artikel
      </a>
      <a class="navbar-item has-text-white">
        Wisata
      </a>
      <a class="navbar-item has-text-white">
        About
      </a>
      
      
    </div>
    ) : (
      <p></p>
    )}

    <div className="navbar-end">
      <div className="navbar-item is-capitalized">
      {token ? (
        <Dropdown trigger={user.name}>
  <a href="/profile" className="dropdown-item">Profile</a>
  <br/>
  <a className="dropdown-item"><button className='button is-danger is-outlined' onClick={logoutHanlder}>Logout</button></a>
</Dropdown>
        ) : (
        <div className="buttons">
          <a href='/login' class="button is-light is-rounded">
          <i className="fa fa-user mr-2"></i>  Masuk
          </a>
          <a href='/register' class="button is-link is-rounded">
           Registrasi
          </a>
        </div>
        )}
      </div>
    </div>
  </div>
</nav>

<section className="hero heros is-large mt-6">
  <div className="hero-body">
    <p className="title has-text-white is-size-2 has-text-centered">
    Cara baru untuk merencanakan wisata anda di Jogja
    </p>
    
    <p className="subtitle has-text-white has-text-centered">
    Lebih dari 100 tempat wisata Jogja akan direkomendasikan sesuai kebutuhan anda
    </p>
    <br/>
    <p className="subtitle has-text-white has-text-centered">
    {isRekomen ? (
      <Link to="/rekomendasi" className="button is-rounded"><i className="fa fa-arrow-right mr-3" aria-hidden="true"></i> Cari rekomendasi</Link>
    ) : (
      <Link to="/login" className="button is-rounded"><i className="fa fa-arrow-right mr-3" aria-hidden="true"></i> Cari rekomendasi</Link>
    )}
    </p>
  </div>
</section>
                </div>
                
                </>
    );
  }


export default Header;