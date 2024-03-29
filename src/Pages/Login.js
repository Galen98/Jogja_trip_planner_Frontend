import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Footerfix from '../Component/Footerfix';
import Swal from 'sweetalert2'
import Navfix from '../Component/Navfix';
import Api from '../Api';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState([]);
    const history = useHistory();

    
    useEffect(() => {
        if(localStorage.getItem('token')) {
            history.push('/');
        }
    }, []);

    const loginHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
      

        try {
          const response = await Api.post('/api/login', formData);
          
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Berhasil login!',
            confirmButtonColor: '#1071ec',
            confirmButtonText: 'Yes',
          });

          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          
          try {
            const likedAttractionsResponse = await Api.get('/api/user/likes', {
              headers: {
                Authorization: `Bearer ${response.data.token}`
              }
            });
      
            const likedAttractionIds = likedAttractionsResponse.data;
            likedAttractionIds.forEach(attractionId => {
              localStorage.setItem(`attraction_${attractionId}_liked`, 'true');
            });
          } catch (error) {
            console.error('Error fetching liked attractions after login:', error);
          }
      
          history.push('/');
        } catch (error) {
          setValidation(error.response.data);
        }
      };
      
    return (
        <>
        <Navfix/>
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border rounded-6 shadow-sm">
                        <div className="card-body ">
                        <center> <img className='logos' src='./logonews.png' alt="Logo" /></center>
                            <h4 className="fw-bold text-center txtblack">Selamat datang kembali</h4>
                            <hr/>
                            <br/>
                            {
                                validation.message && (
                                    <div className="alert alert-danger">
                                        {validation.message}
                                    </div>
                                )
                            }
                            <form onSubmit={loginHandler}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukan email anda"/>
                                </div>
                                {
                                    validation.email && (
                                        <div className="alert alert-danger">
                                            {validation.email[0]}
                                        </div>
                                    )
                                }
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukan password anda"/>
                                </div>
                                {
                                    validation.password && (
                                        <div className="alert alert-danger">
                                            {validation.password[0]}
                                        </div>
                                    )
                                }
                                <div className="text-center">
                                    <p>Belum punya akun? <a href='/register'>buat</a> </p>
                                </div>
                                <div className="mb-3 text-center">
                                    <p>Lupa password? <a href='/register'>klik disini</a> </p>
                                </div>
                                <div className="d-grid gap-2 text-center">
                                 <center>  <button type="submit" className="btn butonprimer rounded-7 text-capitalize">Masuk</button></center>
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

export default Login;