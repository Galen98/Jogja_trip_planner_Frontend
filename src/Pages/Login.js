//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';
import Footerfix from '../Component/Footerfix';
import Swal from 'sweetalert2'
import Navfix from '../Component/Navfix';
function Login() {

    //define state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Tokens = localStorage.getItem("token");

    //define state validation
    const [validation, setValidation] = useState([]);

    //define history
    const history = useHistory();

    //hook useEffect
    useEffect(() => {

        //check token
        if(localStorage.getItem('token')) {

            //redirect page dashboard
            history.push('/');
        }
    }, []);

    //function "loginHanlder"
    const loginHandler = async (e) => {
        e.preventDefault();
        //initialize formData
        const formData = new FormData();
        //append data to formData
        formData.append('email', email);
        formData.append('password', password);
      

        try {
          const response = await axios.post('http://localhost:8000/api/login', formData);
          
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
            const likedAttractionsResponse = await axios.get('http://localhost:8000/api/user/likes', {
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
                    <div className="card border-0 rounded-6 shadow-sm">
                        <div className="card-body ">
                        <center> <img className='logos' src='./logonews.png' alt="Logo" /></center>
                            <h5 className="fw-bold text-center">Welcome-Back.</h5>
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
                                 <center>  <button type="submit" className="btn btn-success rounded-7 text-capitalize">Masuk</button></center>
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