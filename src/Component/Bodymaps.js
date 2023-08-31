import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ReactDOMServer from 'react-dom/server'; 
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import Rating from './Rating';
import LikeButton from './LikeButton';
const MarkerWisata = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
  <path d="M 7,1 1,3 1,4 13,4 13,3 z m -6,4 0,1 1,0 0,5 -1,0 -1,2 14,0 -1,-2 -1,0 0,-5 1,0 0,-1 z M 5,6 C 5.497372,6 6,6.5325904 6,7 L 6,11 4,11 4,7 C 4,6.4726661 4.502628,6 5,6 z m 4,0 c 0.503364,0 1,0.4726661 1,1 l 0,4 -2,0 0,-4 C 8,6.4726661 8.496636,6 9,6 z"/>
</svg>
);
const MarkerPantai = (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.696 3.866C15.098 2.366 11.5 2.598 10 5.196l3.464 2m4.232-3.33c2.598 1.5 4.196 4.732 2.696 7.33l-5.196-3m2.5-4.33.5-.866m-.5.866c-1.821.488-2.982 1.165-4.232 3.33m4.232-3.33c.488 1.821.482 3.165-.768 5.33m-1.732-1-1.732-1m1.732 1-3 5.196M3 21l.88-1.056a2.001 2.001 0 0 1 3.139.08v0a2.001 2.001 0 0 0 3.107.118l.19-.218a2.236 2.236 0 0 1 3.367 0l.191.218c.838.957 2.344.9 3.107-.117v0a2.001 2.001 0 0 1 3.14-.08L21 21M6.708 16A7.97 7.97 0 0 1 12 14a7.97 7.97 0 0 1 5.292 2" fill="#000"/>
</svg>
)
const MarkerRekreasi = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
  <path d="m 2.9995255,2 c -1.322034,0 -1.322034,1.5 0,1.5 l 8.0000005,0 c 1.33909,0 1.338983,-1.5 0,-1.5 L 2.9995255,2 z m 1,2 -0.75,3 -2.25,0 c -1.322034,0 -1.322034,1.5 0,1.5 l 1.875,0 -0.875,3.5 1.5,0 0.875,-3.5 5.25,0 0.8750005,3.5 1.5,0 -0.875,-3.5 1.875,0 c 1.33909,0 1.338983,-1.5 0,-1.5 l -2.25,0 -0.7500005,-3 -1.5,0 0.75,3 -4.5,0 0.75,-3 -1.5,0 z"/>
</svg>
)
const MarkerCandi = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
  <path d="M 3,0 3,1 4,1 C 4.5988688,1 4.8411383,2.0430706 4.9375,2.90625 3.9652283,2.1499026 3.0249855,1.8795933 2.21875,2.03125 1.1884439,2.2250555 0.5,3.1743045 0.5,4.25 c 0,0.8419164 0.31211643,1.5788561 0.84375,2.34375 0.464621,0.6684787 1.1198438,1.4400576 1.9375,2.375 C 3.6476993,10.327756 4.3223039,11.572304 5,12.25 L 5,13 4,13.5 4,14 10,14 10,13.5 9,13 9,12.25 c 0.6776961,-0.677696 1.352301,-1.922244 1.71875,-3.28125 0.817656,-0.9349424 1.472879,-1.7065213 1.9375,-2.375 C 13.187884,5.8288561 13.5,5.0919164 13.5,4.25 13.5,3.1743045 12.811556,2.2250555 11.78125,2.03125 10.975015,1.8795933 10.034772,2.1499026 9.0625,2.90625 9.1588617,2.0430706 9.4011312,1 10,1 L 11,1 11,0 3,0 z M 2.375,3.03125 c 0.5098367,-0.095903 1.3604039,0.1012462 2.34375,1 C 3.603741,4.1696287 3,5.1495633 3,7 3,7.0311958 2.9995172,7.0624382 3,7.09375 2.6594765,6.6981019 2.3761871,6.3476871 2.15625,6.03125 1.6878836,5.3573824 1.5,4.8627724 1.5,4.25 1.5,3.5496757 1.8109254,3.1373551 2.375,3.03125 z m 8.75,0 c 0.188111,-0.027114 0.358981,-0.026526 0.5,0 C 12.189075,3.1373551 12.5,3.5496757 12.5,4.25 12.5,4.8627724 12.312116,5.3573824 11.84375,6.03125 11.623813,6.3476871 11.340524,6.6981019 11,7.09375 11.000483,7.0624382 11,7.0311958 11,7 11,5.1495633 10.396259,4.1696287 9.28125,4.03125 c 0.7113567,-0.6501623 1.351767,-0.9290858 1.84375,-1 z"/>
