import Navfix from "../Component/Navfix"
import Footerfix from '../Component/Footerfix';
import Wisatabykategori from "../Component/Wisatabykategori";
import Headerkategori from '../Component/Headerkategori';
import React, { useState, Component, useEffect  } from 'react';
function Kategoripage(){

    return(
        <>
    <Navfix/>
    <Headerkategori/>
    <Wisatabykategori/>
    <Footerfix/>
        </>
    )
}

export default Kategoripage