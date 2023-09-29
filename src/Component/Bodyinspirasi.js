import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import Api from '../Api';
import Swal from 'sweetalert2';
import ContentLoader from 'react-content-loader'
function Bodyinspirasi(){
    const [isLoading, setIsLoading] = useState(true)
    const [inspirasi, setInspirasi] = useState([])
    const [isSkleton, setIsSkleton] = useState(true);
    useEffect(() => {
        if (isLoading) {
          Swal.fire({
            title: 'Loading',
            text: 'Mohon tunggu...',
            allowOutsideClick: false,
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 2000,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });
        } else {
          Swal.close();
        }
      }, [isLoading]);

    const fetchinspirasi = async()=>{
        setIsLoading(true)
        try{
        const response = await Api.get('/api/inspirasiperjalanan')
        setInspirasi(response.data)
        setIsLoading(false)
        setIsSkleton(false)
        } catch(error){
        setIsLoading(false)
        }
        
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
    {isSkleton ? (
        <>
      {["1", "2","2","2"].map((index) => (
    <div className="col-lg-3 col-md-6 mb-3 mt-3">
      <ContentLoader
      width="100%"
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
    ): (
        <> 
        {inspirasi.map(item => (
    <div className="col-lg-3 col-md-6 mb-3 mt-3">
    <div className="bg-image" style={{display:"flex",flexDirection:"column",height:"100%"}}>
                <a href={`/itinerary/load?itinerary_id=${item.link}`}><img src={item.image} className="w-100 rounded-3 mb-2" style={{minHeight:"150px",maxHeight:"150px"}}/></a>
                <p className='lead fw-normal mb-1 fontprofile text-capitalize'>{item.judul}</p>
                <p className="mb-4">{new Date(item.created_at).toLocaleDateString()}</p>
               <p className='small muted'> By: {item.nama_user}</p>
              </div>
    </div>
    ))}
        </>
    )}

    </div>
    </div>
    </div>
        </>
    )
}

export default Bodyinspirasi