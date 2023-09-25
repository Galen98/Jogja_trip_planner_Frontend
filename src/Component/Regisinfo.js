import Kategorihome from "./Kategorihome"
function Regisinfo(){
    return(
        <>
    <h3 className="font-weight-bold mt-5 text-center text-capitalize font700 txtblack">Registrasi sekarang dan buat <br/> rencana perjalanan wisata sesuai Keinginanmu</h3>
    <p className="font-weight-bold text-center">Memberi rencana perjalanan wisata dan objek wisata di Jogja terlengkap sesuai kebutuhanmu <br/> sebagai wisatawan untuk perjalanan wisata di Jogja yang lebih mudah</p>
    <center>

    <div className="mt-5 row gx-4 justify-content-center">
      <div className="col-lg-3 col-md-12 mb-3 ">
      <img src="../backpacker.png" style={{width:"250px"}}/>
      <h5 className="mt-4 font-weight-bold text-capitalize text-center font600 txtblack">Cocok untuk Backpacker</h5>
      <p className="mt-2 font-weight-bold text-center">Kami berikan rencana perjalanan wisata<br/> untuk anda sebagai backpacker</p>
      </div>

      <div className="col-lg-3 col-md-12 mb-3 ">
      <img src="https://i.ibb.co/pbXN2xz/family.png" style={{width:"250px"}}/>
      <h5 className="mt-4 font-weight-bold text-capitalize text-center font600 txtblack">Berwisata bersama keluarga</h5>
      <p className="mt-2 font-weight-bold text-center">Kami berikan pilihan wisata terbaik <br/>untuk wisata anda bersama keluarga</p>
      </div>

      <div className="col-lg-3 col-md-12 mb-3 ">
      <img src="https://i.ibb.co/Wkf9sFx/grup.png" style={{width:"250px"}}/>
      <h5 className="mt-4 font-weight-bold text-capitalize text-center font600 txtblack">Grup wisata</h5>
      <p className="mt-2 font-weight-bold text-center">Atur acara perjalanan wisata anda agar lebih efektif</p>
      </div>
    </div>
    </center>
    <Kategorihome/>
        </>
    )
}

export default Regisinfo