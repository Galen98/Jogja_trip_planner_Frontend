import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Bodypopuler from './Bodypopuler';
import Api from '../Api';
import ContentLoader from 'react-content-loader'
function Kategorihome(){
  const [kategori, isKategori] = useState([])
  const [isSkleton, setIsSkleton] = useState(true);
  const fetchKategori = async () =>{
    const response = await Api.get('/api/listkategori');
    const data = await response.data;
    isKategori(data)
    setIsSkleton(false)
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
    {isSkleton ? (
      <>
      {["1", "2","2","2"].map((index) => (
      <div className="col-lg-3 col-md-6 mb-3">
      <ContentLoader
      width="100%" // Set to 100% to make it responsive
      height={400}
      viewBox="0 0 100% 400"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
    >
      <rect x="0%" y="0%" rx="4" ry="4" width="100%" height="50%" />
    </ContentLoader>
    </div>
      ))}
      </>
    ):(
      <>
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
      </>
    )}
    </div>
  </div>
  </div>
  <Bodypopuler/>
        </>
    )
}

export default Kategorihome