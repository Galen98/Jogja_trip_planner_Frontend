import Navfix from "../Component/Navfix"
import Footerfix from '../Component/Footerfix';
import Bodyitinerarybyuser from "../Component/Bodyitinerarybyuser";
import React from 'react';


function ItinerarybyUser(){

    return(
        <>
           <Navfix/>
            <Bodyitinerarybyuser/>
           <Footerfix/> 
        </>
    )
}

export default ItinerarybyUser;