import React, { useState, useEffect } from 'react';
import { useHistory, useParams} from 'react-router';
import Rating from './Rating';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import LikeButton from './LikeButton';
import ContentLoader from 'react-content-loader'
import { FormatRupiah } from "@arismun/format-rupiah";
import Swal from 'sweetalert2';
import Api from '../Api';
function Wisatabykategori(){
const [isSkleton, setIsSkleton] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;
const [users, setUser] = useState({})
const [kategoris, isKategori] = useState([])
const [wisataKategori, setwisataKategori] = useState([])
const token = localStorage.getItem("token");
const [longitude, setLongitude] = useState('');
const [latitude, setLatitude] = useState('')
const [isLoading, setIsLoading] = useState(true);
const history = useHistory();
const { kategori } = useParams();
const [week, setWeek] = useState('')
const [currentFilter, setCurrentFilter] = useState(''); 
const [locationFetched, setLocationFetched] = useState(false);
const fetchWeek = async () =>{
  const date = new Date().toISOString().split('T')[0];
  const response = await Api.get(`/api/checkweek/${date}`)
  const data = await (response.data)
  setWeek(data.result)
}


const fetchwisataKategori = async (latitude, longitude) => {
  setIsLoading(true)
  try {
    const response = await Api.get(`/api/listkategori/${kategori}`, {
      params: {
        latitude: latitude,
        longitude: longitude,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsLoading(false)
    setwisataKategori(response.data);
    setIsSkleton(false)
  } catch (error) {
    console.log(error);
    setIsLoading(false)
  }
};

const fetchKategori = async () =>{
    const response = await Api.get('/api/listkategori');
    const data = await response.data;
    isKategori(data)
  }

  
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchwisataKategori(latitude, longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
    fetchKategori();
    fetchWeek();
}, []);

const notlogin = async => {
  history.push('/login')
}
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

const handleFilterChange = (filter) => {
  setCurrentFilter(filter);
};



const dataArray = Object.values(wisataKategori);
const filteredData = dataArray.filter((item) => {
  if (currentFilter === 'Terdekat') {
    return item.distance < 10; 
  } else if (currentFilter === 'Terfavorit') {
    return item.rating >= 4.6;
  } else if (currentFilter === 'Terpopuler') {
    return item.jumlahrating >= 7000; 
  } else if (currentFilter === 'Untuk Anak') {
    return item.anak === 'yes'; 
  } else if (currentFilter === 'Untuk Lansia') {
    return item.lansia === 'yes'; 
  }
  return true; 
});

const counts = filteredData.length
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentData = filteredData.slice(startIndex, endIndex);

const filteredItems = kategoris.filter((item) => item.namakategori !== kategori);


const weekinfo = week
console.log(currentData)
const renderDatadesktop = () => {
  
  return currentData.map((item) => (
    <div className="col-lg-3 col-md-6 mb-3 mt-3">
    <div className="card shadow-0" style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <a className='hover hover-2 rounded-6' href={`/wisata/${item.id}`}>
       <img src={item.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"200px"}}/>
        <div className="hover-overlay"></div>
        </a>
      <div className="card-body" style={{flexGrow:"1"}}>
        <div className="d-flex justify-content-between">
        <p className="small text-muted"><i className="fa-regular fa-clock"></i>  {item.operating_hours}</p>
        </div>
        <div className="d-flex justify-content-between">
        <p className="small text-muted">Jarak: {item.distance.toFixed(1)}KM</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="small text-capitalize">{item.kategori}</p>
          { token ? (
          <LikeButton attractionId={item.id} userToken={token} />
          ) :( 
                <button className='btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9' onClick={notlogin}>
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> Suka
                </button>
              )}
        </div>
        <div className="d-flex justify-content-between">
        <p className="small text-capitalize">({item.jeniswisata})</p>
        </div>
        <div className="d-flex justify-content-between">
        {weekinfo === 'weekday' ? ( 
          item.htm_weekday === '0' ? (
      <p className='small'>Tiket: Gratis</p>
    ) : (
      <p className='small'>Tiket: <FormatRupiah value={item.htm_weekday} /> (Weekday)</p>
    )
        ) : (
          item.htm_weekend === '0' ? (
      <p className='small'>Tiket: Gratis</p>
    ) : (
      <p className='small'>Tiket: <FormatRupiah value={item.htm_weekend} /> (Weekend)</p>
    )
        )}
        </div>
        <div className="d-flex justify-content-between mb-3 mt-3">
          <h5 className="mb-0">{item.nama}</h5>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <p className="text-muted mb-0">Ratings: <span class="fw-bold">({item.rating})</span></p>
          <div className="ms-auto text-warning">
          <Rating value={item.rating} maxValue={5} />
          </div>
        </div>
      </div>
    </div>
  </div>
  ));
};

const handlePageChange = (newPage) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setCurrentPage(newPage);
};

const renderPaginations = () => {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  return (
      <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={handlePageChange}
    />

  );
};
    return(
        <>
        {wisataKategori.length === 0 ? (
    <div className="container py-5">
    <div className="py-5">
    <center>
    <div className="col-sm-8"><img src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-485.jpg" style={{width:"320px"}}/></div>
    </center>
    </div>
    </div>
      ) : (
        <div class="container">
        <div className="py-5">
        <div class="mt-0 row gx-3 justify-content-center">
        <p><i class="fa-solid fa-circle-info"></i> {counts} Tempat wisata tersedia </p>
        <p className='txtblack'>Filter berdasarkan :</p>
        <ul class="horizontal-list" style={{marginBottom:"30px"}}>
        
        <li><button className={`btn btn-sm btn-outline-dark custom-button-install rounded-9 ${
              currentFilter === ' ' ? 'actives' : ''
            }`}
            onClick={() => handleFilterChange('')}> Semua</button></li>
        <li> <button
            className={`btn btn-sm btn-outline-dark custom-button-install rounded-9 ${
              currentFilter === 'Terdekat' ? 'actives' : ''
            }`}
            onClick={() => handleFilterChange('Terdekat')}
          >
            Terdekat
          </button></li>
        <li><button className={`btn btn-sm btn-outline-dark custom-button-install rounded-9 ${
              currentFilter === 'Terpopuler' ? 'actives' : ''
            }`}
            onClick={() => handleFilterChange('Terpopuler')}> Terpopuler</button></li>
        <li><button className={`btn btn-sm btn-outline-dark custom-button-install rounded-9 ${
              currentFilter === 'Terfavorit' ? 'actives' : ''
            }`}
            onClick={() => handleFilterChange('Terfavorit')}> Terfavorit</button></li>
        <li><button className={`btn btn-sm btn-outline-dark custom-button-install rounded-9 ${
              currentFilter === 'Untuk Anak' ? 'actives' : ''
            }`}
            onClick={() => handleFilterChange('Untuk Anak')}> Untuk anak</button></li>
        <li><button className={`btn btn-sm btn-outline-dark custom-button-install rounded-9 ${
              currentFilter === 'Untuk Lansia' ? 'actives' : ''
            }`}
            onClick={() => handleFilterChange('Untuk Lansia')}> Untuk lansia</button></li>
      </ul>
      {isSkleton ? (
        <>
        <div className="col-lg-3 col-md-6 mb-3 mt-3">
    <div className="card shadow-0" style={{display:"flex",flexDirection:"column",height:"100%"}}>
        <ContentLoader
      width="100%" // Set to 100% to make it responsive
      height={400}
      viewBox="0 0 100% 400"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
    >
      <rect x="0%" y="0%" rx="4" ry="4" width="100%" height="50%" />
    </ContentLoader>
    </div>
    </div>
    <div className="col-lg-3 col-md-6 mb-3 mt-3">
    <div className="card shadow-0" style={{display:"flex",flexDirection:"column",height:"100%"}}>
        <ContentLoader
      width="100%" // Set to 100% to make it responsive
      height={400}
      viewBox="0 0 100% 400"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
    >
      <rect x="0%" y="0%" rx="4" ry="4" width="100%" height="50%" />
    </ContentLoader>
    </div>
    </div>
    <div className="col-lg-3 col-md-6 mb-3 mt-3">
    <div className="card shadow-0" style={{display:"flex",flexDirection:"column",height:"100%"}}>
        <ContentLoader
      width="100%" // Set to 100% to make it responsive
      height={400}
      viewBox="0 0 100% 400"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
    >
      <rect x="0%" y="0%" rx="4" ry="4" width="100%" height="50%" />
    </ContentLoader>
    </div>
    </div>
    <div className="col-lg-3 col-md-6 mb-3 mt-3">
    <div className="card shadow-0" style={{display:"flex",flexDirection:"column",height:"100%"}}>
        <ContentLoader
      width="100%" // Set to 100% to make it responsive
      height={400}
      viewBox="0 0 100% 400"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
    >
      <rect x="0%" y="0%" rx="4" ry="4" width="100%" height="50%" />
    </ContentLoader>
    </div>
    </div>
    </>
      ) : (
        <>
        {renderDatadesktop()}
        {renderPaginations()}
        </>
      )}  
        
        </div>
      </div>
      </div>

      )}
      <div className="container py-5">
    <div className="py-5">
    <h3 className="font-weight-bold mb-0 text-center text-capitalize font700 txtblack">Jelajahi lebih banyak lagi</h3>
    <div className="mt-5 mb-5 row gx-2 justify-content-center">
    { filteredItems.map((konten, index) =>  (
      <div class="col-4 d-md-none">
      <a href={`/kategori/${konten.namakategori}`} >
        <div className="hover hover-2 text-white rounded"><img src={konten.image} alt="" style={{minHeight:"115px"}}/>
          <div className="hover-overlay"></div>
          <div className="hover-2-content px-5 py-4">
            <p className="hover-2-title text-capitalize font-weight-bold mb-0"> <span class="font-weight-light">{konten.namakategori}</span></p>
          </div>
        </div>
        </a>
      </div>
      ))}
     
      
    {/* khusus hp */}
    { filteredItems.map((konten, index) =>  (
      <div className="col-lg-3 col-md-6 mb-3 d-none d-md-block">
      <a href={`/kategori/${konten.namakategori}`} >
        <div className="hover hover-2 text-white rounded"><img src={konten.image} alt="" style={{minHeight:"250px"}}/>
          <div className="hover-overlay"></div>
          <div className="hover-2-content px-5 py-4">
            <h3 className="hover-2-title text-capitalize font-weight-bold mb-0"> <span class="font-weight-light">{konten.namakategori}</span></h3>
            <p className="hover-2-description mb-0">{konten.deskripsi}</p>
          </div>
        </div>
        </a>
      </div>
      ))}
    </div>
    </div>
    </div>
  
        </>
    )
}

export default Wisatabykategori