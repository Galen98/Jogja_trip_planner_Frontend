//import useState
import { useState, useEffect } from 'react';

//import useNavigate
import { useParams } from 'react-router-dom';

//import API
import Footer from '../Component/Footer';
import { useHistory } from 'react-router';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Nav from '../Component/Nav';
//import API

//import axios
import axios from 'axios';
export default function Formprofile() {
    //define state
    const [image, setImage] = useState('');
    const [job, setJob] = useState('');
    const [name, setName] = useState('');
    const [hometown, setHometown] = useState('');
    const [motivation, setMotivation] = useState('');
    const history = useHistory();
    const token = localStorage.getItem("token");
    const isImage = image
    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate

    const navigate=useHistory();
    //destruct ID
    //const { id } = useParams();
    
    const { id } = useParams();

   
    const fetchDetailProfile = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch data
        await axios.get(`http://localhost:8000/api/dashboard/${id}`)
            .then(response => {
                
                //assign to state
                setName(response.data.data.name);
                setJob(response.data.data.job);
                setImage(response.data.data.image);
                setHometown(response.data.data.hometown);
                setMotivation(response.data.data.motivation);
            })
    }

    useEffect(() => {

        //check token
        if(localStorage.getItem('token')) {
            fetchDetailProfile();
        }
        else{
            history.push('/login');
        }
    }, []);


    //method handle file change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handlesetName = (e) => {
        setName(e.target.value);
    }

    // function handlesetName(e) {
    //     setName(e.target.value);
    //   }

    const handlesetJob = (e) => {
        setJob(e.target.value);
    }

    const handlesetHometown = (e) => {
        setHometown(e.target.value);
    }

    const handlesetMotivation = (e) => {
        setMotivation(e.target.value);
    }


    //method update post
    const updateProfile = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('image', image);
        formData.append('name', name);
        formData.append('job', job);
        formData.append('hometown', hometown);
        formData.append('motivation', motivation);
        formData.append('_method', 'PUT')

        //send data with API
        await axios.post(`http://localhost:8000/api/dashboard/${id}`, formData)
            .then(() => {
                
                //redirect to posts index
                history.push("/profile");

            })
            .catch(error => {
                
                //set errors response to state "errors"
                setErrors(error.response.data);
            })
    }
 
   
      
    return(
        
<>
<Nav />
        <div className="container mt-5">
  
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card border-0 rounded shadow">
                    <div className="card-body">
                        <form onSubmit={updateProfile}>
                            <div className="mb-3">
                            {isImage ? (
    <img src={"http://localhost:8000/storage/img/"+image} className='img-fluid img-thumbnail mt-4 mb-2' style={{width:"150px", zIndex:"1", borderRadius: "100px"}}/>
) : (
    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className='img-fluid img-thumbnail mt-4 mb-2' style={{width:"150px", zIndex:"1", borderRadius: "100px"}}/>
)}
                                <input type="file" onChange={handleFileChange} className="form-control"/>

                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Name  </label>
                                <input type="text" className="form-control" value={name} onChange={handlesetName} placeholder="Nama kamu"/>

                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Job</label>
                                <input type="text" className="form-control" value={job} onChange={handlesetJob} placeholder="Pekerjaan kamu"/>

                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Hometown</label>
                                <input type="text" className="form-control" value={hometown} onChange={handlesetHometown} placeholder="Asal kota kamu"/>

                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Motivation</label>
                                <textarea className="form-control" value={motivation} onChange={handlesetMotivation} rows="5" placeholder="Motivasi berwisata di Jogja"></textarea>

                            </div>
                            <div className="d-grid gap-2">
                            <center>  <button type="submit" className="button is-dark">Update</button></center>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
    )

}

