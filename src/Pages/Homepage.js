import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';
import Nav from '../Component/Nav';
import Footerhome from '../Component/Footerhome';
//import axios
import axios from 'axios';


function Homepage() {
  const [artikel, SetArtikel] = useState([]);
  const history = useHistory();
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const FetchArtikel = async () =>{
    const response = await axios.get('http://localhost:8000/api/artikels');
    //get response data
    const data = await response.data.data;
    SetArtikel(data);
  }

  const fetchData = async () => {

    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    //fetch user from Rest API
    await axios.get('http://localhost:8000/api/user')
    .then((response) => {

        //set response user to state
        setUser(response.data);
    })
}

  useEffect(() =>{
    if(!token) {
      //redirect login page
      history.push('/login');
  }
  //call function "fetchData"
  fetchData();
    FetchArtikel();
  }, []);

console.log(artikel)

 return(   
    <>
    <Nav/>
    <section className="section mt-0">
  <h1 className="title has-text-centered is-centered has-text-weight-bold is-size-2 has-text-black mb-4">Buat itinerary anda sendiri <br/> dengan mudah</h1>
  <div className="columns has-text-centered is-centered is-multiline mt-4">
  <div className="column is-one-third">
  <img src="./travel.png" style={{width:"50px"}}/>
  <h1 class="title mt-3 has-text-black is-size-6">Dapatkan perjalanan wisata</h1>
  <h2 class="subtitle has-text-weight-light is-size-6">Jadwal itinerary hari demi hari penuh <br/> berdasarkan preferensi Anda</h2>
  </div>
  <div className="column is-one-third">
  <img src="./calendar.png" style={{width:"50px"}}/>
  <h1 class="title mt-3 has-text-black is-size-6">Sesuaikan perjalanan anda</h1>
  <h2 class="subtitle has-text-weight-light is-size-6">Sempurnakan perjalanan Anda. <br/>Kami akan menemukan rute dan jadwal terbaik</h2>
  </div>
  <div className="column is-one-third">
  <img src="./travel-map.png" style={{width:"50px"}}/>
  <h1 class="title mt-3 has-text-black is-size-6">Bagikan itinerary anda</h1>
  <h2 class="subtitle has-text-weight-light is-size-6">Bagikan pengalaman wisatamu <br/>pada pengguna lainnya</h2>
  </div>
</div>
<br/>
<br/>
<h1 className="title has-text-centered mt-6 is-centered has-text-weight-bold is-size-2 has-text-black">Kategori wisata populer</h1>
<div className="columns has-text-centered is-centered is-multiline mt-4 px-6 py-6">
  <div className="column is-one-third">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div class="content is-size-6 has-text-weight-semibold">
      Wisata kuliner
    </div>
  </div>
</div>
  </div>
  <div className="column">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content is-size-6 has-text-weight-semibold">
    <div class="content">
      Wisata budaya
    </div>
  </div>
</div>
  </div>
  <div className="column">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div class="content is-size-6 has-text-weight-semibold">
      Wisata alam
    </div>
  </div>
</div>
  </div>
  </div>
  <center><button className="button is-rounded mb-6">Lihat lebih banyak</button></center>
  <h1 className="title has-text-centered mt-6 is-centered has-text-weight-bold is-size-3 has-text-black">Itinerary dari para wisatawan</h1>
  <div className="columns has-text-centered has-text-black is-centered is-multiline mt-4 px-6 py-6">
  <div className="column is-one-quarter">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div class="content">
      Lorem ipsum dolor sit amet
      <br/>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
  </div>

  <div className="column is-one-quarter">
  <div className="card">
  <div className="card-image">
    <figure className="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div class="content">
      Lorem ipsum dolor sit amet
      <br/>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
  </div>


  <div className="column is-one-quarter">
  <div className="card">
  <div className="card-image">
    <figure className="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div class="content">
      Lorem ipsum dolor sit amet
      <br/>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
  </div>

  <div className="column is-one-quarter">
  <div className="card">
  <div className="card-image">
    <figure className="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div class="content">
      Lorem ipsum dolor sit amet
      <br/>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
  </div>
  </div>
  <center><button className="button is-rounded mb-6">Lihat lebih banyak</button></center>
  <h1 className="title has-text-centered mt-6 is-centered has-text-weight-bold is-size-3 has-text-black">Aktivitas wisata</h1>
  <div className="columns has-text-centered is-centered is-multiline mt-4 px-6 py-6">
  <div className="column is-one-third">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div class="content is-size-6 has-text-weight-semibold">
      Menaiki dokar/becak
    </div>
  </div>
</div>
  </div>
  <div className="column">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content is-size-6 has-text-weight-semibold">
    <div class="content">
      Keliling dengan jeep
    </div>
  </div>
</div>
  </div>
  <div className="column">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div class="content is-size-6 has-text-weight-semibold">
      Pengetahuan sejarah
    </div>
  </div>
</div>
  </div>
  </div>
  <center><button className="button is-rounded mb-6">Lihat lebih banyak</button></center>
  <h1 className="title has-text-centered mt-6 is-centered has-text-weight-bold is-size-3 has-text-black">Artikel seputar wisata Jogja</h1>
  <div className="columns has-text-centered has-text-black is-centered is-multiline mt-4 px-6 py-6">
  { artikel.map((konten, index) => (index < 4) && (
  <div className="column is-one-quarter">
  <a href='/'>
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image is-4by3">
                            <img src={"http://localhost:8000/public/img/"+konten.image} alt="Placeholder image"/>
                          </figure>
                        </div>
                        <div className="card-content">
                            <div className="content has-text-grey-light">
                                <h3 className='is-size-5'>{konten.judul}</h3>
                            </div>
                          <p className='has-text-left'>{konten.shortdescription.slice(0,70)}.....</p>  
                        </div>
                        <p className='has-text-weight-light mb-4'>Posted at: {new Date(konten.created_at).toLocaleDateString()}</p>
                        <footer className="card-footer has-background-white-bis">
                          <a href="#" class="card-footer-item p-5 has-text-grey is-uppercase is-text-wide-1">
                              Continue Reading
                          </a>
                        </footer>
                    </div>
                    </a>
  </div>
  ))}
  </div>
  <center><button className="button is-rounded mb-6">Lihat lebih banyak</button></center> 
  
</section>
<section className="hero herosfooter is-medium is-link">
  <div className="hero-body">
  <p className="title has-text-white is-size-2 has-text-centered">
  Jogja is a tour memories you'll never forget
    </p>
  </div>
</section>
        <Footerhome/>
        </>
        
        )
        
        
}


export default Homepage;