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
import markerWisata from '../wisatamap.png'
import markerHotel from '../hotel.png'
const customIconwisata = new L.Icon({
  iconUrl: markerWisata,
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
});
const customIconhotel = new L.Icon({
  iconUrl: markerHotel,
  iconSize: [20, 20], 
  iconAnchor: [16, 32], 
});
function Bodymaps(){
  const [maps, setMaps] = useState([])
  const [hotel, setHotel] = useState([])
  const token = localStorage.getItem("token")
  const history = useHistory()

  const notlogin = async => {
    history.push('/login')
  }

  const fetchmaps = async () => {
    const response = await axios.get('http://localhost:8000/api/bodymaps')
    setMaps(response.data)
  }

  const fetchhotel = async () =>{
    const response = await axios.get('http://localhost:8000/api/hotelmaps')
    setHotel(response.data)
  }

  

  useEffect (() => {
    fetchmaps()
    fetchhotel()
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
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
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
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
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
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
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
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
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
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
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
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
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
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
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
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
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
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
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
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
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
      <Marker position={[location.latitude, location.longitude]} icon={customIconwisata}>
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