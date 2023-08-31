import React, { useState, useEffect } from 'react';
import { useHistory, useParams} from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from './Rating';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import LikeButton from './LikeButton';
import { FormatRupiah } from "@arismun/format-rupiah";


function Wisatabykategori(){
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;
const [users, setUser] = useState({})
const [kategoris, isKategori] = useState([])
const [wisataKategori, setwisataKategori] = useState([])
const token = localStorage.getItem("token");
const [isLoading, setIsLoading] = useState(true);
const history = useHistory();
const { kategori } = useParams();
const [week, setWeek] = useState('')

const fetchData = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.get('http://localhost:8000/api/user')
    .then((response) => {
        setUser(response.data);
    })
}

const fetchWeek = async () =>{
  const date = new Date().toISOString().split('T')[0];
  const response = await axios.get(`http://localhost:8000/api/checkweek/${date}`)
  const data = await (response.data)
  setWeek(data.result)
}



const fetchwisataKategori = async()=>{
    const response = await axios.get(`http://localhost:8000/api/listkategori/${kategori}`)
    const data = await response.data
    setwisataKategori(data)
    setIsLoading(false); 
}

const fetchKategori = async () =>{
    const response = await axios.get('http://localhost:8000/api/listkategori');
    const data = await response.data;
    isKategori(data)
    
  }

useEffect(() => {
    if(!token) {
        history.push('/');
    }
    fetchwisataKategori();
    fetchData();
    fetchKategori();
    fetchWeek();
}, []);





const dataArray = Object.values(wisataKategori);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentData = dataArray.slice(startIndex, endIndex);

const filteredItems = kategoris.filter((item) => item.namakategori !== kategori);

// const renderData = () => {
//   return currentData.map((item) => (
//     <div class="col-6 mb-4 d-md-none">
//     <div className="card shadow-0" style={{display:"flex",flexDirection:"column",height:"100%"}}>
//           <a className='hover hover-2 rounded-6' href='/' >
//            <img src={item.image} className="card-img-top img-responsive" style={{objectFit:"cover", height:"200px"}}/>
//             <div className="hover-overlay"></div>
//             </a>
//           <div className="card-body" style={{flexGrow:"1"}}>
//             {/* <div className="d-flex justify-content-between">
//               <p className="small text-muted">{item.kategori}</p>
//             </div> */}
//             <div className="d-flex justify-content-between">
//             <p className="small text-muted"  style={{fontSize:"13px"}}><i className="fa-regular fa-clock"></i>  {item.operating_hours}</p>
//             </div>
//             <div className="d-flex justify-content-between" style={{fontSize:"14px"}}>
//         {weekinfo === 'weekday' ? ( 
//           item.htm_weekday === 'Gratis' ? (
//       <p className='small'>Tiket: Gratis</p>
//     ) : (
//       <p className='small'>Tiket: <FormatRupiah value={item.htm_weekday} /> (Weekday)</p>
//     )
//         ) : (
//           item.htm_weekend === 'Gratis' ? (
//       <p className='small'>Tiket: Gratis</p>
//     ) : (
//       <p className='small'>Tiket: <FormatRupiah value={item.htm_weekend} /> (Weekend)</p>
//     )
//         )}
//         </div>
//             <LikeButton attractionId={item.id} userToken={token} />
            
//             <div className="d-flex justify-content-between mb-2 mt-2">
//               <h5 className="mb-0 small">{item.nama}</h5>
//             </div>
//             <div className="d-flex justify-content-between mb-2">
//               <div className="text-warning">
//                 <Rating value={item.rating} maxValue={5} />
//                 <p className="small text-muted mb-0"><span>({item.rating})</span></p>
//               </div>
//             </div>
//           </div>
//         </div>
//     </div>
//   ));

// };

const weekinfo = week

const renderDatadesktop = () => {
  return currentData.map((item) => (
    <div className="col-lg-3 col-md-6 mb-3 mt-3">
    <div className="card shadow-0" style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <a className='hover hover-2 rounded-6' href='/'>
       <img src={item.image}
        className="card-img-top img-responsive" style={{objectFit:"cover", minHeight:"200px"}}/>
        <div className="hover-overlay"></div>
        </a>
      <div className="card-body" style={{flexGrow:"1"}}>
        <div className="d-flex justify-content-between">
        <p className="small text-muted"><i className="fa-regular fa-clock"></i>  {item.operating_hours}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="small">{item.kategori}</p>
          <LikeButton attractionId={item.id} userToken={token} />
        </div>
        <div className="d-flex justify-content-between">
        {weekinfo === 'weekday' ? ( 
          item.htm_weekday === 'Gratis' ? (
      <p className='small'>Tiket: Gratis</p>
    ) : (
      <p className='small'>Tiket: <FormatRupiah value={item.htm_weekday} /> (Weekday)</p>
    )
        ) : (
          item.htm_weekend === 'Gratis' ? (
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
  // Scroll to the top of the page when changing pages
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update the current page state
  setCurrentPage(newPage);
};

const renderPaginations = () => {
  const totalPages = Math.ceil(dataArray.length / itemsPerPage);

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
        <div class="mt-3 row gx-3 justify-content-center">
          {renderDatadesktop()}
        {renderPaginations()}
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