import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

const List = () => {
  const [flights, setFlights] = useState([]);
  const [direction, setDirection] = useState('D');
  const [isLoading, setIsLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [pageList, setPageList] = useState(0);

  const now = new Date();
  const tomorrow = new Date(Number(now));
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    setIsLoading(true);
    const url = `/flights?flightDirection=${direction}&fromDateTime=${
      now.toJSON().split('.')[0]
    }&toDateTime=${
      tomorrow.toJSON().split('.')[0]
    }&searchDateTimeField=scheduleDateTime&page=${pageList}&sort=+scheduleDate, +scheduleTime`;

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
        flights
          ? setFlights((prev) => [...prev, ...res.data.flights])
          : setFlights(res.data.flights);
        setIsLoading(false);

        console.log(flights.length);
      });
  }, [direction, pageList]);

  const changeDirection = (mode) => {
    setDirection(mode);
  };

  const pageListHandler = () => {
    setPageList((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Flights</h1>
      <div className='container'>
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
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <div>
                <Card flight={flight} direction={direction} />
              </div>
            </Link>
          ))
        )}
        <button onClick={pageListHandler}>Next</button>
      </div>
    </div>
  );
};

export default List;
