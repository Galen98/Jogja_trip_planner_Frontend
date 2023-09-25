import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import { Form, Dropdown, Button } from 'react-bootstrap';
import Api from '../Api';
const FormGrupWisata = ({onSubmit}) =>{
    const[value, setValue]=useState(1)
    const history = useHistory()
    const [selectedValue, setSelectedValue] = useState('');
    const [selectRombongan, setSelectrombongan] = useState('')
    const handleIncrement = () => {
        if(value < 3){
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
    
      const handleDropdownSelect = (eventKey, event) => {
        setSelectedValue(eventKey);
      };
      const handleSelectrombongan = (eventKey, event) =>{
        setSelectrombongan(eventKey)
      }
  const dropdownToggleStyle = {
    backgroundColor: 'light', 
    color: 'black', 
    border: '2px solid #000',
    borderRadius: '8px',
    fontsize:'24px' ,
  };

  console.log(value)
  console.log(selectedValue)
  console.log(selectRombongan)

  const handleSubmites = async () => {
    try{
    const response = await Api.get(`/api/generategrup`, { 
           
        params: {
          jumlah_hari: value,
          transport: selectRombongan,
          tipe_wisata:selectedValue
        }, 
        headers: {
            'Content-Type': 'application/json',
          },
      });

      const data = response.data;
      console.log('Trip plan created:', data);
      if (data) {
        const itineraryId = data.itinerary_id;
        await Api.post('/api/create-itinerary', {
        itinerary_id: itineraryId,
        trip_plan: data.trip_plan, 
      });
      history.push(`/itinerarygrup?itinerary_id=${itineraryId}`, {
      })
      }
    } catch (error) {
        console.error('Error:', error.message);
      }
  }

    return(
        <>
        <div className="container py-5">
        <div className="row justify-content-center py-5 mt-lg-5">
                <div className="col-md-4">
                <div className="card-body ">
                        <center> <img className='logos' src='./logonews.png' alt="Logo" /></center>
                            <hr/>
<h4 className='text-center txtblack text-capitalize'>Form Grup Wisata</h4>
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
        <center><label className="form-label">Apa tipe aktivitas wisata anda?</label></center>
        <center>
      <Dropdown onSelect={handleDropdownSelect}>
        <Dropdown.Toggle variant="light" id="dropdown-basic" className="rounded-9 text-lg form-control" style={dropdownToggleStyle}>
          {selectedValue ? selectedValue : 'Pilih Tipe Aktivitas Wisata'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Gathering">Gathering</Dropdown.Item>
          <Dropdown.Item eventKey="Study_Tour">Study Tour</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </center>
    <br/>
        <center><label className="form-label">Berapa jumlah peserta wisata?</label></center>
        <center>
      <Dropdown onSelect={handleSelectrombongan}>
        <Dropdown.Toggle variant="light" id="dropdown-basic" className="rounded-9 text-lg form-control" style={dropdownToggleStyle}>
          {selectRombongan ? selectRombongan : 'Jumlah Peserta'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Kurang dari 50">Kurang dari 50 Orang</Dropdown.Item>
          <Dropdown.Item eventKey="Lebih dari 50">Lebih dari 50 Orang</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </center>
        </Form.Group>
        <div className="d-flex justify-content-between mt-5">
      <button className='btn btn-danger rounded-4'  onClick={handleBack}><i className="fa fa-angle-left" aria-hidden="true"></i> Back</button>
      <Button className='btn butonprimer rounded-4' onClick={handleSubmites}>Submit</Button>
    </div>
        </Form>
</div>
</div>
</div>
</div>
        </>
    )
}

export default FormGrupWisata