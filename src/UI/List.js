import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

const List = () => {
  const [flights, setFlights] = useState([]);
  const [direction, setDirection] = useState('D');
  const [isLoading, setIsLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);

  const now = new Date();
  const tomorrow = new Date(Number(now));
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    setIsLoading(true);
    const url = `/flights?flightDirection=${direction}&fromDateTime=${
      now.toJSON().split('.')[0]
    }&toDateTime=${
      tomorrow.toJSON().split('.')[0]
    }&searchDateTimeField=scheduleDateTime&page=0&sort=+scheduleDate, +scheduleTime`;

    axios
      .get(url, {
        headers: {
          Accept: 'application/json',
          app_id: 'b1a06b6e',
          app_key: 'aa28d83034a1edc1f9a07b340847013c',
          ResourceVersion: 'v4',
        },
      })
      .then((res) => {
        setFlights(res.data.flights);

        setIsLoading(false);
      });
  }, [direction]);

  const changeDirection = (mode) => {
    setDirection(mode);
  };

  return (
    <div>
      <h1>Flights</h1>
      <form>
        <label htmlFor='flightNumber'>Flight Number</label>
        <input type='text' name='flightNumber' id='flightNumber' />
        <button type='submit'>Search</button>
      </form>
      <div>
        <button onClick={(e) => changeDirection('D')}>Departures</button>
        <button onClick={(e) => changeDirection('A')}>Arrivals</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        flights.map((flight) => (
          <Link
            to={`/flights/${flight.id}`}
            key={flight.id}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <div className='col-md-4' key={flight.id}>
              <Card flight={flight} direction={direction} />
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default List;
