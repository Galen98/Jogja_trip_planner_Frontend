import axios from 'axios';
import React, { useState, Component, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Bodypopuler from './Bodypopuler';
import Api from '../Api';
function Kategorihome(){
  const [kategori, isKategori] = useState([])
  const fetchKategori = async () =>{
    const response = await Api.get('/api/listkategori');
    const data = await response.data;
    isKategori(data)
    
  }

  useEffect(()=>{
  fetchKategori()
  },[])
  console.log(kategori)
    return(
        <>
            <div className="container">
        <div className="py-5">
        <h3 className="font-weight-bold mb-0 text-center text-capitalize font700 txtblack">Jelajahi Kategori Wisata</h3>
    <div className="mt-5 mb-0 row gx-2 justify-content-center">
    { kategori.map((konten, index) =>  (
      <div className="col-lg-3 col-md-6 mb-3">
      <Link to={`/kategori/${konten.namakategori}`} >
        <div className="hover hover-2 text-white rounded"><img src={konten.image} alt="" style={{minHeight:"260px"}}/>
          <div className="hover-overlay"></div>
          <div className="hover-2-content px-5 py-4">
            <h3 className="hover-2-title text-capitalize font-weight-bold mb-0"> <span class="font-weight-light">{konten.namakategori}</span></h3>
            <p className="hover-2-description mb-0">{konten.deskripsi}</p>
          </div>
        </div>
        </Link>
      </div>
      ))}
    </div>
  </div>
  </div>
  <Bodypopuler/>
        </>
    )
}

export default Kategorihome