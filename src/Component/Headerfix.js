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
useEffect(() => {  
  //call function "fetchData"
  fetchData();
  }, []);
  const isUserlogin = user.id
return(
    <>
<div className="heroimage">
  <div className=" container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="row align-items-center g-lg-5 py-5">
      <div className="col-lg-7 text-center text-lg-start">
        <h1 className="display-4 fw-bold lh-1 mb-3 text-white">Cara baru untuk merencanakan wisata anda di Jogja</h1>
        <p className="col-lg-10 fs-4 text-white">Jelajahi berbagai objek wisata di Jogja melalui aplikasi website pariwisata kami. Temukan pemandangan yang menakjubkan, pantai yang indah, pegunungan yang megah, dan budaya. #AllYouCanVisit</p>
        
      </div>
      {isUserlogin ? (
      <div className="col-md-10 mx-auto col-lg-5">
        <form className="p-4 p-md-5 border rounded-3 bg-light shadow p-3 mb-5 bg-body rounded">
        <p className="text-center"><img src={logo} style={{width:"40px"}}/></p>
          <div className="form-floating mb-3">
          <select className="form-select" aria-label="Default select example">
            <option selected>Tipe Wisatawan</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            </select>
            <label for="floatingInput">Tipe Wisatawan apa anda?</label>
          </div>
          <div className="form-floating mb-3">
          <select className="form-select" aria-label="Default select example">
            <option selected>Pilih Tipe Perjalanan</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            </select>
            <label for="floatingPassword">Tipe Perjalanan Wisata</label>
          </div>
          <div className="form-floating mb-3">
          <select className="form-select" aria-label="Default select example">
            <option selected>Pilih Budget</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            </select>
            <label for="floatingPassword">Budget Wisata</label>
          </div>
          <div className="form-floating mb-3">
          <select className="form-select" aria-label="Default select example">
            <option selected>Pilih hari</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            </select>
            <label for="floatingPassword">Berapa Hari Akan Berwisata?</label>
          </div>
          <br/>
          <button className="w-100 btn btn-dark rounded-9 btn-black text-capitalize" type="submit">Buat Rencana Perjalanan</button>
          <hr className="my-4"/>
        </form>
      </div>
      ) : (
        <a href='/login'>
        <Button variant="dark" className='rounded-7 text-capitalize darkbtn' type='submit'>Buat rencana perjalanan</Button>
        </a>
          )}
    </div>
  </div> 
  </div>
    </>
)
}
export default Headerfix