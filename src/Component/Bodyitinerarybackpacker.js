import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import Rating from './Rating';
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
import markerHotel from '../hotel.png'
import L from 'leaflet';
import Slider from 'react-slick';
import Api from '../Api';

function  Bodyitinerarybackpacker(){
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const itineraryId = urlParams.get('itinerary_id');
  const[loaditinerary, setLoaditinerary] = useState([])
  const [selectedDay, setSelectedDay] = useState(1); 
  const [detailitinerary, setDetailitinerary] = useState([])
  const [userLocation, setUserLocation] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false);
  const [hotellatitude, setHotellatitude] = useState(0)
  const [hotellongitude, setHotellongitude] = useState(0)
  const [pagilatitude, setPagilatitude] = useState(0)
  const [pagilongitude, setPagilongitude] = useState(0)
  const [sianglatitude, setSianglatitude] = useState(0)
  const [sianglongitude, setSianglongitude] = useState(0)
  const [malamlatitude, setMalamlatitude] = useState(0)
  const [malamlongitude, setMalamlongitude] = useState(0)
  const [sarapanlatitude, setSarapanlatitude] = useState(0)
  const [sarapanlongitude, setSarapanlongitude] = useState(0)
  const [makansianglatitude, setMakansianglatitude] = useState(0)
  const [makansianglongitude, setMakansianglongitude] = useState(0)
  const [makanmalamlatitude, setMakanmalamlatitude] = useState(0)
  const [makanmalamlongitude, setMakanmalamlongitude] = useState(0)
  const center = [hotellatitude, hotellongitude];
  const pagi = [pagilatitude, pagilongitude]
  const siang = [sianglatitude, sianglongitude]
  const sarapan = [sarapanlatitude, sarapanlongitude]
  const malam = [malamlatitude, malamlongitude]
  const makansiang = [makansianglatitude, makansianglongitude]
  const makanmalam = [makanmalamlatitude, makanmalamlongitude]
  const zoom = 12;
  const mapRef = useRef(null);
  const [lokasi, setLokasi] = useState('Yogyakarta');
  const [weatherData, setWeatherData] = useState(null);
  const [cuacaData, setCuacadata] = useState(null)
  const [cuacadesc, setCuacadesc] = useState(null)
  const [cuaca, setCuaca] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [wind, setWind] = useState(null)
  const [uv, setUv] = useState(null)
  const [observation, setobservation] = useState(null)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [image, setImage] = useState()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [checklistNotes, setChecklistNotes] = useState([]);
  const [newNote, setNewNote] = useState(''); 
  const [maps, setMaps] = useState([])
  const [motor, setMotor] = useState([])
  const [hotel, setHotel] = useState([])
  const [resto, setResto] = useState([])
  const [isIdFound, setIsIdFound] = useState(false);
  const [isAccommodationOpen, setAccommodationOpen] = useState(false);
  const [isTransportOpen, setTransportOpen] = useState(false);
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

  const fetchmotor = async () => {
    const response = await Api.get('/api/motorbackpacker')
    setMotor(response.data)
  }

  const fetchmaps = async () => {
    const response = await Api.get('/api/bodymaps')
    setMaps(response.data)
  }
  const fetchhotel = async () =>{
    const response = await Api.get('/api/hotelbackpacker')
    setHotel(response.data)
  }
  const fetchresto = async () =>{
    const response = await Api.get('/api/restobackpacker')
    setResto(response.data)
  }

  useEffect(() => {
    const savedNotes = localStorage.getItem(`${itineraryId}_check`);
    if (savedNotes) {
      setChecklistNotes(JSON.parse(savedNotes)); 
    }
  }, []);

  
  const savenewNote = () => {
    if (newNote.trim() !== '') {
      const updatedNotes = [...checklistNotes, { text: newNote, isMarked: false }];
      setChecklistNotes(updatedNotes); 
      setNewNote('');
      localStorage.setItem(`${itineraryId}_check`, JSON.stringify(updatedNotes));
    }
  };


  const markNote = (index) => {
    const updatedNotes = [...checklistNotes];
    updatedNotes[index].isMarked = !updatedNotes[index].isMarked;
    setChecklistNotes(updatedNotes); 
    localStorage.setItem(`${itineraryId}_check`, JSON.stringify(updatedNotes));
  };
  

  useEffect(() => {
    const savedNotes = localStorage.getItem(`${itineraryId}_notes`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const saveNote = () => {
    if (currentNote.trim() !== '') {
      const updatedNotes = [...notes, currentNote];
      setNotes(updatedNotes);
      setCurrentNote('');
      localStorage.setItem(`${itineraryId}_notes`, JSON.stringify(updatedNotes));
    }
  };
    
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
      tipe: 'backpacker'
}, {
  headers: {
    Authorization: `Bearer ${userToken}`,
  }
})
    history.push("/profile");
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
        fetchmaps()
        fetchresto()
        fetchhotel()
        foundid()
        fetchmotor()
        if (itineraryId) {
          fetchitinerary();
        }
      },[itineraryId]) 
      const customIconwisata = new L.Icon({
        iconUrl: markerWisata,
        iconSize: [32, 32], 
        iconAnchor: [16, 32], 
      });
      const customIcon = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [32, 32], 
        iconAnchor: [16, 32], 
      });
      const customIconresto = new L.Icon({
        iconUrl: markerResto,
        iconSize: [40, 30], 
        iconAnchor: [16, 32], 
      });
      const customIconhotel = new L.Icon({
        iconUrl: markerHotel,
        iconSize: [30, 30], 
        iconAnchor: [16, 32], 
      });

      const customIconwisatas = new L.Icon({
        iconUrl: markerWisata,
        iconSize: [15, 15], 
        iconAnchor: [16, 32], 
      });
        const customIconhotels = new L.Icon({
          iconUrl: markerHotel,
          iconSize: [15, 15], 
          iconAnchor: [16, 32], 
        });
        const customIconrestos = new L.Icon({
          iconUrl: markerResto,
          iconSize: [20, 15], 
          iconAnchor: [16, 32], 
        });
    
    
      useEffect(() => {
        const initialHotelValueLatitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.Hotel?.latitude)[0];
    
        const initialHotelValueLongitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.Hotel?.longitude)[0];
    
        const initialPagiValueLatitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.pagi?.latitude)[0];
    
        const initialPagiValueLongitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.pagi?.longitude)[0];
    
        const initialSiangValueLatitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.siang?.latitude)[0];
    
        const initialSiangValueLongitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.siang?.longitude)[0];
    
        const initialMalamValueLatitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.malam?.latitude)[0];
    
        const initialMalamValueLongitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.malam?.longitude)[0];
    
        const initialSarapanValueLatitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.Makanpagi?.latitude)[0];
    
        const initialSarapanValueLongitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.Makanpagi?.longitude)[0];
    
        const initialMakansiangValueLatitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.Makansiang?.latitude)[0];
    
        const initialMakansiangValueLongitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.Makansiang?.longitude)[0];
    
        const initialMakanmalamValueLatitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.Makanmalam?.latitude)[0];
    
        const initialMakanmalamValueLongitude = loaditinerary
        .filter((day) => day.Hari === selectedDay)
        .map((day) => day.Tempatwisata.Makanmalam?.longitude)[0];
    
      if (initialHotelValueLatitude) {
        setHotellatitude(initialHotelValueLatitude);
      }
    
      if (initialHotelValueLongitude) {
        setHotellongitude(initialHotelValueLongitude);
      }
    
      if (initialPagiValueLatitude) {
        setPagilatitude(initialPagiValueLatitude);
      }
      if (initialPagiValueLongitude) {
        setPagilongitude(initialPagiValueLongitude);
      }
      if (initialSiangValueLatitude) {
        setSianglatitude(initialSiangValueLatitude);
      }
      if (initialSiangValueLongitude) {
        setSianglongitude(initialSiangValueLongitude);
      }
      if (initialMalamValueLatitude) {
        setMalamlatitude(initialMalamValueLatitude);
      }
      if (initialMalamValueLongitude) {
        setMalamlongitude(initialMalamValueLongitude);
      }
      if (initialSarapanValueLatitude) {
        setSarapanlatitude(initialSarapanValueLatitude);
      }
      if (initialSarapanValueLongitude) {
        setSarapanlongitude(initialSarapanValueLongitude);
      }
      if (initialMakansiangValueLatitude) {
        setMakansianglatitude(initialMakansiangValueLatitude);
      }
      if (initialMakansiangValueLongitude) {
        setMakansianglongitude(initialMakansiangValueLongitude);
      }
      if (initialMakanmalamValueLatitude) {
        setMakanmalamlatitude(initialMakanmalamValueLatitude);
      }
      if (initialMakanmalamValueLongitude) {
        setMakanmalamlongitude(initialMakanmalamValueLongitude);
      }
      }, [selectedDay, loaditinerary]); 
    
   
      useEffect(() => {
        if (!locationFetched && 'geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation([latitude, longitude]);
              setLocationFetched(true);
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
        if (userLocation && mapRef.current) {
          mapRef.current.setView(userLocation, 14);
        }
      }, [userLocation]);
    
    const datahotel = Object.values(hotel);
    const dataresto = Object.values(resto);
    const motors =Object.values(motor)
  
  
   
    return(
        <>
<div className="container" style={{marginTop:"70px", marginBottom:"40px", overflow:"hidden"}}>
    <div className="py-5">
    <div className='rounded-8' style={{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image}) center center`,backgroundSize:"cover",backgroundRepeat:"no-repeat !important", marginBottom:"35px"}}>
    <div className=" container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="row align-items-center g-lg-5 py-5">
      <div className="text-center">
      <h6 className="display-6 fw-bold lh-1 mb-3 text-white">{loaditinerary.length} Hari Berwisata Backpacker di Jogja</h6>
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
          <img src={day.Tempatwisata['sewa'][0].image} className="itinerary-image" />
          <div className="itinerary-content">
            <p>Waktu: 07.00 - Tiba di Jogja - Sewa Motor</p>
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
          <p>Waktu: 09.00 - {day.Tempatwisata['pagi'].descitinerary}</p>
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
          <h4 className='text-capitalize'><a className='txtblack text-decoration-underline' href={`/wisata/${day.Tempatwisata['siang'].wisata_id}`}>{day.Tempatwisata['siang'].nama}</a>  - {day.Tempatwisata['siang'].durasi}</h4>
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

            {day.Tempatwisata['malam'] && (
              <div className="itinerary-card">
        <img src={day.Tempatwisata['malam'].image}  className="itinerary-image" />
        <div className="itinerary-content">
          <p>Waktu: 15.30 - {day.Tempatwisata['malam'].descitinerary}</p>
          <h4 className='text-capitalize'><a className='txtblack text-decoration-underline' href={`/wisata/${day.Tempatwisata['malam'].wisata_id}`}>{day.Tempatwisata['malam'].nama}</a> - {day.Tempatwisata['malam'].durasi}</h4>
          <div className="ms-auto text-warning"><Rating  value={day.Tempatwisata['malam'].rating} maxValue={5}/></div>
          <a className='btn btn-outline-primary mt-1 custom-button rounded-9' href={day.Tempatwisata['malam'].maps} target='_blank'><i className="fa fa-angle-right" aria-hidden="true"></i> Dapatkan arah</a>
          <MDBAccordion flush initialActive={3}>
      <MDBAccordionItem collapseId={3} headerTitle='Aktivitas Wisata' className='fw-bold txtblack'>
      <p className='small fw-normal text-muted text-capitalize'>{day.Tempatwisata['malam'].things}</p>
      </MDBAccordionItem>
      </MDBAccordion>
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
        <li><a className='btn btn-light rounded-9 text-capitalize' onClick={() => setAccommodationOpen(!isAccommodationOpen)}>
                <img src="https://wonderplan.ai/icons/plan/accommodation.svg" alt="accommodation" style={{width:"15px",height:"15px"}}/><br/>
                Rekomendasi Hotel</a>
                </li>
                <li><a className='btn btn-light rounded-9 text-capitalize' href='https://moovitapp.com/yogyakarta-4384/lines/id?ref=2&customerId=4908' target='_blank'>
                <i class="fa fa-bus" aria-hidden="true" style={{fontSize:"15px"}}></i><br/>
                Transportasi umum</a>
                </li>
                <li><a className='btn btn-light rounded-9 text-capitalize' onClick={() => setTransportOpen(!isTransportOpen)}>
                <i class="fa fa-motorcycle" aria-hidden="true" style={{fontSize:"15px"}}></i><br/>
                Persewaan kendaraan</a>
                </li>
                <li>
                <a className='btn btn-light rounded-9 text-capitalize' onClick={() => setRestaurantOpen(!isRestaurantOpen)}>
                <i class="fa fa-cutlery" aria-hidden="true" style={{fontSize:"15px"}}></i><br/>
                Rekomendasi resto</a>
                </li>
      </ul>
      {isAccommodationOpen && (
        <div>
    <h5 className='txtblack fw-bolder'>Rekomendasi Hotel</h5>              
<Slider {...settings}>
{datahotel
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
      {isTransportOpen && (
        <div>
        <h5 className='txtblack fw-bolder'>Persewaan kendaraan</h5>  
              <Slider {...settings}>
              {motors
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
      <MDBAccordionItem collapseId={3} headerTitle='Tips & Trik Ala Backpacker Jogja'>
      Hindari membawa barang-barang yang tidak terlalu penting. Bila berencana membeli kaos di lokasi tujuan, maka bawalah baju secukupnya.
      Barang-barang yang wajib dibawa para backpacker adalah kamera poket + charger, tripod atau tongsis, power bank karena pasti sangat membutuhkan GPS dan translator bahasa, botol minum (bisa diisi di hotel dan mengurangi sampah plastik), itinerary perjalanan, kontak hotel dan rental kendaraan bila memang menyewa kendaraan, jadwal keberangkatan kereta atau bis, dompet, kartu debit/credit berlogo visa/mastercard, paspor bagi yang ke luar negeri, KTP, tas lipat kain untuk menaruh barang (sebagai upaya mengurangi sampah plastik), sepatu atau sandal yang nyaman untuk perjalanan jauh, topi dan sun glasses bila memang ke daerah yang panas dan terik, dan tentunya jaket tebal lengkap dengan sarung tangan, kaus kaki, dan topi rajut bila tujuannya ke daerah yang dingin.
      </MDBAccordionItem>
    </MDBAccordion>
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

        <div>
        <br/>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Tambahkan Pengalamanmu Selama Perjalanan Wisata</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Tambahkan catatan"
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}/>
      </Form.Group>
        
      <button className='btn btn-outline-primary custom-button rounded-9 text-capitalize mb-2 ml-2' onClick={saveNote}>Simpan</button>
      <br/>
      <br/>
      <div>
        <ul style={{listStyle:"none"}}>
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    <br/>
    <br/>
    <Form.Label>Tambahkan keperluan yang harus kamu bawa</Form.Label>
      <Form.Control type="text" placeholder="Tambahkan keperluan anda"
      value={newNote}
        onChange={(e) => setNewNote(e.target.value)}  />
    <br/>
      <button className='btn btn-outline-primary custom-button rounded-9 text-capitalize mb-2 ml-2' onClick={savenewNote}>Tambah</button>
      <br/>
      <div>
        <ul style={{listStyle:"none"}}>
          {checklistNotes.map((note, index) => ( 
            <li key={index}>
              <input
              className="form-check-input"
                type="checkbox"
                checked={note.isMarked}
                onChange={() => markNote(index)}
                style={{marginRight:"10px"}}
              />
              {note.text}
            </li>
          ))}
        </ul>
      </div>


      <MapContainer ref={mapRef} center={userLocation || [0, 0]} zoom={14} style={{ width: '100%', height: '500px'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && (
        <Marker position={userLocation} icon={customIcon}>
          <Popup>Lokasi Anda</Popup>
        </Marker>
      )}

{loaditinerary
  .filter((day) => day.Hari === 1)
  .map((day, index) => (
    <>
      {day.Tempatwisata && day.Tempatwisata['Hotel'] && (
        <Marker position={[day.Tempatwisata.Hotel.latitude, day.Tempatwisata.Hotel.longitude]}   icon={customIconhotel}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{day.Tempatwisata.Hotel.name}</p>
      <p><img src={day.Tempatwisata.Hotel.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", maxHeight:"50px"}}/></p>
        <p className='text-capitalize'>Range harga: {day.Tempatwisata.Hotel.priceRange}</p>
      <div className="ms-auto text-warning">
                <Rating value={day.Tempatwisata.Hotel.rating} maxValue={5} />
                </div>
          <a href={`${day.Tempatwisata.Hotel.webUrl}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Info</a>
        </div>
          </Popup>
        </Marker>
      )}
      </>
  ))}

      {loaditinerary
  .filter((day) => day.Hari === selectedDay)
  .map((day, index) => (
    <>
      {day.Tempatwisata && day.Tempatwisata['Makanpagi'] && (
        <Marker position={[day.Tempatwisata.Makanpagi.latitude, day.Tempatwisata.Makanpagi.longitude]}   icon={customIconresto}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{day.Tempatwisata.Makanpagi.nama}</p>
      <p><img src={day.Tempatwisata.Makanpagi.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", maxHeight:"50px"}}/></p>
      <div className="ms-auto text-warning">
                <Rating value={day.Tempatwisata.Makanpagi.rating} maxValue={5} />
                </div>
                <p>Harga: {day.Tempatwisata.Makanpagi.harga}</p>
          <a href={`${day.Tempatwisata.Makanpagi.maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
        </div>
          </Popup>
        </Marker>
      )}

      {day.Tempatwisata && day.Tempatwisata['Makansiang'] && (
        <Marker position={[day.Tempatwisata.Makansiang.latitude, day.Tempatwisata.Makansiang.longitude]}   icon={customIconresto}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{day.Tempatwisata.Makansiang.nama}</p>
      <p><img src={day.Tempatwisata.Makansiang.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", maxHeight:"50px"}}/></p>
      <div className="ms-auto text-warning">
                <Rating value={day.Tempatwisata.Makansiang.rating} maxValue={5} />
                </div>
                <p>Harga: {day.Tempatwisata.Makansiang.harga}</p>
          <a href={`${day.Tempatwisata.Makansiang.maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
        </div>
          </Popup>
        </Marker>
      )}

      {day.Tempatwisata && day.Tempatwisata['Makanmalam'] && (
        <Marker position={[day.Tempatwisata.Makanmalam.latitude, day.Tempatwisata.Makanmalam.longitude]}   icon={customIconresto}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{day.Tempatwisata.Makanmalam.nama}</p>
      <p><img src={day.Tempatwisata.Makanmalam.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", maxHeight:"50px"}}/></p>
      <div className="ms-auto text-warning">
                <Rating value={day.Tempatwisata.Makanmalam.rating} maxValue={5} />
                </div>
                <p>Harga: {day.Tempatwisata.Makanmalam.harga}</p>
          <a href={`${day.Tempatwisata.Makanmalam.maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
        </div>
          </Popup>
        </Marker>
      )}

      {day.Tempatwisata && day.Tempatwisata['pagi'] && (
        <Marker position={[day.Tempatwisata.pagi.latitude, day.Tempatwisata.pagi.longitude]} icon={customIconwisata}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{day.Tempatwisata.pagi.nama}</p>
      <p><img src={day.Tempatwisata.pagi.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", maxHeight:"50px"}}/></p>
      <div className="ms-auto text-warning">
                <Rating value={day.Tempatwisata.pagi.rating} maxValue={5} />
                </div>
          <a href={`${day.Tempatwisata.pagi.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
        </div>
          </Popup>
          <Tooltip direction="top" offset={[0, -32]} opacity={1} permanent>
          {day.Tempatwisata.pagi.nama}
        </Tooltip>
        </Marker>
      )}

      {day.Tempatwisata && day.Tempatwisata['siang'] && (
        <Marker position={[day.Tempatwisata.siang.latitude, day.Tempatwisata.siang.longitude]} icon={customIconwisata}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{day.Tempatwisata.siang.nama}</p>
      <p><img src={day.Tempatwisata.siang.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", maxHeight:"50px"}}/></p>
      <div className="ms-auto text-warning">
                <Rating value={day.Tempatwisata.siang.rating} maxValue={5} />
                </div>
          <a href={`${day.Tempatwisata.siang.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
        </div>
          </Popup>
          <Tooltip direction="top" offset={[0, -32]} opacity={1} permanent>
          {day.Tempatwisata.siang.nama}
        </Tooltip>
        </Marker>
      )}

      {day.Tempatwisata && day.Tempatwisata['malam'] && (
        <Marker position={[day.Tempatwisata.malam.latitude, day.Tempatwisata.malam.longitude]} icon={customIconwisata}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{day.Tempatwisata.malam.nama}</p>
      <p><img src={day.Tempatwisata.malam.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", maxHeight:"50px"}}/></p>
      <div className="ms-auto text-warning">
                <Rating value={day.Tempatwisata.malam.rating} maxValue={5} />
                </div>
          <a href={`${day.Tempatwisata.malam.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
        </div>
          </Popup>
          <Tooltip direction="top" offset={[0, -32]} opacity={1} permanent>
          {day.Tempatwisata.malam.nama}
        </Tooltip>
        </Marker>
      )}
    </>
  ))}

  {maps.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisatas}>
          <Popup>
          <div>
     <a href={`/wisata/${location.id}`} target='_blank'><p className='text-decoration-underline' style={{fontWeight:"bold"}}>{location.nama}</p></a>
      <p><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></p>
      <div className="ms-auto text-warning">
                <Rating value={location.rating} maxValue={5} />
                </div>
          <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
        </div>
          </Popup>
        </Marker>
        ))}
        {datahotel.map ((location, index) => (
          <Marker position={[location.latitude, location.longitude]}   icon={customIconhotels}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.name}</p>
      <p><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></p>
        <p className='text-capitalize'>Range harga: {location.priceRange}</p>
      <div className="ms-auto text-warning">
                <Rating value={location.rating} maxValue={5} />
                </div>
          <a href={`${location.webUrl}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Info</a>
        </div>
          </Popup>
        </Marker>
        ))}
        {dataresto.map((location, index) => {
          return(
      <Marker position={[location.latitude, location.longitude]}   icon={customIconrestos}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></p>
      <div className="ms-auto text-warning">
                <Rating value={location.rating} maxValue={5} />
                </div>
                <p>Harga: {location.harga}</p>
          <a href={`${location.url}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
        </div>
          </Popup>
        </Marker>
        )
        })}
  
      <Polyline
      positions={[center, sarapan, pagi,  siang, makansiang,  malam, makanmalam]}
      pathOptions={{ color: 'red' }}
    />
      </MapContainer>
    </div>
    </div>
      </div>
     </div>
    </div>
        </>
    )
}

export default Bodyitinerarybackpacker