import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Menetapkan elemen root aplikasi sebagai elemen yang diakses oleh screen readers

const Modalitinerary = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    // Lakukan apa yang perlu dilakukan dengan nilai input (misalnya, simpan ke state induk atau lakukan permintaan HTTP)
    console.log('Nilai Input:', inputValue);
    onClose(); // Tutup modal setelah selesai
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