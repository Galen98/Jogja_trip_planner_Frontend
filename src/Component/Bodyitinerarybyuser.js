import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import Slider from 'react-slick';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHistory} from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Api from '../Api';
function Bodyitinerarybyuser(){
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const itineraryId = urlParams.get('itinerary_id');
  const[loaditinerary, setLoaditinerary] = useState([])
  const [selectedDay, setSelectedDay] = useState(1); 
  const center = [-7.8013966, 110.3621892];
  const zoom = 12;
  const [weatherData, setWeatherData] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [image, setImage] = useState()
  const history = useHistory()
  const [share, setShare] = useState(1)
  const [isLoading, setIsLoading] = useState(true);
  const [resto, setResto] = useState([])
  const dataresto = Object.values(resto)
  const [paket, setPaket] = useState([])
  const datapaket = Object.values(paket)
  const [isRestaurantOpen, setRestaurantOpen] = useState(false); 
  const [isPaketOpen, setPaketOpen] = useState(false)
  const handleDayChange = (e) => {
    setSelectedDay(parseInt(e.target.value, 10)); 
  };
  
  const CustomPrevArrow = (props) => (
    <button {...props} className="custom-prev-arrow">
      <i className="fas fa-chevron-left"></i>
    </button>
  );

  const CustomNextArrow = (props) => (
    <button {...props} className="custom-next-arrow">
      <i className="fas fa-chevron-right"></i>
    </button>
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
    ]
  };

  const handleSubmit = async () => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        throw new Error("User token not found");
      }
      const response = await Api.post(`/api/saveitineraryuser/${itineraryId}`, {
      caption: deskripsi,
      judul: judul,
      image: image,
      share: share,
      tipe: 'universal'
}, {
  headers: {
    Authorization: `Bearer ${userToken}`,
  }
})
    history.push("/profile");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Berhasil Disimpan!',
    })
    }catch (error) {
      console.error('Error:', error.message);
    }
  }

  const fetchresto = async () =>{
    const response = await Api.get(`/api/rekomendasiresto/${itineraryId}`)
    setResto(response.data)
  }

  const fetchpaket = async () =>{
    const response = await Api.get('/api/paketwisata')
    setPaket(response.data)
  }

    useEffect(()=>{
      const fetchitinerary = async () => {
        if (itineraryId) {
          setIsLoading(true)
          try{
          const response = await Api.get(`/api/loaditinerary/${itineraryId}`);
          setLoaditinerary(response.data);
          setIsLoading(false);
    
          }catch(error){
          console.error('Error fetching data:', error);
          setIsLoading(false);
          }
          
        }
      };
      setSelectedDay(1);
      fetchresto()
      fetchpaket()
      if (itineraryId) {
        fetchitinerary();
      }
    },[itineraryId])

    useEffect(() => {
      if (isLoading) {
        Swal.fire({
          title: 'Loading',
          text: 'Mohon tunggu...',
          allowOutsideClick: false,
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

      useEffect(() => {
      const initialImageValue = loaditinerary
      .filter((day) => day.Hari === selectedDay)
      .map((day) => day.Tempatwisata.pagi?.image)[0];

    if (initialImageValue) {
      setImage(initialImageValue);
    }
    }, [itineraryId, selectedDay, loaditinerary]); 
       
    return(
        <>
<div className="container" style={{marginTop:"70px", marginBottom:"40px"}}>
    <div className="py-5">
    <div className="row gx-5">
    <div className="col-md-6">
    <h5 className='txtblack fw-bolder'>Pilih Itinerary Yang Ingin Ditampilkan</h5>
    <select value={selectedDay} className="form-select rounded-7" aria-label="Default select example" onChange={handleDayChange}>
        {loaditinerary.map((day, index) => (
          <option key={index} value={day.Hari}>
            Hari ke-{day.Hari}
          </option>
        ))}
      </select>
      <hr/>
      <br/>
      <h4 className='txtblack fw-bold'>Hari {selectedDay}:</h4>   
  <div className="itinerary-container">
  {loaditinerary
    .filter((day) => day.Hari === selectedDay)
    .map((day, index) => (
      <div>
      {day.Tempatwisata && (

        <div>
        {typeof day.Tempatwisata['Hotel'] === 'object' ? (
          <div className="itinerary-card">
        <img src={day.Tempatwisata.Hotel.image}  className="itinerary-image" />
        <div className="itinerary-content">
        <p>Waktu: 08.00 - Check in Hotel</p>
          <h4>{day.Tempatwisata.Hotel.name}</h4>
          <a className='btn btn-outline-primary custom-button mt-1 rounded-9' href={day.Tempatwisata.Hotel.webUrl} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan info</a>
        </div>
      </div>
          ) : (
            <div className="itinerary-card">
        <div className="itinerary-content">
        <p>Waktu: 08.00 </p>
          <h4>Persiapan menuju lokasi wisata</h4>
        </div>
      </div>
          )}

          {day.Tempatwisata['Makanpagi'] && (
              <div className="itinerary-card">
        <img src={day.Tempatwisata['Makanpagi'].image}  className="itinerary-image" />
        <div className="itinerary-content">
        <p>Waktu: 08.30 - Sarapan</p>
          <h4>{day.Tempatwisata['Makanpagi'].nama}</h4>
          <a className='btn btn-outline-primary custom-button mt-1 rounded-9' href={day.Tempatwisata['Makanpagi'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
        </div>
      </div>
            )}

            {day.Tempatwisata['pagi'] && (
              <div className="itinerary-card">
        <img src={day.Tempatwisata['pagi'].image}  className="itinerary-image" />
        <div className="itinerary-content">
          <p>Waktu: 09.00 - {day.Tempatwisata['pagi'].descitinerary}</p>
          <h4 className='text-capitalize'><a className='txtblack text-decoration-underline' href={`/wisata/${day.Tempatwisata['pagi'].wisata_id}`}>{day.Tempatwisata['pagi'].nama}</a></h4>
          <div className="ms-auto text-warning"><Rating  value={day.Tempatwisata['pagi'].rating} maxValue={5}/></div>
          <a className='btn btn-outline-primary custom-button mt-1 rounded-9' href={day.Tempatwisata['pagi'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
        </div>
      </div>
            )}

            {day.Tempatwisata['Makansiang'] && (
              <div className="itinerary-card">
        <img src={day.Tempatwisata['Makansiang'].image}  className="itinerary-image" />
        <div className="itinerary-content">
        <p>Waktu: 11.00 - Makan Siang</p>
          <h4>{day.Tempatwisata['Makansiang'].nama}</h4>
          <a className='btn btn-outline-primary custom-button mt-1 rounded-9' href={day.Tempatwisata['Makansiang'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
        </div>
      </div>
            )}

            {day.Tempatwisata['siang'] && (
              <div className="itinerary-card">
        <img src={day.Tempatwisata['siang'].image}  className="itinerary-image" />
        <div className="itinerary-content">
          <p>Waktu: 13.00 - {day.Tempatwisata['siang'].descitinerary}</p>
          <h4 className='text-capitalize'><a className='txtblack text-decoration-underline' href={`/wisata/${day.Tempatwisata['siang'].wisata_id}`}>{day.Tempatwisata['siang'].nama}</a></h4>
          <div className="ms-auto text-warning"><Rating  value={day.Tempatwisata['siang'].rating} maxValue={5}/></div>
          <a className='btn btn-outline-primary mt-1 custom-button rounded-9' href={day.Tempatwisata['siang'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
        </div>
      </div>
            )}

            {day.Tempatwisata['malam'] && (
              <div className="itinerary-card">
        <img src={day.Tempatwisata['malam'].image}  className="itinerary-image" />
        <div className="itinerary-content">
          <p>Waktu: 15.00 - {day.Tempatwisata['malam'].descitinerary}</p>
          <h4 className='text-capitalize'><a className='txtblack text-decoration-underline' href={`/wisata/${day.Tempatwisata['malam'].wisata_id}`}>{day.Tempatwisata['malam'].nama}</a></h4>
          <div className="ms-auto text-warning"><Rating  value={day.Tempatwisata['malam'].rating} maxValue={5}/></div>
          <a className='btn btn-outline-primary mt-1 custom-button rounded-9' href={day.Tempatwisata['malam'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
        </div>
      </div>
            )}

            {day.Tempatwisata['Makanmalam'] && (
              <div className="itinerary-card">
        <img src={day.Tempatwisata['Makanmalam'].image}  className="itinerary-image" />
        <div className="itinerary-content">
        <p>Waktu: 17.30 - Makan Malam</p>
          <h4>{day.Tempatwisata['Makanmalam'].nama}</h4>
          <a className='btn btn-outline-primary custom-button mt-1 rounded-9' href={day.Tempatwisata['Makanmalam'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
        </div>
      </div>
            )}
            
            {day.Tempatwisata['Malam'] && (
              <div className="itinerary-card">
        <div className="itinerary-content">
        <p>Waktu: 19.00 </p>
          <h4>Perjalanan kembali ke Hotel</h4>
        </div>
      </div>
            )}
            
         
        </div>
      )}

      </div>
    ))}
</div>
<br/>
       <center><button onClick={handleShow} className='btn butonprimer rounded-9'>Simpan rencana perjalanan</button></center>
         <br/>
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <br/>
        <Modal.Title>Simpan rencana perjalanan</Modal.Title>
        </div>        
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="exampleTextarea">
          <Form.Label>Berikan judul rencana perjalanan anda</Form.Label>
          <Form.Control
            as="input"
            rows={2} 
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="exampleTextarea">
          <Form.Label>Berikan deskripsi rencana perjalanan anda</Form.Label>
          <Form.Control
            as="textarea"
            rows={4} 
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </Form.Group>
        {loaditinerary
  .filter((day) => day.Hari === selectedDay)
  .map((day, index) => (
    <Form.Group controlId="exampleTextarea">
      {day.Tempatwisata && day.Tempatwisata['pagi'] && (
        <Form.Control
            type="hidden"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
      )}
      </Form.Group>
  ))}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Simpan
          </Button>
        </Modal.Footer>
          </Form>
         </Modal.Body>
        </Modal> 

      </div>
      <div className="col-md-6 text-center">
      <ul class="horizontal-list" style={{marginBottom:"30px"}}>
        <li><a className='btn btn-light rounded-9 text-capitalize' onClick={() => setPaketOpen(!isPaketOpen)}>
                <img src="https://wonderplan.ai/icons/plan/accommodation.svg" alt="accommodation" style={{width:"15px",height:"15px"}}/><br/>
                Paket Wisata</a>
                </li>
                <li><a className='btn btn-light rounded-9 text-capitalize' href='https://moovitapp.com/yogyakarta-4384/lines/id?ref=2&customerId=4908' target='_blank'>
                <i class="fa fa-bus" aria-hidden="true" style={{fontSize:"15px"}}></i><br/>
                Transportasi umum</a>
                </li>
                <li>
                <a className='btn btn-light rounded-9 text-capitalize' onClick={() => setRestaurantOpen(!isRestaurantOpen)}>
                <i class="fa fa-cutlery" aria-hidden="true" style={{fontSize:"15px"}}></i><br/>
                Rekomendasi resto</a>
                </li>
      </ul>
      <br/>
      {isRestaurantOpen && (
        <div>
        <h5 className='txtblack fw-bolder'>Rekomendasi Resto</h5>  
              <Slider {...settings}>
              {dataresto
                .map((item, index) => (
              <>
                    <div className="bg-image">
                    <a href={item.maps} target='_blank'>
                    <img src={item.image} className="w-100 rounded-5 mb-2" style={{minHeight:"100px",maxHeight:"100px"}}/>
                    </a>
                  <p className='lead fw-normal mb-1 fontprofile text-capitalize'>{item.nama}</p>
                  </div>
                  </>
                  ))}
            </Slider>
        </div>
      )}
    <br/>
      {isPaketOpen && (
        <div>
        <h5 className='txtblack fw-bolder'>Paket Wisata</h5>  
              <Slider {...settings}>
              {datapaket
                .map((item, index) => (
              <>
                    <div className="bg-image">
                    <a href={item.url} target='_blank'>
                    <img src={item.image} className="w-100 rounded-5 mb-2" style={{minHeight:"100px",maxHeight:"100px"}}/>
                    </a>
                  <p className='lead fw-normal mb-1 fontprofile text-capitalize'>{item.namapaket}</p>
                  </div>
                  </>
                  ))}
            </Slider>
        </div>
      )}
    <br/>
      <MDBAccordion flush initialActive={1}>
      <MDBAccordionItem collapseId={1} headerTitle='Informasi Umum' className='fw-bold txtblack'>
      <table className="table border-white">
    <thead>
    <tr>
      <th scope="col fw-bold txtblack" style={{fontWeight:"bold", fontSize:"18px"}}><img src="https://wonderplan.ai/icons/plan/accommodation.svg" alt="accommodation" style={{width:"30px",height:"30px"}}/></th>
      <th>Estimasi Hotel:</th>
      {loaditinerary
  .filter((day) => day.Hari === 1)
  .map((day, index) => (
    <div key={index}>
      {day.Tempatwisata && day.Tempatwisata['Hotel'] && (
        <th className='text-center'>{day.Tempatwisata.Hotel.priceRange}</th>
      )}
    </div>
  ))}
    </tr>
        
    <tr>
        <th><svg id="Capa_1" style={{width:"30px",height:"30px"}} enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg" class="budget-label__icon svelte-vogtw4"><g><path d="m469.97 204.205 14.523-24.205h12.507c8.284 0 15-6.716 15-15s-6.716-15-15-15h-21c-5.269 0-10.151 2.765-12.862 7.283l-12.213 20.354-20.141-70.494c-7.931-27.757-33.632-47.143-62.499-47.143h-224.57c-28.867 0-54.568 19.386-62.499 47.144l-20.141 70.494-12.213-20.354c-2.711-4.519-7.593-7.284-12.862-7.284h-21c-8.284 0-15 6.716-15 15s6.716 15 15 15h12.507l14.523 24.205c-24.536 9.301-42.03 33.038-42.03 60.795v112c0 8.284 6.716 15 15 15h26v25c0 19.299 15.701 35 35 35h40c19.299 0 35-15.701 35-35v-25h210v25c0 19.299 15.701 35 35 35h40c19.299 0 35-15.701 35-35v-25h26c8.284 0 15-6.716 15-15v-112c0-27.757-17.494-51.494-42.03-60.795zm-359.908-88.82c4.27-14.946 18.109-25.385 33.653-25.385h224.57c15.544 0 29.383 10.439 33.653 25.385l24.176 84.615h-26.623c-6.968-34.192-37.272-60-73.491-60s-66.522 25.808-73.491 60h-166.623zm173.508 84.615c6.191-17.461 22.874-30 42.43-30s36.239 12.539 42.43 30zm-162.57 217c0 2.757-2.243 5-5 5h-40c-2.757 0-5-2.243-5-5v-25h50zm90-55v-42h90v42zm230 55c0 2.757-2.243 5-5 5h-40c-2.757 0-5-2.243-5-5v-25h50zm41-55h-151v-57c0-8.284-6.716-15-15-15h-120c-8.284 0-15 6.716-15 15v57h-151v-97c0-19.299 15.701-35 35-35h.937c.026 0 .051.002.077.002.025 0 .049-.002.074-.002h379.824c.025 0 .049.002.074.002.026 0 .051-.002.077-.002h.937c19.299 0 35 15.701 35 35z"></path>
        <path d="m406 251c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.187 45-45-20.187-45-45-45zm0 60c-8.271 0-15-6.729-15-15s6.729-15 15-15 15 6.729 15 15-6.729 15-15 15z"></path>
        <path d="m106 251c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.187 45-45-20.187-45-45-45zm0 60c-8.271 0-15-6.729-15-15s6.729-15 15-15 15 6.729 15 15-6.729 15-15 15z"></path>
        </g>
        </svg></th>
        <th>Taxi Online:</th>
        <th>
          <tr>Rp 30.000 - Rp 60.000</tr>
        </th>
    </tr>
    <tr>
      <th><i class="fa fa-cutlery" aria-hidden="true" style={{fontSize:"30px"}}></i></th>
      <th>Estimasi Makanan:</th>
      <th>
        <tr>Tradisional: Rp 15.000</tr>
        <tr>Restoran: Rp 30.000</tr>
        <tr>Coffee Shop: Rp 30.000</tr>
      </th>
    </tr>
  </thead>
</table>
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={2} headerTitle='Tiket Wisata'>
       <tr>
        <th scope="col fw-bold txtblack" className='txtblack' style={{fontWeight:"bold", fontSize:"18px"}}>
          <svg id="Capa_1" style={{width:"30px",height:"30px"}} enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg" class="budget-label__icon svelte-vogtw4"><g><path d="m497 160.455c-2.707 0-5.027-1.923-5.518-4.573-1.318-7.109-7.519-12.267-14.749-12.267h-28.753v-57.972c0-8.284-6.716-15-15-15-2.707 0-5.027-1.923-5.518-4.573-1.318-7.109-7.519-12.267-14.749-12.267h-281.113c-7.23 0-13.431 5.158-14.749 12.267-.491 2.649-2.812 4.573-5.518 4.573s-5.027-1.923-5.518-4.573c-1.318-7.109-7.519-12.267-14.749-12.267h-55.799c-7.23 0-13.431 5.158-14.749 12.267-.491 2.649-2.812 4.573-5.518 4.573-8.284 0-15 6.716-15 15v250.902c0 8.284 6.716 15 15 15 2.707 0 5.027 1.923 5.518 4.573 1.318 7.109 7.519 12.267 14.749 12.267h28.753v57.973c0 8.284 6.716 15 15 15 2.707 0 5.027 1.923 5.518 4.573 1.318 7.109 7.519 12.267 14.749 12.267h55.798c7.23 0 13.431-5.158 14.749-12.267.491-2.649 2.812-4.573 5.519-4.573s5.027 1.923 5.519 4.573c1.317 7.109 7.519 12.267 14.749 12.267h281.113c7.23 0 13.431-5.158 14.749-12.267.491-2.649 2.812-4.573 5.518-4.573 8.284 0 15-6.716 15-15v-250.903c-.001-8.284-6.717-15-15.001-15zm-467 164.398v-227.519c6.281-2.918 11.607-7.625 15.273-13.531h35.787c6.34 10.215 17.647 16.839 30.273 16.839s23.933-6.624 30.273-16.839h261.102c3.666 5.906 8.992 10.612 15.273 13.531v227.519c-6.281 2.919-11.607 7.625-15.273 13.531h-261.102c-6.341-10.215-17.648-16.839-30.273-16.839s-23.933 6.624-30.273 16.839h-35.787c-3.666-5.906-8.992-10.612-15.273-13.531zm452 89.813c-6.281 2.918-11.607 7.625-15.273 13.531h-261.102c-6.34-10.215-17.647-16.839-30.273-16.839s-23.933 6.624-30.273 16.839h-35.787c-3.666-5.906-8.992-10.612-15.273-13.531v-46.584c5.909-1.185 10.661-5.847 11.794-11.964.491-2.649 2.812-4.573 5.518-4.573s5.027 1.923 5.518 4.573c1.318 7.109 7.519 12.267 14.749 12.267h28.753v8.338c0 8.284 6.716 15 15 15s15-6.716 15-15v-8.338h222.36c7.23 0 13.431-5.157 14.749-12.267.491-2.649 2.812-4.573 5.518-4.573 8.284 0 15-6.716 15-15v-162.929h18.747c3.666 5.906 8.992 10.612 15.273 13.531v227.519z"></path><path d="m111.333 301.911c8.284 0 15-6.716 15-15v-14.317c0-8.284-6.716-15-15-15s-15 6.716-15 15v14.317c0 8.284 6.715 15 15 15z"></path><path d="m111.333 233.253c8.284 0 15-6.716 15-15v-14.318c0-8.284-6.716-15-15-15s-15 6.716-15 15v14.318c0 8.284 6.715 15 15 15z"></path>
          <path d="m111.333 164.595c8.284 0 15-6.716 15-15v-14.317c0-8.284-6.716-15-15-15s-15 6.716-15 15v14.317c0 8.284 6.715 15 15 15z"></path><path d="m228.005 232.364-5.866 34.203c-.965 5.627 1.348 11.315 5.967 14.671 4.62 3.356 10.744 3.798 15.797 1.142l30.716-16.148 30.717 16.148c2.194 1.154 4.591 1.723 6.979 1.723 3.11 0 6.205-.966 8.818-2.865 4.619-3.356 6.933-9.043 5.967-14.671l-5.867-34.203 24.851-24.223c4.088-3.985 5.56-9.946 3.795-15.376-1.764-5.43-6.458-9.388-12.109-10.209l-34.342-4.99-15.358-31.12c-2.527-5.12-7.742-8.361-13.451-8.361s-10.924 3.242-13.451 8.362l-15.358 31.119-34.342 4.99c-5.65.821-10.345 4.779-12.109 10.209-1.765 5.43-.293 11.391 3.795 15.376zm29.923-26.244c4.886-.71 9.109-3.779 11.294-8.206l5.397-10.937 5.397 10.937c2.185 4.427 6.409 7.496 11.294 8.206l12.068 1.753-8.733 8.513c-3.535 3.446-5.148 8.411-4.314 13.277l2.062 12.02-10.794-5.675c-2.185-1.149-4.583-1.723-6.98-1.723s-4.795.574-6.98 1.723l-10.794 5.675 2.062-12.02c.834-4.866-.779-9.831-4.314-13.277l-8.733-8.513z"></path></g>
          </svg> Tiket Wisata
        </th>
       </tr>
       
       <table className="table border-white">
       <thead>
       {loaditinerary
  .filter((day) => day.Hari === selectedDay)
  .map((day, index) => (
    <>
      {day.Tempatwisata && day.Tempatwisata['pagi'] && (
        <tr>
        <th>{day.Tempatwisata.pagi.nama}</th>
        <th>{day.Tempatwisata.pagi.jenis_wisata}</th>
        <th className='text-center'>Rp {day.Tempatwisata.pagi.htm_weekend}</th>
        </tr>
      )}

      {day.Tempatwisata && day.Tempatwisata['siang'] && (
        <tr>
        <th>{day.Tempatwisata.siang.nama}</th>
        <th>{day.Tempatwisata.siang.jenis_wisata}</th>
        <th className='text-center'>Rp {day.Tempatwisata.siang.htm_weekend}</th>
        </tr>
      )}

      {day.Tempatwisata && day.Tempatwisata['malam'] && (
        <tr>
        <th>{day.Tempatwisata.malam.nama}</th>
        <th>{day.Tempatwisata.malam.jenis_wisata}</th>
        <th className='text-center'>Rp {day.Tempatwisata.malam.htm_weekend}</th>
        </tr>
      )}
    </>
  ))}
  </thead>
  </table>

      </MDBAccordionItem>
    </MDBAccordion>
    {/* <MapContainer center={center} zoom={zoom} style={{ height: '600px', width: '100%', marginTop:'50px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      </MapContainer> */}
    </div>
      </div>
     </div>
    </div>
        </>
    )
}

export default Bodyitinerarybyuser