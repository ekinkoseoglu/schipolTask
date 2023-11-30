import React, { useEffect, useState } from 'react';
import './Card.css';
import axios from 'axios';

const Card = ({ flight, direction }) => {
  const [city, setCity] = useState('');
  useEffect(() => {
    axios
      .get(`/destinations/${flight.route.destinations[0]}`, {
        headers: {
          Accept: 'application/json',
          app_id: 'b1a06b6e',
          app_key: 'aa28d83034a1edc1f9a07b340847013c',
          ResourceVersion: 'v4',
        },
      })
      .then((res) => {
        console.log(res.data.city);
        setCity(res.data.city);
      });
  }, []);

  const getStatus = () => {
    switch (flight.publicFlightState?.flightStates[0]) {
      case 'TOM':
        return 'Tomorrow';
      case 'LND':
        return 'Landed';
      case 'GTO':
        return 'Gate Open';
      case 'DEL':
        return 'Delayed';
      case 'GCL':
        return 'Gate Closing';
      case 'GTD':
        return 'Gate Closed';
      case 'ARR':
        return 'Completed';
      case 'DIV':
        return 'Diverted';
      case 'CNX':
        return 'Canceled';
      case 'AIR':
        return 'On Air';
      case 'SCH':
        return 'On Time';
      case 'DEP':
        return 'Departed';
      case 'GCH':
        return 'Gate Change';
      case 'WIL':
        return 'Wait in Lounge';
      case 'FIB':
        return 'Baggage Soon';
      case 'FIR':
        return 'Approaching';
      default:
        return 'Unknown';
    }
  };

  // Format date and time
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
      {/* <div>
        <h6 className='card-subtitle mb-2 text-muted d-flex  justify-content-between align-items-center'>
          <p>Time</p>
          <p>Flight</p>
          <p>{direction === 'D' ? 'To: ' : 'From: '}</p>
          <p>Plane Type</p>
          <p>Status</p>
          {flight.gate && <p>Gate</p>}
        </h6>
      </div>
      <div className=' d-flex justify-content-between align-items-center'>
        <p>{flight.scheduleTime.slice(0, 5)}</p>
        <p>{flight.mainFlight}</p>
        <p>{flight.route.destinations[0]}</p>
        <p> {flight.aircraftType.iataMain}</p>
        <p>{getStatus()}</p>
        {flight.gate && <p>{flight.gate}</p>}
      </div> */}

      <article className='flight-card flights-list__item'>
        <div className='flight-card__departure'>
          <time className='flight-card__time'>{formattedTime}</time>
          <div>
            <p className='flight-card__type'>
              {direction === 'D' ? 'To: ' : 'From: '}
            </p>
            <h2 className='flight-card__city'>{city}</h2>
          </div>
          <time className='flight-card__day'>{formattedDate}</time>

          <div className='flight-card__action'>
            <button className='flight-card__cta button button--orange'>
              {getStatus()}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Card;
