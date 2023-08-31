import React, { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
import axios from 'axios';
import Kategorihome from './Kategorihome';
import { Card } from 'react-bootstrap';
import Exploremaps from './Exploremaps';
import Rating from './Rating';
function Bodyexplore(){
    const [latitude, setLatitude] = useState([])
    const [longitude, setLongitude] = useState([])
    const [nearby, setNearby] = useState([])
    const cuaca = localStorage.getItem("cuaca");
    const userToken = localStorage.getItem("token");
    const [location, setLocation] = useState('Yogyakarta');
    const [weatherData, setWeatherData] = useState(null);


  useEffect(() => {
    const apiUrl = 'http://localhost:8000/api/cuaca';
    axios.get(apiUrl, {
      params: {
        location: location,
      },
    })
      .then(response => {
        setWeatherData(response.data.current);
        localStorage.setItem('cuaca', response.data.current.weather_descriptions);
      })
      .catch(error => {
        console.error(error);
      });
  }, [location]);

    const LikeButton = ({ attractionId, userToken }) => {
      const [isLiked, setIsLiked] = useState(null);
      const [isLoading, setIsLoading] = useState(false);
    
      useEffect(() => {
        const fetchLikedAttractions = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/user/likes`, {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            });
    
            const likedAttractionIds = response.data;
            setIsLiked(likedAttractionIds.includes(attractionId) || localStorage.getItem(`attraction_${attractionId}_liked`) === 'true');
          } catch (error) {
            console.error('Error fetching liked attractions:', error);
          }
        };
    
        fetchLikedAttractions();
      }, [attractionId, userToken]);
      
    
      const handleToggleLike = async () => {
        if (isLoading) {
          return;
        }
    
        setIsLoading(true);
    
        try {
          if (isLiked) {
            await axios.delete(`http://localhost:8000/api/unlike/${attractionId}`, {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            });
          } else {
            await axios.post(`http://localhost:8000/api/like/${attractionId}`, null, {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            });
          }
    
          const newLikedStatus = !isLiked;
          setIsLiked(newLikedStatus);
          localStorage.setItem(`attraction_${attractionId}_liked`, newLikedStatus.toString()); // Set local storage here
        } catch (error) {
          console.error('Error toggling like:', error);
        } finally {
          setIsLoading(false);
        }
      };
    
      return (
        <button className={`btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9 ${isLiked ? 'liked' : ''}`} onClick={handleToggleLike}>
        <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                  </svg>  {isLoading ? '...' : (isLiked ? 'Suka' : 'Suka')}
          
        </button>
      );
    };
    
    

    const fetchnearby = async(latitude, longitude) =>{
        try{
          const response = await axios.post(
            'http://localhost:8000/api/recommendTouristSpotbyweather',
            {
              latitude: latitude,
              longitude: longitude,
              current_weather:cuaca
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

      useEffect(()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                // Call the fetchNearbyLocations function with the obtained latitude and longitude
                fetchnearby(position.coords.latitude, position.coords.longitude);
              },
              (error) => {
                console.error(error);
              }
            );
          } else {
            console.error('Geolocation is not supported by this browser.');
          }
          

      }, [])

    
      

      const renderDatadesktop = () => {

        return nearby.map((item) => (
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
              {/* <div className="d-flex justify-content-between">
              <p className="small text-muted">Jarak: {item.distance.toFixed(1)} KM</p>
              </div> */}
              <div className="d-flex justify-content-between">
              <p className="small text-muted">{item.recommendation}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="small">{item.kategori}</p>
                {/* <button type="button" class="btn btn-outline-danger btn-sm btnlike"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                  </svg> Like</button> */}
                  <LikeButton attractionId={item.id} userToken={userToken} />
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

      // const renderData = () => {
      //   return nearby.map((item) => (
      //     <div class="col-6 mb-4 d-md-none">
      //     <div className="card shadow-sm" style={{display:"flex",flexDirection:"column",height:"100%"}}>
      //           <a className='hover hover-2 rounded-6' href='/' >
      //            <img src={item.image} className="card-img-top img-responsive" style={{objectFit:"cover", height:"200px"}}/>
      //             <div className="hover-overlay"></div>
      //             </a>
      //           <div className="card-body" style={{flexGrow:"1"}}>
      //             <div className="d-flex justify-content-between">
      //               <p className="small text-muted">{item.kategori}</p>
      //             </div>
      //             <div className="d-flex justify-content-between">
      //             <p className="small text-muted"><i className="fa-regular fa-clock"></i>  {item.operating_hours}</p>
      //             </div>
      //             <div className="d-flex justify-content-between">
      //             <p className="small text-muted" style={{fontSize:"12px"}}>{item.recommendation}</p>
      //             </div>
      //             <div className="d-flex justify-content-between">
      //           <p className="small text-muted">Jarak: {item.distance.toFixed(1)} KM</p>
      //           </div>
      //           <LikeButton attractionId={item.id} userToken={userToken} />
      //             <div className="d-flex justify-content-between mb-2 mt-2">
      //               <p className="mb-0 small" style={{fontSize:"12px"}}>{item.nama}</p>
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
      console.log(nearby)
    return(
        <>
    <section style={{overflow:"hidden", marginTop:"70px"}}>
    <Exploremaps/>
    <div className="container">
    <div className="py-5">
    
    <h3 className="font-weight-bold mb-5 text-center text-capitalize font700 txtblack">Explore wisata terdekat</h3>
    {nearby.length === 0 ? (
        <center>
        <div className="col-sm-8 mb-10"><img src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-485.jpg" style={{width:"320px"}}/>
        <p className='text-capitalize text-muted'>Tidak Ada wisata disekitar anda</p></div>
    </center>
        ) : (
          <div class="mt-3 row gx-3 justify-content-center">
          {renderDatadesktop()}
          {/* {renderData()} */}
          </div>
        )}
          
        <Kategorihome/>
 
        </div>
        </div>
        </section>
        </>
    )

}

export default Bodyexplore