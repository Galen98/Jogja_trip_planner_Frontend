import React, { useState, useEffect } from 'react';
//import hook useHitory from react router dom
import { useHistory, useParams } from 'react-router';
import Nav from '../Component/Nav';
import { Link } from 'react-router-dom'
import Footerhome from '../Component/Footerhome';
//import axios
import axios from 'axios';

function Eventview(){
    const history = useHistory();
    const [event, SetEvent] = useState([]);
    const [getevent, SetGetevent] = useState([]);
    const { id } = useParams();

    const FetchEventID = async () =>{
        const response = await axios.get(`http://localhost:8000/api/event/${id}`)
        const data = await response.data.data
        SetGetevent(data)
      }

      useEffect(()=>{

        FetchEventID()
      }, [])


return(
    <>
      <Nav/>
      <section className="section" style={{overflow:"hidden"}}>
      { getevent.map((konten, index) =>  (
      <div class="content">
  <h1 className='has-text-centered is-size-3 is-size-3-mobile has-text-weight-bold'>{konten.namaevent}</h1>
  <figure className="image">
                    <img
                      src={"http://localhost:8000/public/img/"+konten.image} style={{width:"500px"}}
                      alt="Placeholder image"
                    />
                  </figure>
    <p className='px-6 py-6 has-text-weight-semibold'><i class="fa fa-map-marker" aria-hidden="true"></i> Lokasi: {konten.lokasi}<br/><br/>
    <i class="fa fa-ticket" aria-hidden="true"></i> Harga Tiket: {konten.htm}<br/><br/>
    <i class="fa fa-calendar" aria-hidden="true"></i> Waktu: {new Date(konten.waktu).toLocaleDateString()}</p>
    
  <p dangerouslySetInnerHTML={{__html:konten.deskripsi}} className='is-centered px-6 py-6'></p>
  <center><a href={konten.maps} className="button is-rounded"><i className="fa fa-map-marker mr-3" aria-hidden="true"></i> Dapatkan arah ke lokasi</a></center>
  </div>
  ))}
    </section>
    <Footerhome/>
    </>
)

}

export default Eventview