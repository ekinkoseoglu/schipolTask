import React, { useEffect, useState } from 'react';
import './Card.css';

const Card = ({ flight, direction }) => {
  const [city, setCity] = useState('');
  useEffect(() => {
    setCity(flight.route.destinations[0]);
  }, []);

  const getStatus = () => {
    switch (flight.publicFlightState?.flightStates[0]) {
      case 'TOM':
        return <button className='btn btn-warning'>Tomorrow</button>;
      case 'LND':
        return <button className='btn btn-danger'>Landed</button>;
      case 'GTO':
        return <button className='btn btn-info'>Gate Open</button>;
      case 'DEL':
        return <button className='btn btn-warning'>Delayed</button>;
      case 'GTD':
        return <button className='btn btn-danger'>Gate Closed</button>;
      case 'ARR':
        return <button className='btn btn-info'>Arrived</button>;
      case 'DIV':
        return <button className='btn btn-light'>Diverted</button>;
      case 'CNX':
        return <button className='btn btn-danger'>Cancelled</button>;
      case 'AIR':
        return <button className='btn btn-primary'>In Air</button>;
      case 'SCH':
        return <button className='btn btn-secondary'>Scheduled</button>;
      case 'DEP':
        return <button className='btn btn-info'>Departed</button>;
      case 'GCH':
        return <button className='btn btn-warning'>Gate Changed</button>;
      case 'WIL':
        return <button className='btn btn-dark'>Wait In Lounge</button>;
      case 'FIB':
        return <button className='btn btn-dark'>Final Boarding</button>;
      case 'FIR':
        return <button className='btn btn-warning'>Final Call</button>;
      default:
        return <button className='btn btn-link'>-</button>;
    }
  };

  const formattedDate = new Date(flight.scheduleDateTime).toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );
  const formattedTime = new Date(flight.scheduleDateTime).toLocaleTimeString(
    'en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
    }
  );

  return (
    <div className='flightCard mb-3' key={flight.id}>
      <article className='flight-card flights-list__item'>
        <div className='flight-card__departure'>
          <time className='flight-card__time'>{formattedTime}</time>
          <div>
            <p className='flight-card__type'>
              {direction === 'D' ? 'To: ' : 'From: '}
            </p>
            <h2 className='flight-card__city'>{city}</h2>
          </div>
          <div>
            <p className='flight-card__type'>Flight:</p>
            <h5 className='flight-card__name'>{flight.flightName}</h5>
          </div>
          <time className='flight-card__type'>{formattedDate}</time>
          <div>{getStatus()}</div>
        </div>
      </article>
    </div>
  );
};

export default Card;
