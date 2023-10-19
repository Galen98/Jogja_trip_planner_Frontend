import React, { useState, useEffect } from 'react';
import { Form, Dropdown } from 'react-bootstrap';

const HomeForm = ({ handleNext }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const token=localStorage.getItem("token")

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmits = () => {
    if (selectedOption !== '') {
      handleNext(selectedOption);
    }
  };


  const dropdownToggleStyle = {
    backgroundColor: 'light', 
    color: 'black', 
    border: '2px solid #000',
    borderRadius: '8px',
    fontsize:'24px' ,
  };


    return(
        <>
        <div className="container py-5">
        <div className="row justify-content-center py-5 mt-lg-5">
                <div className="col-md-4">
                <div className="card-body ">
                        <center> <img className='logos' src='./logonews.png' alt="Logo" /></center>
                            <hr/>
    <Form>
        <Form.Group>
        <center><label className="form-label">Siapakah anda sebagai wisatawan?</label></center>
         <center> <Dropdown onSelect={handleOptionChange}>
         <Dropdown.Toggle variant="light" id="dropdown-basic" className="rounded-9 text-lg" style={dropdownToggleStyle}>
              {selectedOption || 'Pilih Jenis Wisatawan'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="backpacker">Backpacker</Dropdown.Item>
              <Dropdown.Item eventKey="keluarga">Keluarga</Dropdown.Item>
              <Dropdown.Item eventKey="grup_wisata">Grup Wisata</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown></center>
        </Form.Group>
        <button className='btn btn-success rounded-4' style={{float:"right",marginTop:"80px"}} onClick={handleSubmits}>Next <i class="fa fa-angle-right" aria-hidden="true"></i></button>
      </Form>
      </div>
      </div>
    </div>
    </div>
        </>
    )
}

export default HomeForm