//import useState
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footerhome from '../Component/Footerhome';
import { useHistory } from 'react-router';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Nav from '../Component/Nav';
import axios from 'axios';

export default function Formitinerary(){

    return(
        <>
            <Nav/>
            <section className="section mt-0" style={{overflow:"hidden"}}>
            <div className="columns is-centered">
  <div className="column is-half">
  <br/>
    <div className="card is-rounded" style={{borderRadius:"20px"}}>
  <div className="card-content">
  <h1 className='mb-4 is-size-4 is-size-4-mobile has-text-centered has-text-weight-bold is-black'>Buat Rencana Perjalanan Wisata</h1>
  <br/>
  <div className="field">
  <label className="label">Tipe Wisatawan</label>
  <div className="control">
    <div className="select">
      <select>
        <option>Pilih Tipe Wisatawan</option>
        <option>Wisatawan Backpacker</option>
        <option>Wisatawan Keluarga</option>
        <option>Grup Wisata</option>
      </select>
    </div>
  </div>
</div>
<div className="field">
  <label className="label">Tipe Perjalanan Wisata</label>
  <div className="control">
    <div className="select">
      <select>
        <option>Pilih Tipe Wisatawan</option>
        <option>Wisatawan Backpacker</option>
        <option>Wisatawan Keluarga</option>
        <option>Grup Wisata</option>
      </select>
    </div>
  </div>
</div>
<div className="field">
  <label className="label">Budget</label>
  <div className="control">
    <div className="select">
      <select>
        <option>Pilih Tipe Wisatawan</option>
        <option>Wisatawan Backpacker</option>
        <option>Wisatawan Keluarga</option>
        <option>Grup Wisata</option>
      </select>
    </div>
  </div>
</div>
<div className="field">
<label className="label">Berapa hari anda akan berwisata?</label>
      <div className="control">
        <input className="input" max="5" min="1" placeholder="Masukan jumlah hari" required type="number"/>
      </div>
    </div>


<div className="field">
<label className="label">Apakah anda menginap?</label>
  <div className="control">
    <label className="radio">
      <input type="radio" name="hotel"/>
      Yes
    </label>
    <label class="radio">
      <input type="radio" name="hotel"/>
      No
    </label>
  </div>
</div>

<div className="field">
<label className="label">Apakah anda ingin menggunakan travel agent?</label>
  <div className="control">
    <label className="radio">
      <input type="radio" name="agent"/>
      Yes
    </label>
    <label className="radio">
      <input type="radio" name="agent"/>
      No
    </label>
  </div>
</div>

<div className="field">
<label className="label">Apakah anda bersama anak-anak?</label>
  <div className="control">
    <label className="radio">
      <input type="radio" name="anak"/>
      Yes
    </label>
    <label className="radio">
      <input type="radio" name="anak"/>
      No
    </label>
  </div>
</div>

<div className="field">
<label className="label">Apakah anda bersama lansia?</label>
  <div className="control">
    <label className="radio">
      <input type="radio" name="lansia"/>
      Yes
    </label>
    <label className="radio">
      <input type="radio" name="lansia"/>
      No
    </label>
  </div>
</div>



<button class="button is-black is-medium is-fullwidth mt-5 is-rounded">Lihat perjalanan anda</button>
  </div>
  </div>
  </div>
  </div>
            </section>
            <Footerhome/>
        </>
    )
}