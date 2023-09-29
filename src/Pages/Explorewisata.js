import Bodyexplore from "../Component/Bodyexplore"
import {useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';
import Navfix from "../Component/Navfix"
import Footerfix from "../Component/Footerfix"

function Explorewisata(){
    const history = useHistory();
    const token = localStorage.getItem("token");



    useEffect(() => {
        if(!token) {
            history.push('/');
        }  
    }, []);

    const FloatingLogo = () => {
        const [isVisible, setIsVisible] = useState(true);
      
        useEffect(() => {
          const handleScroll = () => {
            const footer = document.querySelector('.foots');
            if (footer) {
              const footerRect = footer.getBoundingClientRect();
              if (footerRect.top <= window.innerHeight) {
                setIsVisible(false);
              } else {
                setIsVisible(true);
              }
            }
          };
      
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);
      
        if (!isVisible) {
          return null;
        }
      
        return (
          <a href="/explore/mobile">
          <div className="floating-logo-container d-block d-md-none">
            <button className='btn btn-dark rounded-9 text-capitalize'><i className="fa-solid fa-map"></i> Tampilkan peta</button>
          </div>
          </a>
        );
      };

return(
    <>
    <Navfix/>
    <Bodyexplore/>
    {FloatingLogo()}
    <div className="foots">
    <Footerfix/>
    </div>
    </>
)
}

export default Explorewisata