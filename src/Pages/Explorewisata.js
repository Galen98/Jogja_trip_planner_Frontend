import Bodyexplore from "../Component/Bodyexplore"
import axios from "axios";
import { Link ,useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';
import Kategorihome from "../Component/Kategorihome"
import Navfix from "../Component/Navfix"
import Footerfix from "../Component/Footerfix"

function Explorewisata(){
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


    useEffect(() => {
        if(!token) {
            history.push('/');
        }
       
        fetchData();
    }, []);
return(
    <>
    <Navfix/>
    <Bodyexplore/>
    <Footerfix/>
    </>
)
}

export default Explorewisata