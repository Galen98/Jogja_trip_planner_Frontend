import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import markerIcon from '../mapmakersuser.png';
import markerWisata from '../wisatamap.png'
import markerResto from '../restomap.png'
import markerKopi from '../kopi.png'
import markerHotel from '../hotel.png'
import Rating from './Rating';
import Api from '../Api';
const Exploremaps = () => {
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
  const customIconkopi = new L.Icon({
    iconUrl: markerKopi,
    iconSize: [30, 30], 
    iconAnchor: [16, 32], 
  });
  const [userLocation, setUserLocation] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false);
  const mapRef = useRef(null);
  const [latitude, setLatitude] = useState([])
  const [longitude, setLongitude] = useState([])
  const [nearby, setNearby] = useState([])
  const [resto, setResto] = useState([])
  const [hotel, setHotel] = useState([])

  const fetchnearby = async(latitude, longitude) =>{
    try{
      const response = await Api.post(
        '/api/explorewisata',
        {
          latitude: latitude,
          longitude: longitude
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setNearby(response.data)
    } catch (error){
      console.log(error)
    }
  }

  const fetchhotel = async(latitude, longitude) =>{
    try{
      const response = await Api.post(
        '/api/listhotel',
        {
          latitude: latitude,
          longitude: longitude
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setHotel(response.data)
    } catch (error){
      console.log(error)
    }
  }

  const fetchResto = async(latitude, longitude) =>{
    try{
      const response = await Api.post(
        '/api/listresto',
        {
          latitude: latitude,
          longitude: longitude
        },
        {
          headers: {
            'Content-Type':'application/json',
          }
        }
      )
      setResto(response.data)
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    if (!locationFetched && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setLatitude(latitude)
          setLongitude(longitude)
          setLocationFetched(true);
          fetchnearby(position.coords.latitude, position.coords.longitude)
          fetchResto(latitude,longitude)
          fetchhotel(latitude,longitude)
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

 

  
  return (
    <div className='rounded-9'>
    <MapContainer ref={mapRef} center={userLocation || [0, 0]} zoom={14} style={{ width: '100%', height: '500px'}}>
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

        {nearby.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></p>
      <div className="ms-auto text-warning">
                <Rating value={location.rating} maxValue={5} />
                <p className='text-dark'>Jarak: {location.distance.toFixed(1)} KM</p>
                </div>
          <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
        </div>
          </Popup>
          <Tooltip direction="top" offset={[0, -32]} opacity={1} permanent>
          {location.nama}
        </Tooltip>
        </Marker>
        ))}

        {resto.map((location, index) => {
          const icons = location.cuisine === 'Coffee Shop' ? customIconkopi : customIconresto;
          return(
      <Marker position={[location.latitude, location.longitude]}   icon={icons}>
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

        {hotel.map ((location, index) => (
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
    </MapContainer>
    </div>
  );
};

export default Exploremaps;