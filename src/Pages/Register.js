//import hook react
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Footerfix from '../Component/Footerfix';
import Navfix from '../Component/Navfix';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Api from '../Api';
function Register() {
    const [name, setName] = useState("");
    const [hometown, setHometown] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [tipe, setTipe]=useState("");
    const [validation, setValidation] = useState([]);
    const history = useHistory();
    const registerHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', name);
        formData.append('hometown', hometown);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);
        formData.append('tipe', tipe)
        await Api.post('/api/register', formData)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Akun anda berhasil dibuat!',
              })
        })
        .then(() => {
            history.push('/login');
        })
        .catch((error) => {
            setValidation(error.response.data);
        })
    };

    return (
        <>
        <Navfix/>
        <div className="container " style={{ marginTop: "100px" }}>
            <div className="row justify-content-center">
                <div className="col-md-8 " >
                    <div className="card border rounded shadow-sm">
                        <div className="card-body border border-light ">
                        <center> <img className='logos' src='./logonews.png' alt="Logo" /></center>
                        <strong><h4 className="fw-bold txtblack text-center">Selamat datang</h4></strong>
                        <p className='text-center'>Bersiaplah dengan perjalanan baru Anda</p>
                        <hr/>
                            <br />
                            <form onSubmit={registerHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Nama</label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama anda"/>
                                        </div>
                                        {
                                        validation.name && (
                                            <div className="alert alert-danger">
                                                {validation.name[0]}
                                            </div>
                                        )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email anda"/>
                                        </div>
                                        {
                                            validation.email && (
                                                <div className="alert alert-danger">
                                                    {validation.email[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    
                                    
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukan password"/>
                                        </div>
                                        {
                                            validation.password && (
                                                <div className="alert alert-danger">
                                                    {validation.password[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Konfirmasi Password</label>
                                            <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Masukan ulang password anda"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Asal kota</label>
                                            <input type="text" className="form-control" value={hometown} onChange={(e) => setHometown(e.target.value)} placeholder="Asal kota anda"/>
                                        </div>
                                        {
                                            validation.email && (
                                                <div className="alert alert-danger">
                                                    {validation.hometown[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Siapakah anda?</label>
                                            <select className="form-select" aria-label="Default select example" value={tipe} onChange={(e) => setTipe(e.target.value)}>
                                            <option>Pilih Tipe Wisatawan</option>
                                            <option value="backpacker">Wisatawan backpacker</option>
                                            <option value="grup">Grup wisata</option>
                                            <option value="family">Wisatawan keluarga</option>
                                            </select>
                                        </div>
                                        {/* {
                                            validation.email && (
                                                <div className="alert alert-danger">
                                                    {validation.hometown[0]}
                                                </div>
                                            )
                                        } */}
                                    </div>
                                </div>
                                <br/>
                                <div className="d-grid gap-2">
                                <center>  <button type="submit" className="btn butonprimer rounded-7 text-capitalize">Daftar</button></center>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footerfix />
        </>
    )

}

export default Register;