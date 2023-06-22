import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';
import Header from '../Component/Header';
import Footerhome from '../Component/Footerhome';
//import axios
import axios from 'axios';


function Landingpage() {

return(
    <>
<Header/>
<section className="section mt-0">
  <h4 className="title has-text-centered is-centered has-text-weight-bold is-size-3 has-text-black mb-6 is-size-4-mobile">Cari rekomendasi wisata dengan mudah</h4>
  <div className="columns has-text-centered is-centered is-multiline mt-4">
  <div className="column is-one-third">
  <img src="./travel.png" style={{width:"50px"}}/>
  <h4 className="title mt-3 has-text-black is-size-6">Dapatkan rekomendasi tempat wisata</h4>
  <p className="subtitle has-text-weight-light is-size-6">Menampilkan rekomendasi tempat wisata <br/> berdasarkan preferensi dan kebutuhan Anda</p>
  </div>
  <div className="column is-one-third">
  <img src="./calendar.png" style={{width:"50px"}}/>
  <h4 className="title mt-3 has-text-black is-size-6">Sesuaikan perjalanan anda</h4>
  <p className="subtitle has-text-weight-light is-size-6">Sempurnakan perjalanan Anda. <br/>Kami akan memberikan rute dan jadwal terbaik</p>
  </div>
  <div className="column is-one-third">
  <img src="./travel-map.png" style={{width:"50px"}}/>
  <h4 className="title mt-3 has-text-black is-size-6">Pilih akomodasi yang sesuai</h4>
  <p className="subtitle has-text-weight-light is-size-6">Kami akan memberikan informasi <br/>unuk akomodasi sesuai kebutuhan anda</p>
  </div>
</div>
<br/>
<br/>
<h4 className="title has-text-centered is-centered has-text-weight-bold mt-5 is-size-3 has-text-black mb-6 is-size-4-mobile">Registrasi sekarang dan cari <br/> rekomendasi wisata sesuai kebutuhanmu</h4>
<p className="subtitle has-text-centered is-centered has-text-weight-light is-size-6 mb-4">Memberi informasi seputar wisata di Jogja terlengkap sesuai kebutuhanmu <br/> sebagai wisatawan untuk perjalanan wisata di Jogja yang lebih mudah </p>
<div className="columns has-text-centered is-centered is-multiline mt-4 px-6 py-6">
  <div className="column is-one-third">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image is-4by3">
      <img src="https://jogjatourwisata.id/wp-content/uploads/2019/03/backpacker.jpg" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div class="content is-size-6 has-text-weight-semibold">
      Cocok untuk backpacker
    </div>
  </div>
</div>
  </div>
  <div className="column">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image is-4by3">
      <img src="https://blog.tiket.com/wp-content/uploads/9-Tempat-Wisata-di-Jogja-Paling-Hits-untuk-Konten-Instagram-Kamu_Blog-new-update-mei2020_Jogja-Bay-Waterpark3.jpg" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content is-size-6 has-text-weight-semibold">
    <div class="content">
      Berwisata bersama keluarga
    </div>
  </div>
</div>
  </div>
  <div className="column">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image is-4by3">
      <img src="https://www.kartanesia.com/wp-content/uploads/2019/09/Wisata-Merapi-Jogja-Yang-Istimewa-500x383.jpg" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div class="content is-size-6 has-text-weight-semibold">
      Grup wisata
    </div>
  </div>
</div>
  </div>
  </div>
<br/>
  <h4 className="title has-text-centered is-centered has-text-weight-bold mt-5 is-size-3 has-text-black mb-6 is-size-4-mobile">Banyak pilihan kategori wisata</h4>
<p className="subtitle has-text-centered is-centered has-text-weight-light is-size-6 mb-4">Pilih kategori wisata sesuai kebutuhan anda</p>
<div className="columns has-text-centered is-centered is-multiline mt-4 px-6 py-6">
  <div className="column is-one-third">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image is-4by3">
      <img src="https://cdn.tasteatlas.com/images/dishes/a992386baac142c2a12f37b493af7566.jpg?w=600" alt="Placeholder image"/>
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
                          <figure className="image is-4by3">
      <img src="https://t-2.tstatic.net/jogja/foto/bank/images/desa-wisata-Wukirsari-batik.jpg" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content is-size-6 has-text-weight-semibold">
    <div class="content">
      Kampung wisata
    </div>
  </div>
</div>
  </div>
  <div className="column">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image is-4by3">
      <img src="https://wisatabagus.com/wp-content/uploads/2019/12/pantai-timang-1.jpg" alt="Placeholder image"/>
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
  <p className="subtitle has-text-centered is-centered has-text-weight-light is-size-6 mb-4">Masih banyak lagi kategori wisata yang tersedia untuk anda</p> 
        <br/>
  <h4 className="title has-text-centered mt-5 is-centered has-text-weight-bold is-size-3 is-size-4-mobile has-text-black">Keuntungan menggunakan aplikasi website<br/> rekomendasi wisata Jogja</h4>
  <div className="columns  has-text-black is-centered is-multiline mt-2 px-6 py-6">
  <div className='column has-text-right is-one-half'>
  <img src="./mockup.png" style={{width:"350px"}}/>
  </div>
  <div className='column has-text-left is-one-half'>
  <p className='has-text-weight-bold is-size-3 has-text is-size-4-mobile'>Cocok dengan preferensi <br/> perjalanan Anda.</p>
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
  <div className="columns  has-text-black is-centered is-multiline mt-2 px-6 py-6">
  <div className='column has-text-right is-one-half'>
  <p className='has-text-weight-bold is-size-3 has-text is-size-4-mobile'>Mengoptimalkan rencana <br/>perjalanan Anda.</p>
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
  <br/>
<h4 className="title has-text-centered is-centered has-text-weight-bold mt-5 is-size-3 has-text-black mb-6 is-size-4-mobile">Testimoni dari wisatawan</h4>
<div className="columns has-text-centered is-centered is-multiline px-4 py-4">
<div className="column is-one-third">
<div className="card shadow-lg">
<div className="box has-background-white has-text-grey-dark">
    <p>
        <span className="font-bold has-text-dark is-size-5">
            “
        </span>
        Jogja memiliki banyak sekali tempat wisata yang menarik, sayang sekali jika kamu tidak berkunjung kesana
        <span className="font-bold has-text-dark is-size-5">
            ”
        </span>
    </p>
    <div className="is-flex is-align-items-center is-justify-content-start mt-4">
        <p className="image is-48x48">
            <img alt="profil" src="https://www.mecgale.com/wp-content/uploads/2017/08/dummy-profile.png" className="is-rounded"/>
        </p>
        <div className="is-flex is-flex-direction-column ml-2 is-align-content-space-between">
            <span className="font-semibold has-text-weight-bold">
                Billy andrian
            </span>
            <span className="is-size-7 is-flex is-align-items-center">
                Backpacker travellers
            </span>
        </div>
    </div>
</div>
</div>
</div>
<div className="column">
<div className="card shadow-lg">
<div className="box has-background-white has-text-grey-dark">
    <p>
        <span className="font-bold has-text-dark is-size-5">
            “
        </span>
        Website ini sangat membantu saya dalam mencari tempat wisata dan informasi seputar wisata jogja yang sesuai dengan kebutuhan saya
        <span className="font-bold has-text-dark is-size-5">
            ”
        </span>
    </p>
    <div className="is-flex is-align-items-center is-justify-content-start mt-4">
        <p className="image is-48x48">
            <img alt="profil" src="https://pbs.twimg.com/profile_images/685700874434314240/80T5j3HF_400x400.jpg" className="is-rounded"/>
        </p>
        <div className="is-flex is-flex-direction-column ml-2 is-align-content-space-between">
            <span className="font-semibold has-text-weight-bold">
                Arkhan
            </span>
            <span className="is-size-7 is-flex is-align-items-center">
                Family travellers
            </span>
        </div>
    </div>
</div>
</div>
</div>
<div className="column">
<div className="card shadow-lg">
<div className="box has-background-white has-text-grey-dark">
    <p>
        <span className="font-bold has-text-dark is-size-5">
            “
        </span>
       Dengan adanya rekomendasi wisata, saya tidak lagi kebingungan dalam merencanakan wisata saya bersama robongan
        <span className="font-bold has-text-dark is-size-5">
            ”
        </span>
    </p>
    <div className="is-flex is-align-items-center is-justify-content-start mt-4">
        <p className="image is-48x48">
            <img alt="profil" src="https://impulse.aarafacademy.com/uploads/samples/g1.jpg" className="is-rounded"/>
        </p>
        <div className="is-flex is-flex-direction-column ml-2 is-align-content-space-between">
            <span className="font-semibold has-text-weight-bold">
                Rani
            </span>
            <span className="is-size-7 is-flex is-align-items-center">
              Grup travellers
            </span>
        </div>
    </div>
</div>
</div>
</div>
</div>
<br/>
<center><button className="button is-rounded is-medium mb-4 is-black">Start travelling</button></center>  
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


export default Landingpage