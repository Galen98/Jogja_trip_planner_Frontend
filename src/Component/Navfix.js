import React, { useState, Component, useEffect  } from 'react';
import Button from 'react-bootstrap/Button';
//import hook useHitory from react router dom
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import logo from './logonews.png';
//import axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {
  MDBIcon,
} from 'mdb-react-ui-kit';
function Navfix() {
  const [showBasic, setShowBasic] = useState(false);
  const [isActive, setisActive] = useState(false);  
  const [user, setUser] = useState({});
  const history = useHistory();
  const token = localStorage.getItem("token");

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


const logoutHanlder = async () => {
  // Set axios header with type Authorization + Bearer token
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const response = await axios.get('http://localhost:8000/api/user/likes', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const likedAttractionIds = response.data;
    console.log(likedAttractionIds)

    // Remove local storage items for each liked attraction
    likedAttractionIds.forEach(attractionId => {
      localStorage.removeItem(`attraction_${attractionId}_liked`);
    });
  } catch (error) {
    console.error('Error fetching liked attractions:', error);
  }
  
  // Fetch Rest API
  try {
    await axios.post('http://localhost:8000/api/logout');
    Swal.fire({
      icon: 'error',
      title: 'logout',
      text: 'Berhasil logout!',
    });

    // Fetch liked attraction IDs

    // Remove other local storage items
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('cuaca');

    // Redirect to login page
    history.push('/');
    window.location.reload();
  } catch (error) {
    console.error('Error logging out:', error);
  }


};
const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'; // 

const imageSrc = user.image ? `http://localhost:8000/storage/img/${user.image}` : defaultImage;
useEffect(() => {  
//call function "fetchData"
fetchData();
}, []);
const isUserlogin = user.id
    return(
        <>
        <div>
<Navbar expand="lg" className="fixed-top navbar-light shadow-sm bg-light roundnav">
      <Container>
        <Navbar.Brand href="/"><img src={logo} style={{width:"40px"}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"> 
        <MDBIcon icon='bars' fas />
        </Navbar.Toggle> 
        
        
        <Navbar.Collapse id="basic-navbar-nav">
        {isUserlogin ? (
          <Nav className="ms-auto text-capitalize" >
          <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/explore">Jelajahi Wisata</Nav.Link>
            <Nav.Link href="/favorite"><i className="fa fa-heart hearthover" aria-hidden="true"></i> Favorites</Nav.Link>
            <Nav.Link href="#link">Info Pariwisata</Nav.Link>
            {/* <NavDropdown title='Cuaca Hari Ini' id="basic-nav-dropdown">
              <NavDropdown.Item>
              <p><img src={weatherData.weather_icons} style={{maxHeight:"20px"}}/> {weatherData.weather_descriptions} <br/>
              Temperatur: {weatherData.temperature}&deg; <br/>
              Waktu Observasi: {weatherData.observation_time}</p>
              </NavDropdown.Item>
            </NavDropdown> */}
            <NavDropdown title={<img src={imageSrc} alt="Profile" className="rounded-circle profile-icon" />} id="basic-nav-dropdown" className="rounded-9 border-3 custom-nav-dropdown shadow-3">
          <NavDropdown.Item href="/profile" className="text-capitalize">
            <i className="fa fa-user px-2"></i> Profile
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item className="text-danger">
            <Button variant="danger" type="submit" className="px-2" onClick={logoutHanlder}>
              Logout
            </Button>
          </NavDropdown.Item>
        </NavDropdown>  
              </Nav>
          
          ) : (
            <Nav className="ms-auto text-capitalize">
            <Nav.Link href="/login" className='btn btn-light text-capitalize'><i className="fa fa-user mr-2"></i> Login</Nav.Link>
            <Nav.Link href="/register" className='btn btn-light text-capitalize'> Registrasi</Nav.Link>
             </Nav>
        )}
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
    </div>
        </>
    )
}

export default Navfix