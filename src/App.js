import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Routes,
} from 'react-router-dom';
import FlightDetails from './UI/FlightDetails';
import Card from './UI/Card';
import List from './UI/List';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [direction, setDirection] = useState('D');
  const [isLoading, setIsLoading] = useState(false);

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
    <Router>
      <Routes>
        <Route path='/flights/:flightId' element={<FlightDetails />} />

        <Route
          exact
          path='/'
          element={
            <List
              flights={flights}
              isLoading={isLoading}
              direction={direction}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
