import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Breadcrumb } from 'react-bootstrap';
import Api from '../Api';
function Bodyinspirasi(){
    const [inspirasi, setInspirasi] = useState([])

    const fetchinspirasi = async()=>{
        const response = await Api.get('/api/inspirasiperjalanan')
        setInspirasi(response.data)
    }

      useEffect (()=>{
    fetchinspirasi()
      },[])

      console.log(inspirasi)

    return(
        <>
     <div className="container" style={{marginTop:"70px"}}>
    <div className="py-5">
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Inspirasi Perjalanan</Breadcrumb.Item>
    </Breadcrumb>
    <h2 className='text-capitalize fw-bolder txtblack'>Inspirasi Perjalanan untuk anda</h2>
    <div class="mt-3 row gx-3 justify-content-center">
        {inspirasi.map(item => (
    <div className="col-lg-3 col-md-6 mb-3 mt-3">
    <div className="bg-image" style={{display:"flex",flexDirection:"column",height:"100%"}}>
                <a href={`/itinerary/load?itinerary_id=${item.link}`}><img src={item.image} className="w-100 rounded-3 mb-2" style={{maxHeight:"150px"}}/></a>
                <p className='lead fw-normal mb-1 fontprofile text-capitalize'>{item.judul}</p>
                <p className="mb-4">{new Date(item.created_at).toLocaleDateString()}</p>
               <p className='small muted'> <img src={"http://localhost:8000/storage/img/"+item.img_user} class="rounded-9 mb-3" style={{width: "30px"}} alt="Avatar"/> By: {item.nama_user}</p>
              </div>
    </div>
    ))}
    </div>
    </div>
    </div>
        </>
    )
}

export default Bodyinspirasi