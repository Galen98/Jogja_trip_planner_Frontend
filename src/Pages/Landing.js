import Navfix from "../Component/Navfix"
import Headerfix from "../Component/Headerfix"
import Footerfix from "../Component/Footerfix"
import Home from "../Component/Home"
import React, { useState, Component, useEffect  } from 'react';
function Landing(){
    const FloatingLogo = () => {
        const [isVisible, setIsVisible] = useState(true);
      
        useEffect(() => {
          const handleScroll = () => {
            const footer = document.querySelector('.foots'); // Replace with your footer class or ID
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
          <div className="floating-logo-container">
          <a href="/maps">
            <button className='btn btn-black rounded-9 text-capitalize'><i className="fa-solid fa-map"></i> Peta wisata</button>
            </a>
          </div>
        );
      };

return(
    <>
<Navfix/>
<Headerfix/>
<Home/>
{FloatingLogo()}
<div className='foots'>
<Footerfix/>
</div>


    </>
)
}

export default Landing