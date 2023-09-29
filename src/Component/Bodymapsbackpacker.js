import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import Rating from './Rating';
import markerWisata from '../wisatamap.png'
import markerHotel from '../hotel.png'
import markerIcon from '../mapmakersuser.png';
import markerResto from '../restomap.png'
const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
  });
const customIconwisata = new L.Icon({
  iconUrl: markerWisata,
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
});
  const customIconhotel = new L.Icon({
    iconUrl: markerHotel,
    iconSize: [30, 30], 
    iconAnchor: [16, 32], 
  });
  const customIconresto = new L.Icon({
    iconUrl: markerResto,
    iconSize: [40, 30], 
    iconAnchor: [16, 32], 
  });
function Bodymapsbackpacker(){
  const [maps, setMaps] = useState([])
  const mapRef = useRef(null);
  const [hotel, setHotel] = useState([])
  const [resto, setResto] = useState([])
  const token = localStorage.getItem("token")
  const history = useHistory()
  const [userLocation, setUserLocation] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false);

  const fetchmaps = async () => {
    const response = await axios.get('http://localhost:8000/api/bodymaps')
    setMaps(response.data)
  }
  const fetchhotel = async () =>{
    const response = await axios.get('http://localhost:8000/api/hotelbackpacker')
    setHotel(response.data)
  }
  const fetchresto = async () =>{
    const response = await axios.get('http://localhost:8000/api/restobackpacker')
    setResto(response.data)
  }

  const datahotel = Object.values(hotel);
  const dataresto = Object.values(resto);

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

  useEffect(() => {
    fetchmaps()
    fetchhotel()
    fetchresto()
  })
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



  return(
    <>
        <MapContainer ref={mapRef} center={userLocation || [0, 0]} zoom={14} style={{ height: '600px', width: '100%', marginTop:'50px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
       {userLocation && (
        <Marker position={userLocation} icon={customIcon}>
          <Popup>Lokasi Anda</Popup>
          {/* <Tooltip direction="top" offset={[0, -32]} opacity={1} permanent>
        </Tooltip> */}
        </Marker>
      )}

      {maps.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
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
          <Marker position={[location.latitude, location.longitude]}   icon={customIconhotel}>
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
      <Marker position={[location.latitude, location.longitude]}   icon={customIconresto}>
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
      </MapContainer>
    </>
  )
}

export default Bodymapsbackpacker