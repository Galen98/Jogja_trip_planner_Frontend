import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Navfix from '../Component/Navfix';
import Swal from 'sweetalert2'
import { Breadcrumb } from 'react-bootstrap';
import Api from '../Api';
import Komponenheaderprofile from '../Component/Komponenheaderprofile';
import Footerfix from '../Component/Footerfix';
function Profile() {
    const [user, setUser] = useState({});
    const history = useHistory();
    const token = localStorage.getItem("token");
    const [itineraryuser, setItineraryuser] = useState([])
    const [itineraryToDelete, setItineraryToDelete] = useState(null);
    const fetchData = async () => {
        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await Api.get('/api/user')
        .then((response) => {
            setUser(response.data);
        })
    }
    const fetchitinerary = async() =>{
        try{
            const userToken = localStorage.getItem("token");
                if (!userToken) {
                    throw new Error("User token not found");
                }
            const response = await Api.get(`/api/user/itinerary`,
              {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
              }
            )
            setItineraryuser(response.data)
          } catch (error){
            console.log(error)
          }
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
            history.push('/profile');
        }
        else{
            history.push('/login');
        }
    }, []);

    useEffect(() => {
        if(!token) {
            history.push('/login');
        }
        fetchitinerary()
        fetchData()
    }, []);

    const hapusbtn = async(itineraryId)=>{
        if (!itineraryId) {
            return;
          }
        Swal.fire({
            title: 'Konfirmasi Hapus',
            text: 'Apakah Anda yakin ingin hapus?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'grey',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal'
          }).then(async (result)=> {
            if(result.isConfirmed){
                try{
                await Api.delete(`/api/hapusitinerary/${itineraryId}`);
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Berhasil dihapus!',
                  }).then(()=>{
                    window.location.reload();
                  })
                }catch(err){
                    console.log(err)
                }
            }
          })
    }
   
    const isTipe =user.tipe

return(
    <>
    <Navfix/>
    <div className="container" style={{marginTop:"70px"}}>
    <div className="py-5">
<div className='row d-flex justify-content-center align-items-center'>
<div className='col col-lg-9 col-xl-7'>
<Breadcrumb>
<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
<Breadcrumb.Item active>Profile</Breadcrumb.Item>
</Breadcrumb>
<Komponenheaderprofile/>
<div className='p-4 text-black bg-light'>
<div className='card-body p-4 text-black'>
<div className='mb-5'>
<br/>
<br/>
<br/>
<h4 className='lead fw-bold mb-1 txtblack' style={{fontWeight:"bold",marginTop:"-55px"}}>Tentang saya</h4>
<br/>
<p className='lead fw-normal mb-1 fontprofile'>Siapakah anda sebagai wisatawan?</p>
{isTipe == 'grup' ? (
    <input className='form-control fontisi' style={{border:"none"}}  value="Grup Wisata" readOnly />
) : (
    <p></p>
)}
{isTipe == 'backpacker' ? (
    <input className='form-control fontisi' style={{border:"none"}}  value="Wisatawan Backpacker" readOnly />
) : (
    <p></p>
)}
{isTipe == 'family' ? (
    <input className='form-control fontisi' style={{border:"none"}} value="Wisatawan Keluarga" readOnly />
) : (
    <p></p>
)}
<br/>
<p className='lead fw-normal mb-1 fontprofile'>Motivasi</p>
<textarea className='form-control fontisi' style={{height:"100px", border:"none"}} value={user.motivation} readOnly></textarea>
<br/>
<p className='lead fw-normal mb-1 fontprofile text-capitalize'>Pekerjaan</p>
<input className='form-control fontisi' style={{border:"none"}}  value={user.job} readOnly />
<br/>
<p className='lead fw-normal mb-1 fontprofile text-capitalize'>Usia</p>
<input className='form-control fontisi' style={{border:"none"}}  value={user.usia} readOnly />
</div>
<div className="d-flex justify-content-between align-items-center mb-4">
<h4 className='lead fw-bold mb-1 txtblack' style={{fontWeight:"bold"}}>History rencana perjalanan wisata</h4>
</div>
<div className="row">
{itineraryuser.map((konten,index) => (
              <div className="bg-image col-md-6 mb-5">
              {konten.tipe === "backpacker" ? (
      <a href={`/itinerarybackpacker?itinerary_id=${konten.link}`}>
      <img src={konten.image} className="w-100 rounded-3 mb-2" style={{minHeight:"180px",maxHeight:"180px",maxWidth:"300px",minWidth:"300px"}}/>
      </a>
    ) :  konten.tipe === "keluarga" ? (
  <a href={`/itinerarykeluarga?itinerary_id=${konten.link}`}>
    <img src={konten.image} className="w-100 rounded-3 mb-2" style={{minHeight:"180px",maxHeight:"180px",maxWidth: "300px",minWidth:"300px" }} />
  </a>
) : konten.tipe === "grup" ? (
  <a href={`/itinerarygrup?itinerary_id=${konten.link}`}>
    <img src={konten.image} className="w-100 rounded-3 mb-2" style={{minHeight:"180px",maxHeight:"180px",maxWidth: "300px",minWidth:"300px" }} />
  </a>
) : (
      <a href={`/itinerary/load?itinerary_id=${konten.link}`}>
      <img src={konten.image} className="w-100 rounded-3 mb-2" style={{minHeight:"180px",maxHeight:"180px",maxWidth:"300px",minWidth:"300px"}}/>
      </a>
    )}
                <p className='lead fw-normal mb-0 fontprofile text-capitalize'>{konten.judul}</p>
                <p className="mb-4">{new Date(konten.created_at).toLocaleDateString()}</p>
                <button className='btn mb-0 btn-outline-danger btn-sm rounded-9' onClick={()=>{
                    hapusbtn(konten.link)
                }}><i class="fa fa-trash-o"></i> Hapus</button>
              </div>
              ))}
            </div>
</div>
</div>
</div>
</div>
</div>
</div>
<Footerfix/>
</>

)
}

export default Profile;