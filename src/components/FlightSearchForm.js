import React, { useState } from 'react';

const FlightSearchForm = ({ handleSearch }) => {
  const [flightNumber, setFlightNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(flightNumber);
  };

  return (
    <form className='form-group d-flex w-50' onSubmit={handleSubmit}>
      <label htmlFor='flightNumber'>Flight Number</label>
      <input
        className='form-control'
        placeholder='Enter flight number'
        type='text'
        name='flightNumber'
        id='flightNumber'
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
      />
      <button className='btn btn-primary' type='submit'>
        Search
      </button>
    </form>
  );
};

export default FlightSearchForm;
