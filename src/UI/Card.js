import React, { useEffect } from 'react';
import './Card.css';

const Card = ({ flight, direction }) => {
  useEffect(() => {
    console.log(flight.gate);
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

  return (
    <div className='flightCard mb-3 ' key={flight.id}>
      <div>
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
      </div>
    </div>
  );
};

export default Card;
