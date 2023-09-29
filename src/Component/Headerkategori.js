import React, { useState, useEffect } from 'react';
import { useHistory, useParams} from 'react-router';
import Api from '../Api';
function Headerkategori(){
    const [kategoridesc, setkategoriDesc] = useState([]);
    const history = useHistory();
    const { kategori } = useParams();
    const fetchlistKategori = async()=>{
        await Api.get(`/api/getkategori/${kategori}`)
        .then((response) => {
            //set response user to state
            setkategoriDesc(response.data);
        })
    }

    useEffect(() => {
        fetchlistKategori();
    }, []);
    console.log(kategoridesc)
    return(
        <>

      {Object.keys(kategoridesc).map((key) => {
        const item = kategoridesc[key]; 
        return (
    <div style={{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image}) center center`,backgroundSize:"cover",backgroundRepeat:"no-repeat",height:"550px",marginTop:"65px"}}>
    <div className=" container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="row align-items-left g-lg-5 py-5"  style={{marginTop:"100px"}}>
      <div className="text-left">
      <br/>
      <br/>
      <br/>
        <h3 className="display-2 fw-bold lh-1 mb-3 text-white">{item.namakategori}</h3>
        <p className="fs-3 text-white">{item.deskripsi}</p>
      </div>
      </div>
      </div>
      </div>
        );
      })}
        </>
    )
}

export default Headerkategori