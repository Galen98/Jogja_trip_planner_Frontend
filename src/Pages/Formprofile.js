import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footerfix from '../Component/Footerfix';
import { useHistory } from 'react-router';
import Button from 'react-bootstrap/Button';
import Navfix from '../Component/Navfix';
import Swal from 'sweetalert2'
import { Breadcrumb } from 'react-bootstrap';
import Api from '../Api';
export default function Formprofile() {
    const [image, setImage] = useState('');
    const [job, setJob] = useState('');
    const [name, setName] = useState('');
    const [hometown, setHometown] = useState('');
    const [motivation, setMotivation] = useState('');
    const [usia, setUsia] = useState('');
    const history = useHistory();
    const token = localStorage.getItem("token");
    const isImage = image
    const [tipe, setTipe]=useState("");
    const [errors, setErrors] = useState([]);
    const navigate=useHistory();
    const { id } = useParams();

   
    const fetchDetailProfile = async () => {
        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await Api.get(`/api/dashboard/${id}`)
            .then(response => {
                setName(response.data.data.name);
                setJob(response.data.data.job);
                setImage(response.data.data.image);
                setHometown(response.data.data.hometown);
                setMotivation(response.data.data.motivation);
                setTipe(response.data.data.tipe);
                setUsia(response.data.data.usia)
            })
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
            fetchDetailProfile();
        }
        else{
            history.push('/login');
        }
    }, []);


    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handlesetName = (e) => {
        setName(e.target.value);
    }


    const handlesetJob = (e) => {
        setJob(e.target.value);
    }

    const handlesetHometown = (e) => {
        setHometown(e.target.value);
    }

    const handlesetMotivation = (e) => {
        setMotivation(e.target.value);
    }

    const handlesetTipe = (e) => {
        setTipe(e.target.value);
    }

    const handlesetUsia = (e) => {
        setUsia(e.target.value);
    }


    const updateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('job', job);
        formData.append('tipe', tipe);
        formData.append('usia', usia);
        formData.append('hometown', hometown);
        formData.append('motivation', motivation);
        formData.append('_method', 'PUT')
        await Api.post(`/api/dashboard/${id}`, formData)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Berhasil Update!',
                  })
                history.push("/profile");

            })
            .catch(error => {
                setErrors(error.response.data);
            })
    }
    console.log(usia)
    return(
<>
<Navfix/>
        <div className="container" style={{marginTop:"100px"}}>
        <div className="row justify-content-center">
            <div className="col-md-6">
            <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/profile">Profile</Breadcrumb.Item>
      <Breadcrumb.Item active>Edit Profile</Breadcrumb.Item>
    </Breadcrumb>
                <div className="card border-0 rounded shadow">
                    <div className="card-body">
                        <form onSubmit={updateProfile}>
                            <div className="mb-3">
                            {isImage ? (
    <img src={"https://www.jogjatripplanner.cloud/storage/img/"+image} className='img-fluid img-thumbnail mt-4 mb-2 ' style={{width:"150px",zIndex:"1"}}/>
) : (
    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className='img-fluid img-thumbnail mt-4 mb-2' style={{width:"150px", zIndex:"1", borderRadius: "100px"}}/>
)}                              <br/>
                                <input type="file" onChange={handleFileChange} className="form-control"/>
                            </div>

                            <div className="mb-3">
                                            <label className="form-label">Siapakah anda?</label>
                                            <select className="form-select" aria-label="Default select example" value={tipe} onChange={handlesetTipe}>
                                            <option>Pilih Tipe Wisatawan</option>
                                            <option value="backpacker">Wisatawan backpacker</option>
                                            <option value="grup">Grup wisata</option>
                                            <option value="family">Wisatawan keluarga</option>
                                            </select>
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
                                <label className="form-label fw-bold">usia</label>
                                <input type="text" className="form-control" value={usia} onChange={handlesetUsia} placeholder="Usia kamu"/>
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
                            <center>  <Button variant="dark" className='rounded-9 btn-lg text-capitalize butonprimer' type='submit'>Update</Button></center>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footerfix/>
    </>
    )

}

