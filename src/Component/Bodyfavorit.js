import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import LikeButton from './LikeButton';
function Bodyfavorit(){
  const [locationFetched, setLocationFetched] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const userToken = localStorage.getItem("token")
  const [userlike, setUserlike] = useState([])


  const fetchnearby = async(latitude, longitude) =>{
    try{
      const response = await axios.post(`http://localhost:8000/api/user/likeswisata`,
        {
          latitude: latitude,
          longitude: longitude,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setUserlike(response.data)
    } catch (error){
      console.log(error)
    }
  }



  useEffect(() => {
    if (!locationFetched && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationFetched(true);
          setUserLocation([latitude, longitude]);
          fetchnearby(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported in this browser.');
    }
  }, [locationFetched]);


  useEffect(() => {
    Swal.fire({
      title: 'Info!',
      text: 'Buat rencana perjalanan wisata anda berdasarkan tempat wisata yang anda sukai',
      icon: 'info',
      confirmButtonColor: '#1071ec',
      confirmButtonText: 'Ok',
    });
  }, []);
    

    useEffect(()=>{
        
    },[])
    console.log(userLocation)

    const clickbuatitinerary = async () => {
      const { value: selectedValues } = await Swal.fire({
        title: 'Buat rencana perjalanan',
      html:
        '<label for="exampleInputEmail1" class="form-label">Berapa hari anda akan berwisata?</label>'+
        '<select id="select1" class="form-control">' +
        '<option value="1">1 Hari</option>' +
        '<option value="2">2 Hari</option>' +
        '</select>' +
        '<br>'+
        '</select>',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonText: 'Buat',
      confirmButtonColor: '#1071ec',
      preConfirm: () => {
        return [
          document.getElementById('select1').value,
          document.getElementById('select2').value,
        ];
      },
      inputValidator: (value) => {
        if (!value[0] || !value[1]) {
          return 'Pilih kedua opsi!';
        }
      },
    });

    if (selectedValues) {
      console.log('Opsi yang dipilih:', selectedValues);
    }
  };
    return(
        <>
    <div className="container" style={{marginTop:"70px"}}>
    <div className="py-5">

    {userlike.length === 0 ? (
        <center>
        <div className="col-sm-8 mb-10"><img src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-485.jpg" style={{width:"320px"}}/>
        <p className='text-capitalize text-muted'>Tidak Ada wisata yang anda sukai</p></div>
    </center>
        ) : (
    <div className="row gx-5">
    <div className="col-md-6">
    { userlike.map((konten, index) =>  (
    <Card className="horizontal-card mb-4 border-0 shadow-sm">
      <div className="row no-gutters">
        <div className="col-md-4">
          <Card.Img style={{objectFit:"cover", minHeight:"200px"}}
            src={konten.image}
            alt="Card image"
          />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Title>{konten.nama}</Card.Title>
            <Card.Text>
            <div className="ms-auto text-warning"><Rating  value={konten.rating} maxValue={5}/></div>
            <div className='text-dark mb-2'>Jarak: {konten.distance.toFixed(1)} KM</div>
            <LikeButton attractionId={konten.wisata_id} userToken={userToken} /><br/><br/>
              {konten.deskripsi.slice(0, 50)}........
               <a href='' className='hoverfavorit' style={{marginLeft:"5px"}}>Lihat lebih lanjut <i className="fa fa-angle-double-right"></i></a>
            </Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
    ))}
   <center> <button onClick={clickbuatitinerary} className='btn-black btn btn-sm rounded-9 mt-4 mb-4'>Buat Rencana Perjalanan Wisata</button>
   
   </center>

    </div>

    <div className="col-md-6 text-center">
          <h1 className='txtblack'>Rekomendasi Wisata</h1>
          <p>Berdasarkan tempat wisata yang disukai</p>
          <a href='/rekomendasi'><u>Lihat rekomendasi wisata</u></a>
    </div>

  </div>
  )}
    </div>
    </div>
    
        </>
    )
}

export default Bodyfavorit