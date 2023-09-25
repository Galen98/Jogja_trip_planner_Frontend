import Navfix from "../Component/Navfix"
import Footerfix from "../Component/Footerfix"
import React, { useState, useEffect } from 'react';
import HomeForm from "../Component/HomeForm";
import FormGrupWisata from "../Component/FormGrupwisata";
import Formbackpacker from "../Component/Formbackpacker";
import Formkeluarga from "../Component/Formkeluarga";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function MainForm(){
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState('');
    const token = localStorage.getItem('token')
    const history = useHistory()
  
    const handleNext = (option) => {
      setCurrentStep(currentStep + 1);
      setSelectedOption(option);
    };

    useEffect(() => {
        if(!token) {
            history.push('/login');
        }
    }, []);
    return(
        <>
        <Navfix/>
        {currentStep === 1 && <HomeForm handleNext={handleNext} />}
        {currentStep === 2 && selectedOption === 'grup_wisata' && <FormGrupWisata />}
        {currentStep === 2 && selectedOption === 'backpacker' && <Formbackpacker />}
        {currentStep === 2 && selectedOption === 'keluarga' && <Formkeluarga />}
        <Footerfix/>
        </>
    )
}

export default MainForm