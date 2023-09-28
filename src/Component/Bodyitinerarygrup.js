import React, { useEffect, useState,useRef } from 'react';
// import axios from 'axios';
import Rating from './Rating';
import Slider from 'react-slick';
import { useLocation} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHistory, useParams  } from 'react-router';
import { Card, Button, Form } from 'react-bootstrap';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerResto from '../restomap.png'
import markerWisata from '../wisatamap.png'
import markerIcon from '../mapmakersuser.png';
import { FormatRupiah } from '@arismun/format-rupiah';
import markerHotel from '../hotel.png'
import L from 'leaflet';
import Api from '../Api';
function Bodyitinerarygrup(){
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const itineraryId = urlParams.get('itinerary_id');
    const[loaditinerary, setLoaditinerary] = useState([])
    const [selectedDay, setSelectedDay] = useState(1); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [judul, setJudul] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [image, setImage] = useState()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true);
    const [isIdFound, setIsIdFound] = useState(false); 
    const [lokasi, setLokasi] = useState('Yogyakarta');
    const [weatherData, setWeatherData] = useState(null);
    const [cuacaData, setCuacadata] = useState(null)
    const [cuacadesc, setCuacadesc] = useState(null)
    const [cuaca, setCuaca] = useState(null)
    const [humidity, setHumidity] = useState(null)
    const [wind, setWind] = useState(null)
    const [uv, setUv] = useState(null)
    const [hotel, setHotel] = useState([])
    const [resto, setResto] = useState([])
    const [observation, setobservation] = useState(null)
    const [isAccommodationOpen, setAccommodationOpen] = useState(false);
    const [isRestaurantOpen, setRestaurantOpen] = useState(false); 
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
  
    useEffect(() => {
      Api.get('/api/cuaca', {
        params: {
          location: lokasi,
        },
      })
        .then(response => {
          setWeatherData(response.data.current.temperature);
          setCuacadata(response.data.current.weather_icons)
          setCuacadesc(response.data.current.weather_descriptions)
          setWind(response.data.current.wind_speed)
          setUv(response.data.current.uv_index)
          setHumidity(response.data.current.humidity)
          setobservation(response.data.current.observation_time)
        })
        .catch(error => {
          console.error(error);
        });
    }, [lokasi]);
  
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
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        }
      ]
    };
  
    const foundid = async () => {
      const response = await Api.get(`/api/checkid/${itineraryId}`)
      setIsIdFound(response.data === 1);
    }
  
    const fetchhotel = async () => {
      const response = await Api.get('/api/hotelgrup')
      setHotel(response.data)
    }
  
    const fetchresto = async () => {
      const response = await Api.get('/api/restogrup')
      setResto(response.data)
    }
  
    const handleDayChange = (e) => {
      setSelectedDay(parseInt(e.target.value, 10)); 
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
        share: '0',
        tipe: 'grup'
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
  
    useEffect(() => {
      const initialImageValue = loaditinerary
      .filter((day) => day.Hari === 1)
      .map((day) => day.Tempatwisata.pagi?.image2)[0];
    if (initialImageValue) {
      setImage(initialImageValue);
    }
    }, [itineraryId, selectedDay, loaditinerary]);
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
        fetchhotel()
        fetchresto()
        foundid()
        if (itineraryId) {
          fetchitinerary();
        }
      },[itineraryId]) 
      const hotels = Object.values(hotel)
      const restoran = Object.values(resto)
      console.log(loaditinerary)

      return(
        <>
    <div className="container" style={{marginTop:"70px", marginBottom:"40px"}}>
    <div className="py-5">
    <div className='rounded-8' style={{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image}) center center`,backgroundSize:"cover",backgroundRepeat:"no-repeat !important", marginBottom:"35px"}}>
    <div className=" container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="row align-items-center g-lg-5 py-5">
      <div className="text-center">
      <h6 className="display-6 fw-bold lh-1 mb-3 text-white">{loaditinerary.length} Hari Berwisata di Jogja</h6>
      </div>
      </div>
      </div>
      </div>
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
        <p>Waktu: 09.00 - Check in dan sarapan</p>
          <h4>{day.Tempatwisata.Hotel.name}</h4>
          <a className='btn btn-outline-primary custom-button mt-1 rounded-9' href={day.Tempatwisata.Hotel.webUrl} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan info</a>
        </div>
      </div>
          ) : (
            <div className="itinerary-card">
        <div className="itinerary-content">
        <p>Waktu: 09.00 </p>
          <h4>Sarapan dan persiapan menuju lokasi wisata</h4>
        </div>
      </div>
          )}

          {day.Tempatwisata['pagi'] && (
              <div className="itinerary-card">
        <img src={day.Tempatwisata['pagi'].image}  className="itinerary-image" />
        <div className="itinerary-content">
          <p>Waktu: 10.30 - {day.Tempatwisata['pagi'].descitinerary}</p>
          <h4 className='text-capitalize'><a className='txtblack text-decoration-underline' href={`/wisata/${day.Tempatwisata['pagi'].wisata_id}`}>{day.Tempatwisata['pagi'].nama}</a>  - {day.Tempatwisata['pagi'].durasi}</h4>
          <div className="ms-auto text-warning"><Rating  value={day.Tempatwisata['pagi'].rating} maxValue={5}/></div>
          <a className='btn btn-outline-primary custom-button mt-1 rounded-9' href={day.Tempatwisata['pagi'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
        <MDBAccordion flush initialActive={1}>
      <MDBAccordionItem collapseId={1} headerTitle='Aktivitas Wisata' className='fw-bold txtblack'>
      <p className='small fw-normal text-muted text-capitalize'>{day.Tempatwisata['pagi'].things}</p>
      </MDBAccordionItem>
      </MDBAccordion>
        </div>
      </div>
            )}


          {day.Tempatwisata['Makanpagi'] && (
        <div className="itinerary-card">
        <img src={day.Tempatwisata['Makanpagi'].image}  className="itinerary-image" />
        <div className="itinerary-content">
        <p>Waktu: 12.00 - Makan siang dan acara santai</p>
        <h4>{day.Tempatwisata['Makanpagi'].nama}</h4>
        <a className='btn btn-outline-primary custom-button mt-1 rounded-9' href={day.Tempatwisata['Makanpagi'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
        </div>
      </div>
            )}

            

            {day.Tempatwisata['siang'] && (
          <div className="itinerary-card">
        <img src={day.Tempatwisata['siang'].image}  className="itinerary-image" />
        <div className="itinerary-content">
        <p>Waktu: 14.00 - {day.Tempatwisata['siang'].descitinerary}</p>
        <h4 className='text-capitalize'><a className='txtblack text-decoration-underline' href={`/wisata/${day.Tempatwisata['siang'].wisata_id}`}>{day.Tempatwisata['siang'].nama}</a>   - {day.Tempatwisata['siang'].durasi}</h4>
        <div className="ms-auto text-warning"><Rating  value={day.Tempatwisata['siang'].rating} maxValue={5}/></div>
        <a className='btn btn-outline-primary mt-1 custom-button rounded-9' href={day.Tempatwisata['siang'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
        <MDBAccordion flush initialActive={2}>
      <MDBAccordionItem collapseId={2} headerTitle='Aktivitas Wisata' className='fw-bold txtblack'>
      <p className='small fw-normal text-muted text-capitalize'>{day.Tempatwisata['siang'].things}</p>
      </MDBAccordionItem>
      </MDBAccordion>
        </div>
      </div>
            )}

            {day.Tempatwisata['wisataoleholeh'] && (
        <div className="itinerary-card">
        <img src={day.Tempatwisata['wisataoleholeh'].image}  className="itinerary-image" />
        <div className="itinerary-content">
          <p>Waktu: 16.30 - {day.Tempatwisata['wisataoleholeh'].descitinerary} - Wisata oleh-oleh</p>
          <h4 className='text-capitalize'><a className='txtblack text-decoration-underline' href={`/wisata/${day.Tempatwisata['wisataoleholeh'].wisata_id}`}>{day.Tempatwisata['wisataoleholeh'].nama}</a> - {day.Tempatwisata['wisataoleholeh'].durasi}</h4>
          <div className="ms-auto text-warning"><Rating  value={day.Tempatwisata['wisataoleholeh'].rating} maxValue={5}/></div>
          <a className='btn btn-outline-primary mt-1 custom-button rounded-9' href={day.Tempatwisata['wisataoleholeh'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
          <MDBAccordion flush initialActive={3}>
      <MDBAccordionItem collapseId={3} headerTitle='Aktivitas Wisata' className='fw-bold txtblack'>
      <p className='small fw-normal text-muted text-capitalize'>{day.Tempatwisata['wisataoleholeh'].things}</p>
      </MDBAccordionItem>
      </MDBAccordion>
        </div>
      </div>
            )}

        {day.Tempatwisata['Makansiang'] && (
        <div className="itinerary-card">
        <img src={day.Tempatwisata['Makansiang'].image}  className="itinerary-image" />
        <div className="itinerary-content">
        <p>Waktu: 18.00 - Makan Malam</p>
        <h4>{day.Tempatwisata['Makansiang'].nama}</h4>
        <a className='btn btn-outline-primary custom-button mt-1 rounded-9' href={day.Tempatwisata['Makansiang'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
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
       {isIdFound == false ? (
      <center> <button onClick={handleShow} className='btn butonprimer rounded-9'>Simpan rencana perjalanan</button></center>
          ) : (
            <p></p>

          )}
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
    <div className="col-md-6">
    <ul class="horizontal-list" style={{marginBottom:"30px"}}>
                <li><a className='btn btn-light rounded-9 text-capitalize' href='https://moovitapp.com/yogyakarta-4384/lines/id?ref=2&customerId=4908' target='_blank'>
                <i class="fa fa-bus" aria-hidden="true" style={{fontSize:"15px"}}></i><br/>
                Transportasi umum</a>
                </li>
                <li><a className='btn btn-light rounded-9 text-capitalize' onClick={() => setAccommodationOpen(!isAccommodationOpen)}>
                <img src="https://wonderplan.ai/icons/plan/accommodation.svg" alt="accommodation" style={{width:"15px",height:"15px"}}/><br/>
                Rekomendasi Hotel</a>
                </li>
                <li>
                <a className='btn btn-light rounded-9 text-capitalize' onClick={() => setRestaurantOpen(!isRestaurantOpen)}>
                <i class="fa fa-cutlery" aria-hidden="true" style={{fontSize:"15px"}}></i><br/>
                Rekomendasi resto</a>
                </li>
      </ul>
      <br/>
       {isAccommodationOpen && (
    <div>
<h5 className='txtblack fw-bolder'>Rekomendasi Hotel</h5>
<Slider {...settings}>
{hotels
  .map((item, index) => (
    <>
      <div className="bg-image">
      <a href={item.webUrl} target='_blank'>
      <img src={item.image} className="w-100 rounded-5 mb-2" style={{minHeight:"100px",maxHeight:"100px"}}/>
      </a>
    <p className='lead fw-normal mb-1 fontprofile text-capitalize'>{item.name}</p>
    </div>
    </>
))}
</Slider>
</div>
 )}
 <br/>
 {isRestaurantOpen && (
 <div>
<h5 className='txtblack fw-bolder'>Rekomendasi Resto</h5> 
<Slider {...settings}>
{restoran
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
      <MDBAccordion flush initialActive={1}>
      <MDBAccordionItem collapseId={2} headerTitle='Estimasi Biaya'>
       <table className="table border-white">
       <thead>
       {loaditinerary
  .filter((day) => day.Hari === 1)
  .map((day, index) => (
    <>
      {day.Tempatwisata && day.Tempatwisata['Hotel'] && (
        <tr>
        <th>Hotel</th>
        <th></th>
        <th className='text-center'>{day.Tempatwisata.Hotel.priceRange}</th>
        </tr>
      )}
</>
  ))}
       {loaditinerary
  .filter((day) => day.Hari === selectedDay)
  .map((day, index) => (
    <>
      {day.Tempatwisata && day.Tempatwisata['pagi'] && (
        <tr>
        <th>{day.Tempatwisata.pagi.nama}</th>
        <th></th>
        <th className='text-center'><FormatRupiah value={day.Tempatwisata.pagi.htm_weekend} /></th>
        </tr>
      )}

      {day.Tempatwisata && day.Tempatwisata['siang'] && (
        <tr>
        <th>{day.Tempatwisata.siang.nama}</th>
        <th></th>
        <th className='text-center'> <FormatRupiah value={day.Tempatwisata.siang.htm_weekend} /> </th>
        </tr>
      )}

    </>
  ))}
  </thead>
  </table>
      </MDBAccordionItem>
      </MDBAccordion>
      <br/>
      <div class="card rounded-6 shadow-0" style={{color:"#868B94", marginTop:"25px"}}>
          <div class="card-body p-4">
            <div class="d-flex">
              <h6 class="flex-grow-1">Yogyakarta</h6>
              <h6>{observation}</h6>
            </div>
            <div class="d-flex flex-column text-center mt-5 mb-4">
              <h6 class="display-4 mb-0 font-weight-bold" style={{color:"#868B94"}}> {weatherData}°C </h6>
              <span class="small" style={{color:"#868B94"}}>{cuacadesc}</span>
            </div>
            <div class="d-flex align-items-center">
              <div class="flex-grow-1" >
                <div><i class="fas fa-wind fa-fw" style={{color:"#868B94"}}></i> <span class="ms-1"> {wind} km/h
                  </span></div>
                <div><i class="fas fa-tint fa-fw" style={{color:"#868B94"}}></i> <span class="ms-1"> {humidity}% </span>
                </div>
                <div><i class="fas fa-sun fa-fw" style={{color:"#868B94"}}></i> <span class="ms-1"> {uv}h </span>
                </div>
              </div>
              <div>
                <img src={cuacaData} className='rounded-5' width="100px"/>
              </div>
            </div>

          </div>
        </div>
        <br/>

      
        <h5 className='txtblack fw-bolder'>Opsi Kendaraan</h5>
        {loaditinerary
  .filter((day) => day.Hari === 1)
  .map((day, index) => (
   <>
    {day.Tempatwisata && day.Tempatwisata['mobil'] && (
  <div>
  <Slider {...settings}>
        {Object.keys(day.Tempatwisata['mobil']).map((key) => {
          const mobil = day.Tempatwisata['mobil'][key];
          return (
            <div className="bg-image">
            <a href={mobil.nomorwa} target='_blank'>
            <img src={mobil.image}className="w-100 rounded-5 mb-2" style={{minHeight:"100px",maxHeight:"100px"}}/>
            </a>
            <p className='lead fw-normal mb-1 fontprofile text-capitalize'>{mobil.nama}</p>
            </div>
          );
        })}
        </Slider>
  </div>
)}
</>
  ))}
    </div>
      </div>
    </div>
    </div> 
        </>
      )

}

export default Bodyitinerarygrup