import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import Slider from 'react-slick';
import { useLocation} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHistory, useParams  } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import 'leaflet/dist/leaflet.css';
import { FormatRupiah } from '@arismun/format-rupiah';
import L from 'leaflet';
import Api from '../Api';
function Bodyitinerarykeluarga(){
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
  const [isRestaurantOpen, setRestaurantOpen] = useState(false); 
  const [isHotelOpen, setHotelOpen] = useState(false); 
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
    const response = await Api.get('/api/hotelkeluarga')
    setHotel(response.data)
  }

  const fetchresto = async () => {
    const response = await Api.get('/api/restokeluarga')
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
      tipe: 'keluarga'
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
      <h6 className="display-6 fw-bold lh-1 mb-3 text-white">{loaditinerary.length} Hari Berwisata Bersama Keluarga di Jogja</h6>
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
        {index === 0 && day.Tempatwisata && day.Tempatwisata['sewa'] && day.Tempatwisata['sewa'][0] && (
        <div className="itinerary-card">
          <div className="itinerary-content">
            <p>Waktu: 07.00 - Tiba di Jogja - Sewa Mobil</p>
            <h4>{day.Tempatwisata['sewa'][0].nama}</h4>
            <a className='btn btn-outline-success mt-1 rounded-9' href={day.Tempatwisata['sewa'][0].nomorwa} target='_blank'><i className="fa fa-phone" aria-hidden="true"></i> Hubungi Penyedia</a>
          </div>
        </div>
      )}
      
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
          <p>Waktu: 09.30 - {day.Tempatwisata['pagi'].descitinerary}</p>
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

            {day.Tempatwisata['Makansiang'] && (
              <div className="itinerary-card">
        <img src={day.Tempatwisata['Makansiang'].image}  className="itinerary-image" />
        <div className="itinerary-content">
        <p>Waktu: 11.30 - Makan Siang</p>
          <h4>{day.Tempatwisata['Makansiang'].nama}</h4>
          <a className='btn btn-outline-primary custom-button mt-1 rounded-9' href={day.Tempatwisata['Makansiang'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
        </div>
      </div>
            )}

            {day.Tempatwisata['siang'] && (
              <div className="itinerary-card">
        <img src={day.Tempatwisata['siang'].image}  className="itinerary-image" />
        <div className="itinerary-content">
          <p>Waktu: 13.30 - {day.Tempatwisata['siang'].descitinerary}</p>
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
          <p>Waktu: 16.00 - {day.Tempatwisata['wisataoleholeh'].descitinerary} - Wisata oleh-oleh</p>
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
            
            {day.Tempatwisata['Malam'] && (
              <div className="itinerary-card">
        <div className="itinerary-content">
        <p>Waktu: 17.00 </p>
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
                <li>
                <a className='btn btn-light rounded-9 text-capitalize' onClick={() => setRestaurantOpen(!isRestaurantOpen)}>
                <i class="fa fa-cutlery" aria-hidden="true" style={{fontSize:"15px"}}></i><br/>
                Rekomendasi resto</a>
                </li>
                <li><a className='btn btn-light rounded-9 text-capitalize' onClick={() => setHotelOpen(!isHotelOpen)}>
                <img src="https://wonderplan.ai/icons/plan/accommodation.svg" alt="accommodation" style={{width:"15px",height:"15px"}}/><br/>
                Rekomendasi Hotel</a>
                </li>
      </ul>
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
      {isHotelOpen && (
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
      <MDBAccordionItem collapseId={1} headerTitle='Informasi Umum' className='fw-bold txtblack'>
      <table className="table border-white">
  <thead>        
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
      {loaditinerary
  .filter((day) => day.Hari === 1)
  .map((day, index) => (
<>
<Slider {...settings}>
{day.Tempatwisata.paketwisata.map((paket, paketIndex) => (
      <div className="bg-image">
      <a href={paket.url} target='_blank'>
      <img src={paket.image} className="w-100 rounded-5 mb-2" />
      </a>
    <p className='lead fw-normal mb-1 fontprofile text-capitalize'>{paket.namapaket}</p>
    </div>
        ))}
        </Slider>
              </>
              ))}
              <br/>
    </div>
    </div>
    </div>
    </div>
        </>
    )
}

export default Bodyitinerarykeluarga;