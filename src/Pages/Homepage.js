import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';
import Header from '../Component/Header';
import Footerhome from '../Component/Footerhome';
//import axios
import axios from 'axios';


function Homepage() {
  const [artikel, SetArtikel] = useState([]);
  const history = useHistory();



  const FetchArtikel = async () =>{
    const response = await axios.get('http://localhost:8000/api/artikels');
    //get response data
    const data = await response.data.data.data;
    SetArtikel(data);
  }

  useEffect(() =>{

    FetchArtikel();
  }, []);

console.log(artikel)

 return(   
    <>
    <Header/>
    <section className="section mt-0">
    {/* { artikel.map((konten, index) => (
                                        <tr key={ konten.id }>
                                            <td>{ index + 1 }</td>
                                            <td>{ konten.judul }</td>
                                            <td>{ konten.author }</td>
                                            <td className="text-center"></td>
                                        </tr>
                                    )) } */}
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
  <h1 className="title has-text-centered mt-6 is-centered has-text-weight-bold is-size-3 has-text-black">Artikel seputar wisata Jogja</h1>
  <div className="columns has-text-centered has-text-black is-centered is-multiline mt-4 px-6 py-6">
  { artikel.map((konten, index) => (
  <div className="column is-one-quarter">
  <a href=''>
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image">
                            <img src={"http://localhost:8000/public/img/"+konten.image} alt="Placeholder image" style={{height:"200px"}}/>
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
  <h1 className="title has-text-centered mt-6 is-centered has-text-weight-bold is-size-3 has-text-black">Keuntungan itinerary planner</h1>
  <div className="columns  has-text-black is-centered is-multiline mt-4 px-6 py-6">
  <div className='column has-text-right is-one-half'>
  <img src="https://images.unsplash.com/photo-1631002163940-fae19d582e1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" style={{borderRadius:"15px"}}/>
  </div>
  <div className='column has-text-left is-one-half'>
  <p className='has-text-weight-bold is-size-3 has-text'>Cocok dengan preferensi <br/> perjalanan Anda.</p>
  <div class="content">
  <ul>
    <li>Lebih dari 100+ tempat wisata Jogja.</li>
    <li>Pengalaman tempat wisata yang belum <br/> pernah anda tau sebelumnya.</li>
    <li>Anda akan mendapatkan tempat terbaik<br/> dan waktu terbaik.</li>
    <li>Opsi transportasi.</li>
  </ul>
  </div>
  </div>
  </div>
  <div className="columns  has-text-black is-centered is-multiline mt-4 px-6 py-6">
  <div className='column has-text-right is-one-half'>
  <p className='has-text-weight-bold is-size-3 has-text'>Mengoptimalkan rencana <br/>perjalanan Anda.</p>
  <div class="content has-text-right mt-3">
  <p>Informasi lengkap seputar tempat wisata</p>
  <p>Merekomendasikan berapa banyak biaya<br/> yang dihabiskan</p>
  <p>Sepenuhnya dapat disesuaikan</p>
  </div>
  </div>
  <div className='column has-text-left is-one-half'>
  <img src="https://images.unsplash.com/photo-1588312578026-573477e4da06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" style={{borderRadius:"15px"}}/>
  </div>
  </div>
  
  <center><button className="button is-rounded is-medium mb-6 is-black">Start planning</button></center>
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