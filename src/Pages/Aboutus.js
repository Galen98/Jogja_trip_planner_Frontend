import Navfix from "../Component/Navfix"
import Footerfix from "../Component/Footerfix"
import { Breadcrumb } from "react-bootstrap"
function Aboutus(){

    return(
        <>
        <Navfix/>
        <div className="container py-5">
    <div className="px-5 py-5">
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>About us</Breadcrumb.Item>
    </Breadcrumb>
    <h2 className="font-weight-bold mb-5 text-center text-capitalize font700 txtblack">About Us</h2>
    <blockquote class="blockquote text-center">
  <p class="mb-0"><strong>Jogja Trip Planner</strong> atau Perencanaan Perjalanan Wisata Jogja adalah aplikasi berbasis website
  yang memudahkan anda untuk merencanakan perjalanan wisata anda di Jogja. Kami hadirkan lebih dari 100 Wisata, Rumah makan,
   dan Hotel untuk menunjang perjalanan wisata anda di Jogja. Aplikasi ini cocok untuk anda seorang Backpacker,
   berwista Keluarga, dan Grup Wisata karena kami akan memberikan rencana perjalanan wisata berdasarkan jenis Wisatawan</p>
</blockquote>
    </div>
    </div>
        <Footerfix/>
        </>
    )
}
export default Aboutus