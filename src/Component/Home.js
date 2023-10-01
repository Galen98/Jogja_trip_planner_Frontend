import React, { useState } from 'react';
import Regisinfo from './Regisinfo';
import { useHistory } from 'react-router';
import Keuntungan from './Keuntungan';
import Kategorihome from './Kategorihome';

function Home(){
  const user = JSON.parse(localStorage.getItem("userData"));
  const [kategori, setKategori] = useState({});
  const history = useHistory();
  const token = localStorage.getItem("token");

  const isLogin = user && user.id

return(
    <>
    <div className="container py-5">
    <div className="py-5">
    <h3 className="font-weight-bold mb-5 text-center text-capitalize font700 txtblack">Buat rencana perjalanan wisata anda dengan mudah</h3>
    <center>
    <div className="mt-5 row gx-4 justify-content-center">
      <div className="col-lg-3 col-md-12 mb-3 ">
      <img src="https://i.ibb.co/3fS4bxY/Screenshot-2023-10-02-at-01-06-03.png" style={{width:"200px"}}/>
      <h5 className="mt-4 font-weight-bold text-capitalize text-center font600 txtblack">Dapatkan perjalanan wisata</h5>
      <p className="mt-2 font-weight-bold text-center">Jadwal itinerary hari demi hari penuh <br/> berdasarkan preferensi Anda</p>
      </div>

      <div className="col-lg-3 col-md-12 mb-3 ">
      <img src="https://i.ibb.co/QFSbV4D/Screenshot-2023-10-02-at-01-06-15.png" style={{width:"200px"}}/>
      <h5 className="mt-4 font-weight-bold text-capitalize text-center font600 txtblack">Sesuaikan perjalanan anda</h5>
      <p className="mt-2 font-weight-bold text-center">Buat rencana wisata anda sendiri berdasarkan wisata favorite anda. <br/></p>
      </div>

      <div className="col-lg-3 col-md-12 mb-3 ">
      <img src="https://i.ibb.co/WnQknmm/Screenshot-2023-10-02-at-01-06-29.png" style={{width:"200px"}}/>
      <h5 className="mt-4 font-weight-bold text-capitalize text-center font600 txtblack">Simpan perjalanan anda</h5>
      <p className="mt-2 font-weight-bold text-center">Simpan rencana perjalanan wisatamu. Akses sesuai keinginanmu</p>
      </div>
    </div>    
    </center>
    {isLogin ? (
     <Kategorihome/>
    ) : (
      <Regisinfo/>
      )}
    <center>
    {isLogin ? (
    <p></p>
    ) : (
    <Keuntungan/>
    )}    
    </center>
    </div>
    </div>
    <div style={{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1592106574625-0a404da5fba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80) center center`,backgroundSize:"cover",backgroundRepeat:"no-repeat",height:"300px"}}>
    <div className=" container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="row align-items-center g-lg-5 py-5">
      <div className="text-center">
      <h5 className="display-5 fw-bold lh-1 mb-3 text-white">jogja is a travel memories you'll never forget</h5>
      </div>
      </div>
      </div>
      </div>   
    </>
)
}

export default Home