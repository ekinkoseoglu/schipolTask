import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightDetails from './components/FlightDetails';
import List from './components/List';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/flights/:flightId' element={<FlightDetails />} />
        <Route exact path='/' element={<List />} />
      </Routes>
    </Router>
  );
};

export default App;
