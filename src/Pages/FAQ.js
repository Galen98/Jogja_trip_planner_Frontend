import Footerfix from "../Component/Footerfix"
import Navfix from "../Component/Navfix"
import React, { useState } from "react";
import {
  MDBCollapse,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Breadcrumb } from "react-bootstrap";
function FAQ(){
  const [collapse1, setCollapse1] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [collapse3, setCollapse3] = useState(false);
  const toggleCollapse1 = () => setCollapse1(!collapse1);
  const toggleCollapse2 = () => setCollapse2(!collapse2);
  const toggleCollapse3 = () => setCollapse3(!collapse3);
return(
    <>
    <Navfix/>
       <div className="container py-5">
    <div className="px-5 py-5">
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>FAQ</Breadcrumb.Item>
    </Breadcrumb>
    <h2 className="font-weight-bold mb-5 text-center text-capitalize font700 txtblack">FAQ</h2>
    <MDBContainer className="mt-5" style={{ maxWidth: "1000px" }}>
      <MDBListGroup>
        <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse1} action>
          <MDBTypography tag="h5">Pertanyaan 1</MDBTypography>
          <p className="mb-1">Apa yang dapat saya lakukan dengan aplikasi website ini?</p>
          <small>
            <u>Jawaban</u>
          </small>
          <MDBCollapse show={collapse1}>
            Anda dapat membuat rencana perjalanan wisata sendiri berdasarkan wisata yang anda sukai dan anda dapat membuat rencana
            perjalanan berdasarkan jenis wisatawan apa anda, kami akan berikan rencana perjalanan sesuai dengan kebutuhan wisata anda
          </MDBCollapse>
        </MDBListGroupItem>
        <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse2} action>
          <MDBTypography tag="h5">Pertanyaan 2</MDBTypography>
          <p className="mb-1">Berapa tempat wisata yang bisa saya buat untuk menjadi rencana perjalanan wisata?</p>
          <small>
            <u>jawaban</u>
          </small>
          <MDBCollapse show={collapse2}>
            Anda bebas menyukai tempat wisata yang ada, dalam aplikasi ini anda diberikan maksimal 7 hari wisata
          </MDBCollapse>
        </MDBListGroupItem>
        <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse3} action>
          <MDBTypography tag="h5">Pertanyaan 3</MDBTypography>
          <p className="mb-1">Informasi apa yang diberikan dalam rencana perjalanan wisata?</p>
          <small>
            <u>Jawaban</u>
          </small>
          <MDBCollapse show={collapse3}>
            Anda diberikan informasi cuaca terkini Jogja, rekomendasi hotel, restoran, estimasi biaya, dan informasi transportasi umum yang tersedia
          </MDBCollapse>
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBContainer>
    </div>
    </div>
    <Footerfix/> 
    </>
)
}
export default FAQ