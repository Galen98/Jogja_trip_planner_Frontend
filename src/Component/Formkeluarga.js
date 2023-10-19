import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 
import { Form, Dropdown, Button } from 'react-bootstrap';
import Api from '../Api';

function Formkeluarga(){
    const[value, setValue]=useState(1)
    const history = useHistory()
    const [selecttransportasi, setSelectTransportasi] = useState('')
    const [selectbudget, setSelectBudget] = useState('')
    const [anak, setAnak] = useState('')
    const [lansia, setLansia] = useState('')
    const [paket, setPaket] = useState('')
    const [latitude, setLatitude] = useState([])
    const [longitude, setLongitude] = useState([])
    const [locationFetched, setLocationFetched] = useState(false);

  const handleAnak = (event) => {
    setAnak(event.target.value); 
  };

  const handleLansia = (event) => {
    setLansia(event.target.value); 
  };

  const handlePaket = (event) => {
    setPaket(event.target.value); 
  };

    const handleIncrement = () => {
        if(value < 7){
        setValue(value + 1);
    }
      };
    
      const handleDecrement = () => {
        if (value > 1) {
          setValue(value - 1);
        }
      };
      const handleBack = () => {
        history.goBack();
      };
    
      const handleSelectBudget = (eventKey, event) => {
        setSelectBudget(eventKey);
      };

      const handleSelectTransportasi = (eventKey, event) =>{
        setSelectTransportasi(eventKey)
      }
  const dropdownToggleStyle = {
    backgroundColor: 'light', 
    color: 'black', 
    border: '2px solid #000',
    borderRadius: '8px',
    fontsize:'24px' ,
  };

console.log(latitude)
console.log(longitude)


const handleSubmites = async () => {
    try{
    const response = await Api.get(`/api/generatekeluarga`, { 
           
        params: {
          jumlah_hari: value,
          transport: selecttransportasi,
          paket:paket,
          budget:selectbudget,
          latitude:latitude,
          longitude:longitude
        }, 
        headers: {
            'Content-Type': 'application/json',
          },
      });

      const data = response.data;
      console.log('Trip plan created:', data);
      if (data) {
        const itineraryId = data.itinerary_id;
        const makanan = data.makanan
        await Api.post('/api/create-itinerary', {
        itinerary_id: itineraryId,
        trip_plan: data.trip_plan, 
        makanan: makanan,
      });
      history.push(`/itinerarykeluarga?itinerary_id=${itineraryId}`, {
      })
      }
    } catch (error) {
        console.error('Error:', error.message);
      }
  }

  useEffect(() => {
    if (!locationFetched && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationFetched(true);
          setLatitude(latitude)
          setLongitude(longitude)
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported in this browser.');
    }
  }, [locationFetched]);
    return(
        <>
    <div className="container py-5">
        <div className="row justify-content-center py-5 mt-lg-5">
                <div className="col-md-4">
                <div className="card-body ">
                        <center> <img className='logos' src='./logonews.png' alt="Logo" /></center>
                            <hr/>
<h4 className='text-center txtblack text-capitalize'>Form Wisatawan Keluarga</h4>
<Form>
        <Form.Group>
        <br/>
        <center><label className="form-label">Berapa hari akan berwisata?</label></center>
        <div className="input-group">
        <span className="input-group-btn">
          <button type="button" className="btn btn-outline-dark custom-button-install rounded" style={{marginRight:"10px"}} onClick={handleDecrement}><i class="fa fa-minus" aria-hidden="true"></i></button>
        </span>
        <input type="text" className="form-control text-center rounded-4" value={value} readOnly />
        <span className="input-group-btn">
          <button type="button" className="btn btn-outline-dark custom-button-install rounded" style={{marginLeft:"10px"}} onClick={handleIncrement}><i class="fa fa-plus" aria-hidden="true"></i></button>
        </span>
      </div>
      <br/>
      <center><label className="form-label">Transportasi yang anda rencanakan untuk wisata ke Jogja?</label></center>
        <center>
      <Dropdown onSelect={handleSelectTransportasi}>
        <Dropdown.Toggle variant="light" id="dropdown-basic" className="rounded-9 text-lg form-control" style={dropdownToggleStyle}>
          {selecttransportasi ? selecttransportasi : 'Pilih Transportasi'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Kereta">Kereta</Dropdown.Item>
          <Dropdown.Item eventKey="Pribadi">Kendaraan pribadi</Dropdown.Item>
          <Dropdown.Item eventKey="Pesawat">Pesawat</Dropdown.Item>
          <Dropdown.Item eventKey="Lainnya">Lainnya</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </center>
    <br/>
        <center><label className="form-label">Pilih budget wisata anda</label></center>
        <center>
      <Dropdown onSelect={handleSelectBudget}>
        <Dropdown.Toggle variant="light" id="dropdown-basic" className="rounded-9 text-lg form-control" style={dropdownToggleStyle}>
          {selectbudget ? selectbudget : 'Pilih budget'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Ekonomis">Ekonomis</Dropdown.Item>
          <Dropdown.Item eventKey="Sedang">Sedang</Dropdown.Item>
          <Dropdown.Item eventKey="Mahal">Mahal</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </center>
    <br/>
    <div className='row'>
    <Form.Label>Apakah ada anak-anak?</Form.Label>
    <div className='col'>
        <Form.Check
          type="radio"
          label="Ya"
          name="yesNo"
          id="yes"
          value="ya"
          checked={anak === 'ya'}
          onChange={handleAnak}
        />
        </div>
        <div className='col'>
        <Form.Check
          type="radio"
          label="Tidak"
          name="yesNo"
          id="no"
          value="tidak"
          checked={anak === 'tidak'}
          onChange={handleAnak}
        />
        </div>
        </div>
        <br/>
    <div className='row'>
    <Form.Label>Apakah ada lansia?</Form.Label>
    <div className='col'>
        <Form.Check
          type="radio"
          label="Ya"
          name="yesNolansia"
          id="yes"
          value="ya"
          checked={lansia === 'ya'}
          onChange={handleLansia}
        />
        </div>
        <div className='col'>
        <Form.Check
          type="radio"
          label="Tidak"
          name="yesNolansia"
          id="no"
          value="tidak"
          checked={lansia === 'tidak'}
          onChange={handleLansia}
        />
        </div>
        </div>
        <br/>
    <div className='row'>
    <Form.Label>Apakah tertarik dengan paket wisata?</Form.Label>
    <div className='col'>
        <Form.Check
          type="radio"
          label="Ya"
          name="yesNopaket"
          id="yes"
          value="Ya"
          checked={paket === 'Ya'}
          onChange={handlePaket}
        />
        </div>
        <div className='col'>
        <Form.Check
          type="radio"
          label="Tidak"
          name="yesNopaket"
          id="no"
          value="Tidak"
          checked={paket === 'Tidak'}
          onChange={handlePaket}
        />
        </div>
        </div>
        </Form.Group>
        <div className="d-flex justify-content-between mt-5">
      <button className='btn btn-danger rounded-4'  onClick={handleBack}><i className="fa fa-angle-left" aria-hidden="true"></i> Back</button>
      <Button variant="primary" onClick={handleSubmites}>
            Submit
          </Button>
    </div>
        </Form>
</div>
</div>
</div>
</div>
        </>
    )
}

export default Formkeluarga