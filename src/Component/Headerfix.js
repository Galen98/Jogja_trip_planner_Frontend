import logo from './logonews.png';
import Button from 'react-bootstrap/Button';
import React, { useState, Component, useEffect  } from 'react';
//import hook useHitory from react router dom
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
//import axios
import axios from 'axios';
import Swal from 'sweetalert2'
function Headerfix(){
  const [isActive, setisActive] = useState(false);  
  const user = JSON.parse(localStorage.getItem("userData"));
  const history = useHistory();
  const token = localStorage.getItem("token");
  const isUserlogin = user && user.id;
  const isloginWord = () => {
    return (
      <>
        <div className="text-center" style={{marginTop:"70px", marginBottom:"100px"}}>
        <h1 className="display-5 fw-bold lh-1 mb-3 text-white">Cara baru untuk merencanakan wisata anda di Jogja</h1>
        <p className="fs-3 text-white">Jelajahi berbagai objek wisata di Jogja melalui aplikasi website pariwisata kami. Temukan pemandangan yang menakjubkan, pantai yang indah, pegunungan yang megah, dan budaya.</p>
        <a href='/homeform' className='text-center'>
        <Button variant="dark" className='rounded-9 btn-lg text-capitalize butonprimer' type='submit'>Buat rencana perjalanan</Button>
        </a>
      </div>
      </>
    );
  }
return(
    <>
<div className="heroimage" style={{marginTop:"65px"}}>
  <div className=" container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="row align-items-center g-lg-5 py-5">
      {isUserlogin ? (
        <>
        {isloginWord()}
      </>
      ) : (
        <div className="text-center" style={{marginTop:"70px", marginBottom:"100px"}}>
        <h1 className="display-5 fw-bold lh-1 mb-3 text-white">Cara baru untuk merencanakan wisata anda di Jogja</h1>
        <p className="fs-3 text-white">Jelajahi berbagai objek wisata di Jogja melalui aplikasi website pariwisata kami. Temukan pemandangan yang menakjubkan, pantai yang indah, pegunungan yang megah, dan budaya.</p>
        <a href='/login' className='text-center'>
        <Button variant="dark" className='rounded-9 text-capitalize butonprimer btn-lg' type='submit'>Buat rencana perjalanan</Button>
        </a>
      </div>
          )}
    </div>
  </div> 
  </div>
    </>
)
}
export default Headerfix