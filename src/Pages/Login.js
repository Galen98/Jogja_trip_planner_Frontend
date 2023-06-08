//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';
import Footer from '../Component/Footer';

import Nav from '../Component/Nav';
function Login() {

    //define state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

        //send data to server
        await axios.post('http://localhost:8000/api/login', formData)
        .then((response) => {

            //set token on localStorage
            localStorage.setItem('token', response.data.token);

            //redirect to dashboard
            history.push('/');
        })
        .catch((error) => {

            //assign error to state "validation"
            setValidation(error.response.data);
        })
    };
    return (
        <>
        <Nav/>
        <div className="container" style={{ marginTop: "50px" }}>
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
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email"/>
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
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your Password"/>
                                </div>
                                {
                                    validation.password && (
                                        <div className="alert alert-danger">
                                            {validation.password[0]}
                                        </div>
                                    )
                                }
                                <div className="text-center">
                                    <p>Don't have Account? <a href='/register'>create one</a> </p>
                                </div>
                                <div className="mb-3 text-center">
                                    <p>Forget password? <a href='/register'>click here</a> </p>
                                </div>
                                <div className="d-grid gap-2 text-center">
                                 <center>  <button type="submit" className="button is-success">Sign in</button></center>
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

export default Login;