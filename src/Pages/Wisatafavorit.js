import Navfix from "../Component/Navfix"
import Footerfix from "../Component/Footerfix"
import Bodyfavorit from "../Component/Bodyfavorit";
import React, { useState, useEffect } from 'react';
import { Link ,useHistory } from 'react-router';
import axios from 'axios';
function Wisatafavorit(){
    const token = localStorage.getItem("token");
    const history = useHistory();
    useEffect(() =>{
        if(!token){
            history.push('/login');
        }
    }, [])
    return (
        <>
            <Navfix/>
            <Bodyfavorit/>
            <Footerfix/>
        </>
    )

}

export default Wisatafavorit