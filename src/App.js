import React, { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
import axios from 'axios';
import Register from './Pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
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

function App() {
  const [locationData, setLocationData] = useState(null);
  const [token, setToken] = useState('');
  const checkTokenValidity = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/check-token-validity');
      const { valid } = response.data;

      if (!valid) {
        handleLogout();
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const interval = setInterval(checkTokenValidity, 60000); // Check token validity every 1 minute

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    
  };
 

  return (
    <div>
      <Switch>
      <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/explore" component={Explorewisata} />
        <Route exact path="/favorite" component={Wisatafavorit} />
        <Route exact path="/rekomendasi" component={Rekomendasi} />
        <Route exact path="/maps" component={Maps} />
        <Route exact path="/kategori/:kategori" component={Kategoripage} />
        <Route exact path="/profile/edit/:id" component={Formprofile} />
      </Switch>
    
    </div>
    
    
  );
}

export default App;