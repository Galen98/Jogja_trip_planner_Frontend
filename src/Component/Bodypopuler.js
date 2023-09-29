import Slider from "react-slick";
import React, { useEffect, useState } from 'react';
import Rating from "./Rating";
import { useHistory } from 'react-router-dom';
import LikeButton from "./LikeButton";
import { FormatRupiah } from "@arismun/format-rupiah";
import Api from "../Api";
import ContentLoader from 'react-content-loader'
function Bodypopuler(){
    const [topwisata, setTopwisata] = useState([])
    const token = localStorage.getItem("token")
    const history = useHistory()
    const [week, setWeek] = useState('')
    const [isSkleton, setIsSkleton] = useState(true);

    const fetchWeek = async () =>{
        const date = new Date().toISOString().split('T')[0];
        const response = await Api.get(`/api/checkweek/${date}`)
        const data = await (response.data)
        setWeek(data.result)
      }

  const notlogin = async => {
    history.push('/login')
  }
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
        dots: true,
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

      const fetchpopuler = async ()=>{
        const response = await Api.get('/api/topwisata')
        setTopwisata(response.data)
        setIsSkleton(false)
      }

      useEffect (()=>{
        fetchpopuler()
        fetchWeek()
      },[])
    
    return(
        <>
    <div className="container">
        <div className="py-5">
        <h3 className="font-weight-bold mb-0 text-center text-capitalize font700 txtblack">10 Wisata Jogja Terpopuler</h3>
        <div className="mt-5 mb-0 row gx-2 justify-content-center">
       
        {isSkleton ? (
          <>
          <Slider {...settings}>
      {["1", "2","2","2","1", "2","2","2","2","2"].map((index) => (
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
      ))}
      </Slider>
      </>
        ):(
          <> 
          <Slider {...settings}>
          { topwisata.map((item, index) =>  (
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
        {week === 'weekday' ? ( 
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
        ))}
        </Slider>
          </>
        )}
       
        
        </div>
        </div>
        </div>
        </>
    )
}

export default Bodypopuler