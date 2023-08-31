import React, { useState, Component, useEffect, useRef   } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import Rating from './Rating';
function Tipewisatawan(){
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
              arrows: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              infinite: true,
              dots: false,
              arrows: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: false,
              arrows: true
            }
          }
        ]
      };
    const [user, setUser] = useState({});
    const [tipes,setTipe] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const userData = localStorage.getItem("userData");
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      await axios.get('http://localhost:8000/api/user')
      .then((response) => {
          setUser(response.data);
      })
  }

  console.log(tipes)

  const storedUserData = JSON.parse(userData);
  const fetchTipe = async () =>{
    const response = await axios.get(`http://localhost:8000/api/rekomentipe/${storedUserData.tipe}`)
    const data = await response.data
    setTipe(data)
    setIsLoading(false); 
  }

  const tipefix = Object.values(tipes)
  
  
 console.log(tipefix)

  useEffect(() => { 
    if (user) {
        fetchTipe()
      } 
    fetchData();
    fetchTipe()
    }, []);
    

    

    function Backpacker(){
    const isBackpacker = user.tipe
    if (isBackpacker == 'backpacker'){
        return <><h3 className="font-weight-bold mt-5 mb-5 text-center text-capitalize font700 txtblack">Anda adalah wisatawan backpacker</h3>
        <div className="col-sm-8"><img src="https://cdn.dribbble.com/users/2323680/screenshots/9533756/media/95bfbf77033779c73fac9bc157453907.png" style={{width:"300px"}}/></div>
        <div className="col-sm-8">
        <p className="font-weight-bold text-center">Kami akan hadirkan perjalanan wisata yang sesuai untuk anda sebagai backpacker.</p>
        <p className="font-weight-bold text-center">Semua wisata dan kebutuhanmu dalam satu aplikasi.</p>
        <p className="font-weight-bold text-center">Lebih dari 100 tempat wisata hadir untuk anda.</p>
        </div></>
    }
    return <p></p>;
    }

    function Family(){
        const isFamily = user.tipe
        if (isFamily == 'family'){
            return <><h3 className="font-weight-bold mt-5 mb-5 text-center text-capitalize font700 txtblack">Anda adalah wisatawan keluarga</h3>
            <div className="col-sm-8"><img src="https://static.vecteezy.com/system/resources/previews/008/324/703/original/happy-family-traveling-on-the-summer-holiday-or-vacation-family-with-children-travel-around-the-world-by-car-illustration-in-flat-style-vector.jpg" style={{width:"350px"}}/></div>
            <div className="col-sm-8">
            <p className="font-weight-bold text-center">Kami akan hadirkan perjalanan wisata yang sesuai untuk anda dan keluarga.</p>
            <p className="font-weight-bold text-center">Semua wisata dan kebutuhanmu dalam satu aplikasi.</p>
            <p className="font-weight-bold text-center">Lebih dari 100 tempat wisata hadir untuk anda.</p>
            </div></>
        }
        return <p></p>;
        }

        function Grup(){
            const isGrup = user.tipe
            if (isGrup == 'grup'){
                return <><h3 className="font-weight-bold mt-5 mb-5 text-center text-capitalize font700 txtblack">Anda adalah grup wisatawan</h3>
                <div className="col-sm-8"><img src="https://img.freepik.com/free-vector/female-guide-with-group-tourists-flat-vector-illustration-happy-girls-guys-having-excursion-with-tour-guide-holding-flag-men-women-taking-photo-looking-sightseeing-tourism-trip-concept_74855-24526.jpg" style={{width:"320px"}}/></div>
                <div className="col-sm-8">
                <p className="font-weight-bold text-center">Kami akan hadirkan perjalanan wisata yang sesuai untuk anda dan grup wisata anda.</p>
                <p className="font-weight-bold text-center">Semua wisata dan kebutuhanmu dalam satu aplikasi.</p>
                <p className="font-weight-bold text-center">Lebih dari 100 tempat wisata hadir untuk anda.</p>
                </div></>
            }
            return <p></p>;
            }

        // function Wisatarekomen(){
        //     const tipeuser = user.tipe
        //     if(tipeuser == 'grup'){
        //         return <>
        //            <h3 className="font-weight-bold mt-5 mb-5 text-center text-capitalize font700">Rekomendasi wisata bersama grup anda</h3> 
        //         </>
        //     }
        //     if(tipeuser == 'backpacker'){
        //         return <>
        //            <h3 className="font-weight-bold mt-5 mb-5 text-center text-capitalize font700">Rekomendasi wisata untuk petualangan anda</h3> 
                   
        //         </>
        //     }
        //     if(tipeuser == 'family'){
        //         return <>
        //            <h3 className="font-weight-bold mt-5 mb-5 text-center text-capitalize font700">Rekomendasi wisata untuk anda dan keluarga</h3> 
        //         </>
        //     }
        //     return <p></p>
        // }
    
    return(
        <>
        <div className="mt-5 mb-5 row gx-4 justify-content-center">
        <Backpacker isBackpacker={false} />
        <Family isFamily={false}/>
        <Grup isGrup={false}/>
        {/* <Wisatarekomen tipeuser={false}/> */}
        {/* { tipefix.map((konten, index) =>  (
        <div>
            <p>{konten.nama}</p>
        </div>
        ))} */}
        {/* {isLoading ? (
        <div>
        <Slider {...settings}>
          <div>
          <div className="skeleton text-white rounded"><img alt="" style={{minHeight:"250px"}}/>
          <div className="hover-overlay"></div>
          <div className="hover-2-content px-5 py-4">
            <h3 className="hover-2-title text-capitalize font-weight-bold mb-0"> <span class="font-weight-light"></span></h3>
            <p className="hover-2-description mb-0"></p>
          </div>
        </div>
          </div>
          <div>
          <div className="skeleton text-white rounded"><img alt="" style={{minHeight:"250px"}}/>
          <div className="hover-overlay"></div>
          <div className="hover-2-content px-5 py-4">
            <h3 className="hover-2-title text-capitalize font-weight-bold mb-0"> <span class="font-weight-light"></span></h3>
            <p className="hover-2-description mb-0"></p>
          </div>
        </div>
          </div>
          <div>
          <div className="skeleton text-white rounded"><img alt="" style={{minHeight:"250px"}}/>
          <div className="hover-overlay"></div>
          <div className="hover-2-content px-5 py-4">
            <h3 className="hover-2-title text-capitalize font-weight-bold mb-0"> <span class="font-weight-light"></span></h3>
            <p className="hover-2-description mb-0"></p>
          </div>
        </div>
          </div>
          <div>
          <div className="skeleton text-white rounded"><img alt="" style={{minHeight:"250px"}}/>
          <div className="hover-overlay"></div>
          <div className="hover-2-content px-5 py-4">
            <h3 className="hover-2-title text-capitalize font-weight-bold mb-0"> <span class="font-weight-light"></span></h3>
            <p className="hover-2-description mb-0"></p>
          </div>
        </div>
          </div>
        </Slider>
      </div>
      ) : (
        
        <Slider {...settings}>
     
        { tipes.map((item, index) =>  (
        <div className="col-lg-3 col-md-6 mb-3 mt-3">
        <div className="card bg-transparent shadow-0" style={{display:"flex",flexDirection:"column",height:"100%"}}>
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
          <button type="button" class="btn btn-outline-danger btn-sm" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg> Like</button>
        </div>
        <div className="d-flex justify-content-between mb-3 mt-3">
          <h6 className="mb-0">{item.nama}</h6>
        </div>
        <div className="d-flex justify-content-between mb-2">
         
          <div className="me-auto text-warning">
          <Rating value={item.rating} maxValue={5} />
          </div>
          <p className="text-muted small mb-0"><span class="fw-bold">({item.rating})</span></p>
        </div>
      </div>
    </div>
        </div>
        ))}
        </Slider>
      )} */}
        {/* <div className="skeleton">f</div> */}
        </div>
        </>
    )
}

export default Tipewisatawan