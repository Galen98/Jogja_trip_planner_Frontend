import React, { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
import axios from 'axios';
import Register from './Pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Formprofile from './Pages/Formprofile';
import Profile from './Pages/Profile';
import Landing from './Pages/Landing';
import Kategoripage from './Pages/Kategoripage';
import Wisatabykategori from './Component/Wisatabykategori';
import Headerkategori from './Component/Headerkategori';
import Explorewisata from './Pages/Explorewisata';
import Wisatafavorit from './Pages/Wisatafavorit';
import Rekomendasi from './Pages/Rekomendasi';
import Maps from './Pages/Maps';
import Mapexplore from './Pages/Mapexplore';
import ItinerarybyUser from './Pages/ItinerarybyUser';
import HomeForm from './Component/HomeForm';
import MainForm from './Pages/MainForm';
import Loaditinerary from './Pages/Loaditinerary';
import Inspirasiperjalanan from './Pages/Inspirasiperjalanan';
import Wisatapage from './Pages/Wisatapage';
import Formbackpacker from './Component/Formbackpacker';
import Itinerarybackpacker from './Pages/Itinerarybackpacker';
import Mapsbackpacker from './Pages/Mapsbackpacker';
import Itinerarykeluarga from './Pages/Itinerarykeluarga';
import Aboutus from './Pages/Aboutus'
import FAQ from './Pages/FAQ';
import Panduan from './Pages/Panduan';
import Itinerarygrup from './Pages/Itinerarygrup';
import Api from './Api';

function App() {
  const [locationData, setLocationData] = useState(null);
  const [token, setToken] = useState('');
  const checkTokenValidity = async () => {
    try {
      const response = await Api.get('/api/check-token-validity');
      const { valid } = response.data;
      if (!valid) {
        handleLogout();
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const interval = setInterval(checkTokenValidity, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData')
    setToken('');
  };
 

  return (    
    <div>
      <Switch >
      <Route exact path="/" component={Landing} />
      <Route exact path="/panduan" component={Panduan} />
      <Route exact path="/aboutus" component={Aboutus} />
      <Route exact path="/faq" component={FAQ} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/explore" component={Explorewisata} />
        <Route exact path="/explore/mobile" component={Mapexplore} />
        <Route exact path="/favorite" component={Wisatafavorit} />
        <Route exact path="/rekomendasi" component={Rekomendasi} />
        <Route exact path="/maps" component={Maps} />
        <Route exact path="/formbackpacker" component={Formbackpacker} />
        <Route exact path="/itinerary" component={ItinerarybyUser} />
        <Route exact path="/itinerarybackpacker" component={Itinerarybackpacker} />
        <Route exact path="/itinerarygrup" component={Itinerarygrup} />
        <Route exact path="/itinerarykeluarga" component={Itinerarykeluarga} />
        <Route exact path="/itinerary/load" component={Loaditinerary} />
        <Route exact path="/kategori/:kategori" component={Kategoripage} />
        <Route exact path="/profile/edit/:id" component={Formprofile} />
        <Route exact path="/homeform" component={MainForm}/>
        <Route exact path="/mapsbackpacker" component={Mapsbackpacker}/>
        <Route exact path="/wisata/:wisataid" component={Wisatapage}/>
        <Route exact path="/inspirasiperjalanan" component={Inspirasiperjalanan}/>
      </Switch>
    
    </div>
    
    
  );
}

export default App;