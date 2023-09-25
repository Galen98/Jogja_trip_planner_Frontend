import Navfix from "../Component/Navfix"
import Footerfix from '../Component/Footerfix';
import Bodyitinerarybackpacker from "../Component/Bodyitinerarybackpacker";
import React, { useState, Component, useEffect  } from 'react';


function Itinerarybackpacker(){

    return(
        <>
           <Navfix/>
            <Bodyitinerarybackpacker/>
           <Footerfix/> 
        </>
    )
}

export default Itinerarybackpacker;