</svg>
)
const MarkerPegunungan = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
)
const MarkerDesa = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
  <path d="M 14,14 8.000001,2.9999992 9.000001,0 l -1,0 -1,1.9999995 L 6,0 5,0 6,2.9999992 0,14 z m -6.999999,-7.0000008 3,6.0000018 -6.000001,0 z"/>
</svg>
)
const MarkerSungai = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
  <path d="m1 11c0.641 0 1.829 1 2.4 1 0.535 0 1.795-1 2.4-1s1.866 1 2.4 1c0.642 0 1.825-1 2.399-1 0.641-0.029 1.902 1 2.4 1v2c-0.604 0-1.83-1-2.4-1-0.569 0-1.795 1-2.399 1-0.574 0-1.795-1-2.4-1-0.609 0-1.829 1-2.4 1-0.64 0-1.794-1-2.4-1zm0-8c1.094 0 2.001 0.3 2.001 1.75l-1e-3 2.5c0 2 1.5 3 2.5 3 0 0-0.5-1-0.5-3v-2.5c0-0.915-0.649-1.308-1.001-1.75 1.094 0 2.001 0.3 2.001 1.75v2.5c0 2 1.5 3 2.5 3 0 0-0.5-1-0.5-3l0.1-2.5c0.036571-0.91427-0.749-1.308-1.1-1.75 1.093 0 2 0.3 2 1.75v2.5c0 2 1.5 3 2.5 3 0 0-0.5-1-0.5-3v-2.5c0-3-3-3.75-4-3.75h-7l5e-4 2z"/>
</svg>
)
const MarkerAlam = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
  <path d="M 3,10 C 3,9 5,6 6.9763711,6 9,6 11,9 11,10 L 7,10 Z M 7,3 C 4,3 0,7 0,10 l 1,0 C 1,7 5,4 7,4 c 2,0 6,3 6,6 l 1,0 C 14,7 10,3 7,3 Z"/>
</svg>
)
const MarkerBelanja = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
  <path d="M 6,1 C 5,1 4,2.0209735 4,3 l 0,1 -0.75,0 0,9 7.5,0 0,-9 L 10,4 10,3 C 10,2 8.9895132,1 8,1 z m 0.5,1.25 1,0 c 0.8599138,0 1.25,0.5994182 1.25,1.25 l 0,0.5 -3.5,0 0,-0.5 C 5.25,2.8707948 5.5557891,2.25 6.5,2.25 z M 2,4 C 0.64345039,4 0,4.6434504 0,6 l 0,5 c 0,1.35655 0.74831793,2 2,2 z m 10,0 0,9 c 1.251682,0 2,-0.748318 2,-2 L 14,6 C 14,4.6853974 13.377523,4 12,4 z"/>
