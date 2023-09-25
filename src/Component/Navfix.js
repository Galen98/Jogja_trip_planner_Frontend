import React, { useState, Component, useEffect  } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import logo from '../logofix.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal'
import { Form } from 'react-bootstrap';
import {
  MDBIcon,
} from 'mdb-react-ui-kit';
import Api from '../Api';
function Navfix() {
  const [showBasic, setShowBasic] = useState(false);
  const [isActive, setisActive] = useState(false);  
  const [user, setUser] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await Api.get('/api/user')
    .then((response) => {
        setUser(response.data);
    })
}

console.log(user)
const logoutHandler = async () => {
  Swal.fire({
    title: 'Konfirmasi Logout',
    text: 'Apakah Anda yakin ingin logout?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: 'grey',
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await Api.get('/api/user/likes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const likedAttractionIds = response.data;
        console.log(likedAttractionIds)

        likedAttractionIds.forEach(attractionId => {
          localStorage.removeItem(`attraction_${attractionId}_liked`);
        });
      } catch (error) {
        console.error('Error fetching liked attractions:', error);
      }

      try {
        await Api.post('/api/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('cuaca');
        Swal.fire({
          icon: 'success',
          title: 'Logout Berhasil',
          text: 'Anda telah berhasil logout!',
        }).then(() => {
          history.push('/');
          window.location.reload();
        });
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  });
};
const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'; // 

const imageSrc = user.image ? `http://203.194.113.182/storage/img/${user.image}` : defaultImage;
useEffect(() => {  
fetchData();
}, []);
const isUserlogin = user.id
    return(
        <>
        <div>
<Navbar expand="lg" className="fixed-top navbar-light shadow-sm bg-light">
      <Container>
        <Navbar.Brand href="/"><img src={logo} style={{width:"40px"}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"> 
        <MDBIcon icon='bars' fas />
        </Navbar.Toggle> 
        <Navbar.Collapse id="basic-navbar-nav">
        {isUserlogin ? (
          <Nav className="ms-auto text-capitalize" >
          <Nav.Link href="/" className='btn btn-light rounded-9 text-capitalize'>Home</Nav.Link>
            <Nav.Link href="/explore" className='btn btn-light rounded-9 text-capitalize'><i className="fa fa-compass" aria-hidden="true"></i> Jelajahi Wisata</Nav.Link>
            <Nav.Link href="/favorite" className='btn btn-light rounded-9 text-capitalize'><i className="fa fa-heart hearthover" aria-hidden="true"></i> Favorites</Nav.Link>
            <NavDropdown title={<img src={imageSrc} alt="Profile" className="rounded-circle profile-icon" />} id="basic-nav-dropdown" className="rounded-9 border-3 custom-nav-dropdown shadow-3">
          <NavDropdown.Item href="/profile" className="text-capitalize">
            <i className="fa fa-user px-2"></i> Profile
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item className="text-danger">
            <Button variant="danger" type="submit" className="px-2" onClick={logoutHandler}>
              Logout
            </Button>
          </NavDropdown.Item>
        </NavDropdown>  
              </Nav>
          
          ) : (
            <Nav className="ms-auto text-capitalize">
            <Nav.Link href="/login" className='btn btn-light rounded-9 text-capitalize'><i className="fa fa-user mr-2"></i> Login</Nav.Link>
            <Nav.Link href="/register" className='btn btn-light rounded-9 text-capitalize'> Registrasi</Nav.Link>
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