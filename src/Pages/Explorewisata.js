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

    useEffect(() => {
        if(!token) {
            history.push('/');
        }  
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