</svg>
)
const MarkerBudaya = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
  <path d="M 12,2 11,3.5 V 4 h 3 V 3.5 L 13,2 Z M 1,2 0,3.5 V 4 H 3 V 3.5 L 2,2 Z m 3,2 h 6 V 3 L 7,0 4,3 Z M 0,5 v 8 h 5 c 0,-1 0,-3 2,-3 2,0 2,2 2,3 h 5 V 5 H 11.018051 L 11,6 H 10 L 10.03249,5 H 4.0433213 L 4,6 H 3 V 5 Z m 3,3 c 1,0 1,1 1,2 H 2 C 2,9 2,8 3,8 Z m 8,0 c 1,0 1,0.7301391 1,2 l -2,0.02539 C 9.9645368,8.7473493 10,8 11,8 Z" />
</svg>
)
const MarkerMuseum = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
  <path d="M 7,1 1,3 1,4 13,4 13,3 z m -6,4 0,1 1,0 0,5 -1,0 -1,2 14,0 -1,-2 -1,0 0,-5 1,0 0,-1 z M 5,6 C 5.497372,6 6,6.5325904 6,7 L 6,11 4,11 4,7 C 4,6.4726661 4.502628,6 5,6 z m 4,0 c 0.503364,0 1,0.4726661 1,1 l 0,4 -2,0 0,-4 C 8,6.4726661 8.496636,6 9,6 z"/>
</svg>
)
const MarkerSeni = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
  <path
     d="M 7,-9.9999999e-8 C 3.134444,-9.9999999e-8 0,3.1344439 0,7 c 0,3.865556 3.134444,7 7,7 0.645556,0 1.1660156,-0.520461 1.1660156,-1.166016 0,-0.303333 -0.1121788,-0.577093 -0.3027344,-0.783203 -0.1827769,-0.206111 -0.2910156,-0.473992 -0.2910156,-0.773437 0,-0.645556 0.5204596,-1.166016 1.1660156,-1.166016 l 1.3730468,0 C 12.257994,10.111328 14,8.369323 14,6.222656 c 0,-3.4377778 -3.134445,-6.2226561 -7,-6.2226561 z M 8.9335938,1.3046874 A 1.3891786,1.3891786 0 0 1 10.322266,2.6933593 1.3891786,1.3891786 0 0 1 8.9335938,4.0839843 1.3891786,1.3891786 0 0 1 7.5449219,2.6933593 1.3891786,1.3891786 0 0 1 8.9335938,1.3046874 Z M 5.0390625,1.3242187 A 1.3891786,1.3891786 0 0 1 6.4296875,2.7148437 1.3891786,1.3891786 0 0 1 5.0390625,4.1035155 1.3891786,1.3891786 0 0 1 3.6503906,2.7148437 1.3891786,1.3891786 0 0 1 5.0390625,1.3242187 Z M 2.7070312,4.4472655 A 1.3891786,1.3891786 0 0 1 4.0957031,5.83789 1.3891786,1.3891786 0 0 1 2.7070312,7.226562 1.3891786,1.3891786 0 0 1 1.3183594,5.83789 1.3891786,1.3891786 0 0 1 2.7070312,4.4472655 Z m 8.5585938,0 A 1.3891786,1.3891786 0 0 1 12.654297,5.83789 1.3891786,1.3891786 0 0 1 11.265625,7.226562 1.3891786,1.3891786 0 0 1 9.8769531,5.83789 1.3891786,1.3891786 0 0 1 11.265625,4.4472655 Z"/>
