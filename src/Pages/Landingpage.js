import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';
import Header from '../Component/Header';
import Footerhome from '../Component/Footerhome';

//import axios
import axios from 'axios';


function Landingpage() {
  const [artikel, SetArtikel] = useState([]);
  const history = useHistory();
  const [event, SetEvent] = useState([]);
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const FetchArtikel = async () =>{
    const response = await axios.get('http://localhost:8000/api/artikels');
    const data = await response.data.data;
    SetArtikel(data);
  }

  const FetchEvent = async () =>{
    const response = await axios.get('http://localhost:8000/api/event')
    const data = await response.data.data
    SetEvent(data)
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

  //call function "fetchData"
  fetchData()
  FetchArtikel()
  FetchEvent()
  
  }, []);
// const senibudaya = event.kategori == senibudaya
function Events() {
  const isEvent = event.length;
  if (isEvent > 0) {
    return  <h4 className="title has-text-centered is-centered has-text-weight-bold mt-5 is-size-3 has-text-black mb-6 is-size-4-mobile">Event wisata terbaru</h4>;
  }
  return <p></p>;
}

return(
    <>
<Header/>

<section className="section mt-0" style={{overflow:"hidden"}}>
  <h4 className="title has-text-centered is-centered has-text-weight-bold is-size-3 has-text-black mb-6 is-size-4-mobile">Buat rencana perjalanan wisata anda dengan mudah</h4>
  <div className="columns has-text-centered is-centered is-multiline mt-4">
  <div className="column is-one-third">
  <img src="./travel.png" style={{width:"50px"}}/>
  <h1 class="title mt-3 has-text-black is-size-6">Dapatkan perjalanan wisata</h1>
  <h2 class="subtitle has-text-weight-light is-size-6">Jadwal itinerary hari demi hari penuh <br/> berdasarkan preferensi Anda</h2>
  </div>
  <div className="column is-one-third">
  <img src="./calendar.png" style={{width:"50px"}}/>
  <h1 class="title mt-3 has-text-black is-size-6">Sesuaikan perjalanan anda</h1>
  <h2 class="subtitle has-text-weight-light is-size-6">Sempurnakan perjalanan Anda. <br/>Kami akan menemukan rute dan tempat wisata terbaik</h2>
  </div>
  <div className="column is-one-third">
  <img src="./travel-map.png" style={{width:"50px"}}/>
  <h1 class="title mt-3 has-text-black is-size-6">Simpan rencana perjalanan anda</h1>
  <h2 class="subtitle has-text-weight-light is-size-6">Simpan rencana perjalanan wisatamu</h2>
  </div>
</div>
<br/>
<br/>
<h4 className="title has-text-centered is-centered has-text-weight-bold mt-5 is-size-3 has-text-black mb-6 is-size-4-mobile">Registrasi sekarang dan buat <br/> rencana perjalanan wisata sesuai kebutuhanmu</h4>
<p className="subtitle has-text-centered is-centered has-text-weight-light is-size-6 mb-4">Memberi informasi seputar pariwisata dan objek wisata di Jogja terlengkap sesuai kebutuhanmu <br/> sebagai wisatawan untuk perjalanan wisata di Jogja yang lebih mudah </p>
<div className="columns has-text-centered is-centered is-multiline mt-4 px-6 py-6">
  <div className="column is-one-third">
  <div className="card shadow-lg is-cursor-pointer">
                        <div className="card-image cover-image is-overflow-hidden">
                          <figure className="image is-4by3">
      <img src="https://jogjatourwisata.id/wp-content/uploads/2019/03/backpacker.jpg" alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div class="content is-size-6 has-text-weight-bold">
      Cocok Untuk Backpacker
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
  <div className="card-content is-size-6 has-text-weight-bold">
    <div class="content">
      Berwisata Bersama Keluarga
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
    <div class="content is-size-6 has-text-weight-bold">
      Grup Wisata
    </div>
  </div>
</div>
  </div>
  </div>
<br/>
  <h4 className="title has-text-centered is-centered has-text-weight-bold mt-5 is-size-3 has-text-black mb-6 is-size-4-mobile">Dengan beragam pilihan kategori wisata</h4>
<p className="subtitle has-text-centered is-centered has-text-weight-light is-size-6 mb-4">Pilih kategori wisata sesuai kebutuhan anda</p>
<div className="columns has-text-centered is-centered is-multiline mt-4 px-6 py-6">

<div className="column is-one-third">
<a href='/login'>
                    <div className="card is-rounded is-bg-cover is-cursor-pointer transform is-duration-300 hover-translate-y" style={{backgroundImage:"url('https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2022/12/10/2035391170.jpg')",width:"" }}>
                        <div className="card-content is-rounded is-duration-300 pt-24">
                            <div className="content">
                                <div className="title-transform-y is-duration-300 mb-5">
                                    <h3 className="has-text-white-bis">Wisata Kuliner</h3>
                                    <div className="underline-br"></div>
                                </div>
                                <div className="text-motion has-text-white-bis transform is-duration-300 hover-translate-y">
                                    <p className="is-size-6">Lorem ipsum leo risus, porta ac thes consectetur ac,
                                    vestibulum at eros. Donec id elit non miy losre..</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </a>
                </div>
                <div className="column">
                <a href='/login'>
                    <div className="card is-rounded is-bg-cover is-cursor-pointer transform is-duration-300 hover-translate-y" style={{backgroundImage:"url('https://foto.kontan.co.id/cq3yrgOhPUjBShlrr7FFfdsd-Z8=/smart/2020/12/15/1971222066p.jpg')"}}>
                        <div className="card-content is-rounded is-duration-300 pt-24">
                            <div className="content">
                                <div className="title-transform-y is-duration-300 mb-5">
                                    <h3 className="has-text-white-bis">Wisata Alam</h3>
                                    <div className="underline-br"></div>
                                </div>
                                <div className="text-motion has-text-white-bis transform is-duration-300 hover-translate-y">
                                    <p className="is-size-6">Lorem ipsum leo risus, porta ac thes consectetur ac,
                                    vestibulum at eros. Donec id elit non miy losre..</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </a>
                </div>
                <div className="column">
                <a href='/login'>
                    <div className="card is-rounded is-bg-cover is-cursor-pointer transform is-duration-300 hover-translate-y" style={{backgroundImage:"url('https://cdn1-production-images-kly.akamaized.net/TV-hEp7qxsr3RzJ3_EkdzgvjV2A=/500x667/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3981789/original/038404000_1648796157-Taman_sari_nizaramrullah.jpg')"}}>
                        <div className="card-content is-rounded is-duration-300 pt-24">
                            <div className="content">
                                <div className="title-transform-y is-duration-300 mb-5">
                                    <h3 className="has-text-white-bis">Wisata Budaya & Edukasi</h3>
                                    <div className="underline-br"></div>
                                </div>
                                <div className="text-motion has-text-white-bis transform is-duration-300 hover-translate-y">
                                    <p className="is-size-6">Lorem ipsum leo risus, porta ac thes consectetur ac,
                                    vestibulum at eros. Donec id elit non miy losre..</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </a>
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
  

   
  <Events isEvent={false} />
  <div class="columns has-text-centered is-centered is-multiline px-4 py-4">
  { event.map((konten, index) =>  (
                <div class="column is-one-quarter">
                    <div class="card shadow-lgs">
                        <div class="card-image">
                          <figure class="image is-4by3">
                            <img src={"http://localhost:8000/public/img/"+konten.image} alt="Placeholder image" />
                            {konten.kategori == 'senibudaya' ? <span class="is-size-6 p-1 px-3 has-background-danger has-text-white is-absolutes is-trs-1 is-roundeds">Seni & Budaya</span>:null}
                            {konten.kategori == 'keagamaan' ? <span class="is-size-6 p-1 px-3 has-background-success has-text-white is-absolutes is-trs-1 is-roundeds">Keagamaan</span>:null}
                            {konten.kategori == 'kemasyarakatan' ? <span class="is-size-6 p-1 px-3 has-background-info has-text-white is-absolutes is-trs-1 is-roundeds">Kemasyarakatan</span>:null}
                            {konten.kategori == 'umum' ? <span class="is-size-6 p-1 px-3 has-background-link has-text-white is-absolutes is-trs-1 is-roundeds">Umum</span>:null}
                          </figure>
                        </div>
                        <div class="card-content">
                            <div  className="content has-text-grey-light">
                                <h4 className="title is-5"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> {konten.namaevent} <br/><br/>
                                {new Date(konten.waktu).toLocaleDateString()}</h4>
                            </div>
                        </div>
                        <div className="card-footer-item has-text-centered">
                        <a href={`/event/view/${konten.id}`} className="is-rounded button"><i className="fa fa-arrow-right mr-3" aria-hidden="true"></i> Lihat event</a>
                </div>
                    </div>
                </div>
  ))}
  </div>
  <br/>
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



<center><button className="button is-rounded is-medium mb-4 is-black">Start planning</button></center>  
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