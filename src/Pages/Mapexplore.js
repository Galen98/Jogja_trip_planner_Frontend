import Navfix from "../Component/Navfix"
import Footerfix from "../Component/Footerfix"
import Exploremaps from "../Component/Exploremaps"
function Mapexplore(){

    return(
        <>
     <Navfix/>
     <div style={{marginTop:"68px"}}>
     <Exploremaps/>
     </div>
    <Footerfix/>
        </>
    )

}

export default Mapexplore