</svg>
)
function Bodymaps(){
  const [maps, setMaps] = useState([])
  const token = localStorage.getItem("token")
  const history = useHistory()

  const customIconPantai = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(MarkerPantai),
    iconSize: [20, 20],
    iconAnchor: [12, 30],
  });

  const customIconPegunungan = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(MarkerPegunungan),
    iconSize: [15, 15],
    iconAnchor: [12, 30],
  });

  const customIconCandi = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(MarkerCandi),
    iconSize: [20, 20],
    iconAnchor: [18, 32],
  });

  const customIconMuseum = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(MarkerMuseum),
    iconSize: [20, 20],
    iconAnchor: [14, 32],
  });

  const customIconSeni = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(MarkerSeni),
    iconSize: [20, 20],
    iconAnchor: [14, 32],
  });

  const customIconBudaya = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(MarkerBudaya),
    iconSize: [20, 20],
    iconAnchor: [14, 32],
  });

  const customIconBelanja = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(MarkerBelanja),
    iconSize: [20, 20],
    iconAnchor: [14, 32],
  });

  const customIconRekreasi = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(MarkerRekreasi),
    iconSize: [20, 20],
    iconAnchor: [14, 32],
  });

  const customIconDesa = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(MarkerDesa),
    iconSize: [20, 20],
    iconAnchor: [14, 32],
  });

  const customIconSungai = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(MarkerSungai),
    iconSize: [20, 20],
    iconAnchor: [14, 32],
  });

  const customIconAlam = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(MarkerAlam),
    iconSize: [20, 20],
    iconAnchor: [14, 32],
  });
  

  const notlogin = async => {
    history.push('/login')
  }

  const fetchmaps = async () => {
    const response = await axios.get('http://localhost:8000/api/bodymaps')
    setMaps(response.data)
  }

  

  useEffect (() => {
    fetchmaps()
  },[])
  const center = [-7.8013966, 110.3621892];
  const zoom = 12; 

  const filteredCandi = maps.filter((item) => item.jeniswisata === 'candi');
  const filteredPantai = maps.filter((item) => item.jeniswisata === 'pantai');
  const filteredPegunungan = maps.filter((item) => item.jeniswisata === 'pegunungan');
  const filteredRekreasi = maps.filter((item) => item.jeniswisata === 'rekreasi');
  const filteredDesa = maps.filter((item) => item.jeniswisata === 'desa wisata');
  const filteredSungai = maps.filter((item) => item.jeniswisata === 'sungai rekreasi');
  const filteredAlam = maps.filter((item) => item.jeniswisata === 'rekreasi alam');
  const filteredBelanja = maps.filter((item) => item.jeniswisata === 'belanja');
  const filteredBudaya = maps.filter((item) => item.jeniswisata === 'budaya&sejarah');
  const filteredMuseum = maps.filter((item) => item.jeniswisata === 'museum sejarah');
  const filteredSeni = maps.filter((item) => item.jeniswisata === 'museum kesenian');

 
    return(
        <>
    <MapContainer center={center} zoom={zoom} style={{ height: '600px', width: '100%', marginTop:'50px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {filteredCandi.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconCandi}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p className='text-capitalize'>{location.jeniswisata}</p>
      <a href=''><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></a>
      <div className="ms-auto text-warning" style={{marginBottom:"5px"}}>
                <Rating value={location.rating} maxValue={5} />
                </div>
                { token ? (
                <LikeButton attractionId={location.id} userToken={token} style={{marginTop:"15px"}} />
                ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div><br/>
        <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
          </Popup>
          {/* <Tooltip direction="top" offset={[0, -32]} opacity={1} permanent>
          {location.nama}
        </Tooltip> */}
        </Marker>
        ))}

        {filteredPantai.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconPantai}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p>{location.jeniswisata}</p>
      <a href=''><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></a>
      <div className="ms-auto text-warning" style={{marginBottom:"5px"}}>
                <Rating value={location.rating} maxValue={5} />
                </div>
                { token ? (
                <LikeButton attractionId={location.id} userToken={token} style={{marginTop:"15px"}} />
                ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div><br/>
        <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
          </Popup>
        </Marker>
        ))}

        {filteredPegunungan.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconPegunungan}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p>{location.jeniswisata}</p>
      <a href=''><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></a>
      <div className="ms-auto text-warning" style={{marginBottom:"5px"}}>
                <Rating value={location.rating} maxValue={5} />
                </div>
                { token ? (
                <LikeButton attractionId={location.id} userToken={token} style={{marginTop:"15px"}} />
                ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div><br/>
        <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
          </Popup>
        </Marker>
        ))}

        {filteredRekreasi.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconRekreasi}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p>{location.jeniswisata}</p>
      <a href=''><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></a>
      <div className="ms-auto text-warning" style={{marginBottom:"5px"}}>
                <Rating value={location.rating} maxValue={5} />
                </div>
                { token ? (
                <LikeButton attractionId={location.id} userToken={token} style={{marginTop:"15px"}} />
                ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div><br/>
        <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
          </Popup>
        </Marker>
        ))}

        {filteredSeni.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconSeni}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p>{location.jeniswisata}</p>
      <a href=''><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></a>
      <div className="ms-auto text-warning" style={{marginBottom:"5px"}}>
                <Rating value={location.rating} maxValue={5} />
                </div>
                { token ? (
                <LikeButton attractionId={location.id} userToken={token} style={{marginTop:"15px"}} />
                ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div><br/>
        <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
          </Popup>
        </Marker>
        ))}

        {filteredDesa.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconDesa}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p>{location.jeniswisata}</p>
      <a href=''><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></a>
      <div className="ms-auto text-warning" style={{marginBottom:"5px"}}>
                <Rating value={location.rating} maxValue={5} />
                </div>
                { token ? (
                <LikeButton attractionId={location.id} userToken={token} style={{marginTop:"15px"}} />
                ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div><br/>
        <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
          </Popup>
        </Marker>
        ))}

        {filteredSungai.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconSungai}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p>{location.jeniswisata}</p>
      <a href=''><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></a>
      <div className="ms-auto text-warning" style={{marginBottom:"5px"}}>
                <Rating value={location.rating} maxValue={5} />
                </div>
                { token ? (
                <LikeButton attractionId={location.id} userToken={token} style={{marginTop:"15px"}} />
                ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div><br/>
        <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
          </Popup>
        </Marker>
        ))}

        {filteredAlam.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconAlam}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p>{location.jeniswisata}</p>
      <a href=''><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></a>
      <div className="ms-auto text-warning" style={{marginBottom:"5px"}}>
                <Rating value={location.rating} maxValue={5} />
                </div>
                { token ? (
                <LikeButton attractionId={location.id} userToken={token} style={{marginTop:"15px"}} />
                ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div><br/>
        <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
          </Popup>
        </Marker>
        ))}

        {filteredBelanja.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconBelanja}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p>{location.jeniswisata}</p>
      <a href=''><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></a>
      <div className="ms-auto text-warning" style={{marginBottom:"5px"}}>
                <Rating value={location.rating} maxValue={5} />
                </div>
                { token ? (
                <LikeButton attractionId={location.id} userToken={token} style={{marginTop:"15px"}} />
                ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div><br/>
        <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
          </Popup>
        </Marker>
        ))}

        {filteredBudaya.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconBudaya}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p>{location.jeniswisata}</p>
      <a href=''><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></a>
      <div className="ms-auto text-warning" style={{marginBottom:"5px"}}>
                <Rating value={location.rating} maxValue={5} />
                </div>
                { token ? (
                <LikeButton attractionId={location.id} userToken={token} style={{marginTop:"15px"}} />
                ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div><br/>
        <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
          </Popup>
        </Marker>
        ))}

        {filteredMuseum.map ((location, index) => (
      <Marker position={[location.latitude, location.longitude]} icon={customIconMuseum}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{location.nama}</p>
      <p>{location.jeniswisata}</p>
      <a href=''><img src={location.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></a>
      <div className="ms-auto text-warning" style={{marginBottom:"5px"}}>
                <Rating value={location.rating} maxValue={5} />
                </div>
                { token ? (
                <LikeButton attractionId={location.id} userToken={token} style={{marginTop:"15px"}} />
                ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div><br/>
        <a href={`${location.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
          </Popup>
        </Marker>
        ))}
    </MapContainer>
        </>
    )
}

export default Bodymaps