import Navfix from "../Component/Navfix"
import Footerfix from '../Component/Footerfix';
import Wisatabykategori from "../Component/Wisatabykategori";
import Headerkategori from '../Component/Headerkategori';
import React, { useState, Component, useEffect  } from 'react';
function Kategoripage(){
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
          <a href="/maps">
          <div className="floating-logo-container">
            <button className='btn btn-black rounded-9 text-capitalize'><i className="fa-solid fa-map"></i> Peta wisata</button>
          </div>
          </a>
        );
      };
    return(
        <>
    <Navfix/>
    <Headerkategori/>
    <Wisatabykategori/>
    {FloatingLogo()}
    <div className="foots">
    <Footerfix/>
    </div>
        </>
    )
}

export default Kategoripage