import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [flights, setFlights] = useState([]);

  const now = new Date();
  const tomorrow = new Date(Number(now));

  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    const url = `/flights?flightDirection=D&fromDateTime=${
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
        console.log(res.data);
        setFlights(res.data.flights);
      });
  }, []);

  return (
    <div>
      <h1>Flights</h1>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            {flight.flightName} {flight.flightNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
