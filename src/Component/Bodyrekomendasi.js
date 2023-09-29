import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import { Breadcrumb } from 'react-bootstrap';
import LikeButton from './LikeButton';
import Api from '../Api';
function Bodyrekomendasi(){
    const userToken = localStorage.getItem("token")
    const[userrekomendasi, setUserrekomendasi] = useState([])
    const token = localStorage.getItem('token')
    const Fetchrekomendasi = async()=>{
        const response = await Api.get (`/api/user/recommendations`, {
            headers:{
                Authorization: `Bearer ${userToken}`
            }
        })

        const allRecommendations = Object.values(response.data).reduce(
            (combined, current) => combined.concat(current),
            []
          );

          setUserrekomendasi(allRecommendations)
    }

    useEffect(() => {
        Fetchrekomendasi()
    }, [])

    console.log(userrekomendasi)
    return(
        <>
        <div className="container" style={{marginTop:"70px"}}>
    <div className="py-5">
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/favorite">Favorites</Breadcrumb.Item>
      <Breadcrumb.Item active>Rekomendasi Wisata</Breadcrumb.Item>
    </Breadcrumb>
    <h2 className='text-capitalize txtblack fw-bolder'>Rekomendasi untuk anda</h2>
    <div class="mt-3 row gx-3 justify-content-center">
     {userrekomendasi.map(item => (
        <div className="col-lg-3 col-md-6 mb-3 mt-3">
    <div className="card shadow-0" style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <a className='hover hover-2 rounded-6' href={`/wisata/${item.id}`}>
       <img src={item.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"200px"}}/>
        <div className="hover-overlay"></div>
        </a>
      <div className="card-body" style={{flexGrow:"1"}}>
        <div className="d-flex justify-content-between">
        <p className="small text-muted"><i className="fa-regular fa-clock"></i>  {item.operating_hours}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="small">{item.kategori}</p>
          <LikeButton attractionId={item.id} userToken={token} />
        </div>
        <div className="d-flex justify-content-between mb-3 mt-3">
          <h5 className="mb-0">{item.nama}</h5>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <p className="text-muted mb-0">Ratings: <span class="fw-bold">({item.rating})</span></p>
          <div className="ms-auto text-warning">
          <Rating value={item.rating} maxValue={5} />
          </div>
        </div>
      </div>
    </div>
  </div>
        ))}
        </div>
        </div>
        </div>
        </>
    )
}

export default Bodyrekomendasi