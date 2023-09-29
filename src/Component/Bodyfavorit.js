import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Card, Breadcrumb } from 'react-bootstrap';
import Rating from './Rating';
import LikeButton from './LikeButton';
import Modal from 'react-bootstrap/Modal';
import { useHistory,useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Api from '../Api';
import ContentLoader from 'react-content-loader'
function Bodyfavorit(){
  const [locationFetched, setLocationFetched] = useState(false);
  const [isSkleton, setIsSkleton] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('')
  const userToken = localStorage.getItem("token")
  const [userlike, setUserlike] = useState([])
  const [show, setShow] = useState(false);
  const [jumlah_hari, setJumlahHari] = useState('');
  const [tipeaktivitas, setTipeaktivitas] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hotel, setHotel] = useState('');
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [isLoading, setIsLoading] = useState(true);
  const [notif, setIsnotif] = useState(true)
  const itineraryId = urlParams.get('itinerary_id');

  const fetchnearby = async(latitude, longitude) =>{
      
      setIsnotif(true)
    try{
      const response = await Api.post(`/api/user/likeswisata`,
        {
          latitude: latitude,
          longitude: longitude,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      
      
      setUserlike(response.data)
      setIsSkleton(false)
      
    } catch (error){
      console.log(error)
      // setIsLoading(false)
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
    if(notif){
    Swal.fire({
      title: 'Info!',
      text: 'Buat rencana perjalanan wisata anda berdasarkan tempat wisata yang anda sukai',
      icon: 'info',
      confirmButtonColor: '#1071ec',
      confirmButtonText: 'Ok',
    })}
    fetchLocation()
  }, [notif]);

  const fetchLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported in this browser.');
    }
  };

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };



  const handleSubmit = async () => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        throw new Error("User token not found");
      }
  
      const response = await Api.get(`/api/trip-planner`, {
        
        params: {
          user_latitude: latitude,
          user_longitude: longitude,
          jumlah_hari: jumlah_hari,
          makanan: selectedOptions,
          hotel: tipeaktivitas
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        }, 
      });

      const data = response.data;
      console.log('Trip plan created:', data);


      if (data) {
        const itineraryId = data.itinerary_id;
        const makanan = data.makanan
        await Api.post('/api/create-itinerary', {
        itinerary_id: itineraryId,
        trip_plan: data.trip_plan, 
        makanan: makanan,
      });
      history.push(`/itinerary?itinerary_id=${itineraryId}`, {
      })
      }
      handleClose();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
    
    return(
        <>
    <div className="container" style={{marginTop:"70px", overflow:"hidden"}}>
    <div className="py-5">
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Favorite</Breadcrumb.Item>
    </Breadcrumb>
    <h2 className='txtblack'>Wisata Favorit Anda</h2>
    <br/>
    {isSkleton ? (
      <p></p>
    ):(
      <>
      {userlike.length === 0 ? (
  <>
    <center>
      <div className="col-sm-8 mb-10">
        <img src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-485.jpg" style={{ width: "320px" }} />
        <p className='text-capitalize text-muted'>Tidak Ada wisata yang anda sukai</p>
      </div>
    </center>
  </>
) : null}
</>
    )}

    <div className="row gx-5">
    <div className="col-md-6">
    <>

{isSkleton ? (
  <>
  <Card className="horizontal-card mb-4" style={{border:"none", boxShadow:"none"}}>
  <ContentLoader
      width="100%"
      height={400}
      viewBox="0 0 100% 400"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
    >
      <rect x="0%" y="0%" width="100%" height="50%" />
    </ContentLoader>
    </Card>
    </>
): (
  <>
  { userlike.map((konten, index) =>  (    
    <Card className="horizontal-card mb-4" style={{border:"none", boxShadow:"none"}}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <a href={`/wisata/${konten.wisata_id}`}><Card.Img style={{objectFit:"cover", height:"200px"}}
            src={konten.image}
            alt="Card image"
          /></a>
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Title><a href={`/wisata/${konten.wisata_id}`} className='txtblack'>{konten.nama}</a></Card.Title>
            <Card.Text>
            <div className="ms-auto text-warning"><Rating  value={konten.rating} maxValue={5}/></div>
            <div className='text-dark mb-2'>Jarak: {konten.distance.toFixed(1)} KM</div>
            <LikeButton attractionId={konten.wisata_id} userToken={userToken} /><br/><br/>
              {konten.deskripsi.slice(0, 50)}....
               <a href={`/wisata/${konten.wisata_id}`} className='hoverfavorit' style={{marginLeft:"5px"}}>Lihat lebih lanjut <i className="fa fa-angle-double-right"></i></a>
            </Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
    ))}
   <center> 
   <button onClick={handleShow}  className="btn btn-outline-primary custom-button rounded-9 mt-4 mb-4">Buat Rencana Perjalanan Wisata</button>
   </center>

   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        
        <br/>
        <Modal.Title>Buat rencana perjalanan wisata</Modal.Title></div>
        
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="jumlahHari">
              <Form.Label>Berapa hari Anda akan berwisata?</Form.Label>
              <Form.Control
                type="number"
                value={jumlah_hari}
                onChange={(e) => setJumlahHari(e.target.value)}
                max={6}
                min={1}
              />
            </Form.Group>
            <Form.Group controlId="jumlahHari">
            <br/>
        <Form.Label>Apa preferensi makanan anda?</Form.Label>
        <Form.Check
          type="checkbox"
          label="Jawa"
          id="checkbox1"
          value={selectedOptions}
          checked={selectedOptions.includes("Jawa")}
          onChange={() => handleOptionChange("Jawa")}
        />
        <Form.Check
          type="checkbox"
          label="Khas Jogja"
          id="checkbox2"
          value={selectedOptions}
          checked={selectedOptions.includes("Khas")}
          onChange={() => handleOptionChange("Khas")}
        />
        <Form.Check
          type="checkbox"
          label="International"
          id="checkbox3"
          value={selectedOptions}
          checked={selectedOptions.includes("International")}
          onChange={() => handleOptionChange("International")}
        />
        <Form.Check
          type="checkbox"
          label="Seafood"
          id="checkbox3"
          value={selectedOptions}
          checked={selectedOptions.includes("Seafood")}
          onChange={() => handleOptionChange("Seafood")}
        />
        <Form.Check
          type="checkbox"
          label="Nusantara"
          id="checkbox3"
          value={selectedOptions}
          checked={selectedOptions.includes("Nusantara")}
          onChange={() => handleOptionChange("Nusantara")}
        />
        <Form.Check
          type="checkbox"
          label="Coffe shop"
          id="checkbox3"
          value={selectedOptions}
          checked={selectedOptions.includes("Coffe shop")}
          onChange={() => handleOptionChange("Coffe shop")}
        />
        <Form.Check
          type="checkbox"
          label="China"
          id="checkbox3"
          value={selectedOptions}
          checked={selectedOptions.includes("China")}
          onChange={() => handleOptionChange("China")}
        />
        <Form.Check
          type="checkbox"
          label="Mie"
          id="checkbox3"
          value={selectedOptions}
          checked={selectedOptions.includes("Mie")}
          onChange={() => handleOptionChange("Mie")}
        />
      </Form.Group>
      <br/>
      
            <Form.Group controlId="latitude">
              <Form.Control
                type="hidden"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="longitude">
              <Form.Control
                type="hidden"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="tipeperjalanan">
        <Form.Label>Preferensi hotel:</Form.Label>
        <Form.Control
          as="select"
          value={tipeaktivitas}
          onChange={(e) => setTipeaktivitas(e.target.value)}
        >
        <option>Pilh hotel</option>
        <option value="OYO">OYO</option>
        <option value="RedDoorz">RedDoorz</option>
          <option value="0.0">Hotel Non bintang</option>
          <option value="1.0">Bintang 1</option>
          <option value="2.0">Bintang 2</option>
          <option value="3.0">Bintang 3</option>
          <option value="4.0">Bintang 4</option>
          <option value="5.0">Bintang 5</option>
        </Form.Control>
        
      </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Buat
          </Button>
        </Modal.Footer>
      </Modal>
      </>
)}
</>
    </div>
    {userlike.length !== 0 ? (
  <>
  <div className="col-md-6 text-center">
          <h1 className='txtblack'>Rekomendasi Wisata</h1>
          <p>Berdasarkan tempat wisata yang disukai</p>
          <a href='/rekomendasi'><u>Lihat rekomendasi wisata</u></a>
    </div>
  </>
    ) : null}
  </div>

    </div>
    </div>
    
        </>
    )
}

export default Bodyfavorit