import React, { useState, useEffect } from 'react';
import { useHistory, useParams} from 'react-router';
import Rating from './Rating';
import { FormatRupiah } from "@arismun/format-rupiah";
import {Breadcrumb } from 'react-bootstrap';
import { Row, Col, Image } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerWisata from '../wisatamap.png'
import { Carousel } from 'react-bootstrap';
import Api from '../Api';
function Bodywisatapage(){
const [wisata, setWisata] = useState([])
const token = localStorage.getItem('token')
const { wisataid } = useParams();
const history = useHistory()
const customIconwisata = new L.Icon({
    iconUrl: markerWisata,
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
  });
const fetchWisata = async () =>{
    const response = await Api.get(`/api/wisata/${wisataid}`);
    const data = await response.data;
    setWisata(data)
  }

  const notlogin = async => {
    history.push('/login')
  }

  useEffect(()=>{
    fetchWisata()
  },[])
  const dataArray = Object.values(wisata);

    return(
        <>
    <div className="container" style={{marginTop:"70px", overflow:"hidden"}}>
    <div className="py-5">
    {dataArray.map((item,index)=>(
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href={`/kategori/${item.kategori}`}>
       {item.kategori}
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{item.nama}</Breadcrumb.Item>
    </Breadcrumb>
    ))}
    {dataArray.map((item,index)=>(
    <div className='justify-content-center'>
    
    <h1 className='txtblack fw-bold text-capitalize'>{item.nama}</h1>
    <div className='d-none d-md-block'>
    <Row>
        <Col md={8}>
          <Image src={item.image2} fluid className='image-large rounded-3' />
        </Col>
        <Col md={4}>
          <Row>
            <Col>
              <Image src={item.image} className='image-small rounded-3' fluid />
            </Col>
          </Row>
          <Row>
            <Col>
              <Image src={item.image3} className='image-small rounded-3' fluid />
            </Col>
          </Row>
        </Col>
      </Row>
      </div>
      <div className='d-md-none'>
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 rounded-3"
          src={item.image2}
          alt="First slide" style={{minHeight:"250px",maxHeight:"250px"}}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 rounded-3"
          src={item.image3}
          alt="Second slide" style={{minHeight:"250px",maxHeight:"250px"}}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 rounded-3"
          src={item.image}
          alt="Third slide" style={{minHeight:"250px",maxHeight:"250px"}}
        />
      </Carousel.Item>
    </Carousel>
    </div>
      </div>
      ))}

      {dataArray.map((item,index)=>(
      <div className="row gx-5">
    <div className="col-md-6" style={{marginTop:"30px"}}>
    <h5 className='font-weight-bold text-capitalize font600 txtblack'>Deskripsi:</h5>
    <p className="mt-2 font-weight-bold">{item.deskripsi}</p>
    <h5 className='font-weight-bold text-capitalize font600 txtblack'>Kategori:</h5>
    <p className="mt-2 font-weight-bold text-capitalize">{item.kategori}, {item.jeniswisata}</p>
    <h5 className='font-weight-bold text-capitalize font600 txtblack'>Alamat:</h5>
    <p className="mt-2 font-weight-bold text-capitalize">{item.alamat}</p>
    <h5 className='font-weight-bold text-capitalize font600 txtblack'>Harga Tiket:</h5>
    <svg id="Capa_1" style={{width:"30px",height:"30px", marginRight:"5px"}} enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg" class="budget-label__icon svelte-vogtw4"><g><path d="m497 160.455c-2.707 0-5.027-1.923-5.518-4.573-1.318-7.109-7.519-12.267-14.749-12.267h-28.753v-57.972c0-8.284-6.716-15-15-15-2.707 0-5.027-1.923-5.518-4.573-1.318-7.109-7.519-12.267-14.749-12.267h-281.113c-7.23 0-13.431 5.158-14.749 12.267-.491 2.649-2.812 4.573-5.518 4.573s-5.027-1.923-5.518-4.573c-1.318-7.109-7.519-12.267-14.749-12.267h-55.799c-7.23 0-13.431 5.158-14.749 12.267-.491 2.649-2.812 4.573-5.518 4.573-8.284 0-15 6.716-15 15v250.902c0 8.284 6.716 15 15 15 2.707 0 5.027 1.923 5.518 4.573 1.318 7.109 7.519 12.267 14.749 12.267h28.753v57.973c0 8.284 6.716 15 15 15 2.707 0 5.027 1.923 5.518 4.573 1.318 7.109 7.519 12.267 14.749 12.267h55.798c7.23 0 13.431-5.158 14.749-12.267.491-2.649 2.812-4.573 5.519-4.573s5.027 1.923 5.519 4.573c1.317 7.109 7.519 12.267 14.749 12.267h281.113c7.23 0 13.431-5.158 14.749-12.267.491-2.649 2.812-4.573 5.518-4.573 8.284 0 15-6.716 15-15v-250.903c-.001-8.284-6.717-15-15.001-15zm-467 164.398v-227.519c6.281-2.918 11.607-7.625 15.273-13.531h35.787c6.34 10.215 17.647 16.839 30.273 16.839s23.933-6.624 30.273-16.839h261.102c3.666 5.906 8.992 10.612 15.273 13.531v227.519c-6.281 2.919-11.607 7.625-15.273 13.531h-261.102c-6.341-10.215-17.648-16.839-30.273-16.839s-23.933 6.624-30.273 16.839h-35.787c-3.666-5.906-8.992-10.612-15.273-13.531zm452 89.813c-6.281 2.918-11.607 7.625-15.273 13.531h-261.102c-6.34-10.215-17.647-16.839-30.273-16.839s-23.933 6.624-30.273 16.839h-35.787c-3.666-5.906-8.992-10.612-15.273-13.531v-46.584c5.909-1.185 10.661-5.847 11.794-11.964.491-2.649 2.812-4.573 5.518-4.573s5.027 1.923 5.518 4.573c1.318 7.109 7.519 12.267 14.749 12.267h28.753v8.338c0 8.284 6.716 15 15 15s15-6.716 15-15v-8.338h222.36c7.23 0 13.431-5.157 14.749-12.267.491-2.649 2.812-4.573 5.518-4.573 8.284 0 15-6.716 15-15v-162.929h18.747c3.666 5.906 8.992 10.612 15.273 13.531v227.519z"></path><path d="m111.333 301.911c8.284 0 15-6.716 15-15v-14.317c0-8.284-6.716-15-15-15s-15 6.716-15 15v14.317c0 8.284 6.715 15 15 15z"></path><path d="m111.333 233.253c8.284 0 15-6.716 15-15v-14.318c0-8.284-6.716-15-15-15s-15 6.716-15 15v14.318c0 8.284 6.715 15 15 15z"></path>
          <path d="m111.333 164.595c8.284 0 15-6.716 15-15v-14.317c0-8.284-6.716-15-15-15s-15 6.716-15 15v14.317c0 8.284 6.715 15 15 15z"></path><path d="m228.005 232.364-5.866 34.203c-.965 5.627 1.348 11.315 5.967 14.671 4.62 3.356 10.744 3.798 15.797 1.142l30.716-16.148 30.717 16.148c2.194 1.154 4.591 1.723 6.979 1.723 3.11 0 6.205-.966 8.818-2.865 4.619-3.356 6.933-9.043 5.967-14.671l-5.867-34.203 24.851-24.223c4.088-3.985 5.56-9.946 3.795-15.376-1.764-5.43-6.458-9.388-12.109-10.209l-34.342-4.99-15.358-31.12c-2.527-5.12-7.742-8.361-13.451-8.361s-10.924 3.242-13.451 8.362l-15.358 31.119-34.342 4.99c-5.65.821-10.345 4.779-12.109 10.209-1.765 5.43-.293 11.391 3.795 15.376zm29.923-26.244c4.886-.71 9.109-3.779 11.294-8.206l5.397-10.937 5.397 10.937c2.185 4.427 6.409 7.496 11.294 8.206l12.068 1.753-8.733 8.513c-3.535 3.446-5.148 8.411-4.314 13.277l2.062 12.02-10.794-5.675c-2.185-1.149-4.583-1.723-6.98-1.723s-4.795.574-6.98 1.723l-10.794 5.675 2.062-12.02c.834-4.866-.779-9.831-4.314-13.277l-8.733-8.513z"></path></g>
          </svg> Weekday: <FormatRupiah value={item.htm_weekday} />, Weekend: <FormatRupiah value={item.htm_weekend} />
    </div>
    <div className="col-md-6" style={{marginTop:"30px"}}>
    <p className='mt-2 font-weight-bold text-capitalize'><i class="fa fa-clock-o" aria-hidden="true"></i> Jam Operasional: {item.operating_hours}</p>
    <MapContainer center={[item.latitude, item.longitude] || [0, 0]} zoom={14} style={{ width: '100%', height: '500px'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[item.latitude, item.longitude]} icon={customIconwisata}>
          <Popup>
          <div>
      <p style={{fontWeight:"bold"}}>{item.nama}</p>
      <p><img src={item.image} className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"50px"}}/></p>
      <div className="ms-auto text-warning">
        <Rating value={item.rating} maxValue={5} />
        </div>
          <a href={`${item.url_maps}`} target='_blank' className="btn btn-sm btn-primary text-white text-text-capitalize">Dapatkan Arah</a>
        </div>
          </Popup>
          <Tooltip direction="top" offset={[0, -32]} opacity={1} permanent>
          {item.nama}
        </Tooltip>
        </Marker>
      </MapContainer>
    </div>
    </div>
    ))}
    </div>
    </div>
        </>
    )
}

export default Bodywisatapage