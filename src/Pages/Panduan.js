import Navfix from "../Component/Navfix"
import Footerfix from "../Component/Footerfix"
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { Breadcrumb } from "react-bootstrap";
function Panduan(){

    return(
        <>
    <Navfix/>
    <div className="container py-5">
    <div className="px-5 py-5">
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Panduan membuat rencana perjalanan</Breadcrumb.Item>
    </Breadcrumb>
    <h2 className="font-weight-bold mb-5 text-center text-capitalize font700 txtblack">Panduan membuat rencana perjalanan</h2>
    <ListGroup as="ol" numbered>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Buat rencana perjalanan berdasarkan jenis wisatawan</div>
          Klik <a href="/homeform">'Buat rencana perjalanan wisata'</a>, pilih jenis wisatawan, isi formnya dan klik Submit
        </div>
 
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Buat rencana perjalanan wisata berdasarkan wisata favorit anda</div>
          Pilih wisata yang anda sukai dengan klik button 'Suka', setelah itu klik <a href="/favorite">'Favorite'</a>, dan klik button 'Buat rencana perjalanan'
          untuk membuat rencana perjalanan wisata berdasarkan wisata favorit anda
        </div>

      </ListGroup.Item>

    </ListGroup>
    </div>
    </div>
    <Footerfix/>
        </>
    )

}

export default Panduan