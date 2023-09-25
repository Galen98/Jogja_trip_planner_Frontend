function Komponenheaderprofile(){
    const user = JSON.parse(localStorage.getItem("userData"));
    const isHome = user && user.hometown
    const isImage = user && user.image
    return(
        <>
    <div className='card'>
<div className='rounded-top text-white d-flex flex-row headerprofile' style={{height:"200px"}}> 
<div className='ms-4 mt-5 d-flex flex-column' style={{width:"150px"}}>
{isImage ? (
    <img src={"http://203.194.113.182/storage/img/"+user.image} className='img-fluid img-thumbnail mb-5' style={{width:"150px", zIndex:"1"}}/>
    
) : (
    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className='img-fluid img-thumbnail mt-4 mb-2' style={{width:"150px", zIndex:"1", borderRadius: "100px"}}/>
)}
<br/>
</div>

<div className='ms-3' style={{marginTop:"70px"}}>
<a href={`/profile/edit/${user.id}`} className='btn btn-outline-primary custom-button rounded-9 text-capitalize mb-2 ml-2' data-mdb-ripple-color="dark" style={{zIndex:"1"}}>Edit Profile</a>
<p className='lead fw-normal mb-1 txtblack fontprofile ml-2 text-capitalize'>{user.name}</p>
{isHome ? (
<p className='lead fw-normal mb-2 ml-2 txtblack fontprofile text-capitalize'>{user.hometown}</p>
) : (
    <p className='lead txtblack fw-normal ml-2 mb-2 fontprofile'>(Isi asal kotamu)</p>
)}
</div>            
</div>
</div>
        </>
    )
}
export default Komponenheaderprofile