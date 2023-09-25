import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const Modalitinerary = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    console.log('Nilai Input:', inputValue);
    onClose(); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal Input"
    >
      <h2>Modal Input</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Simpan</button>
      <button onClick={onClose}>Batal</button>
    </Modal>
  );
};

export default Modalitinerary