import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import './FlightDetails.css';

const FlightDetails = () => {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);
  const [city, setCity] = useState('');
  const [airport, setAirport] = useState('');

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const flightResponse = await axios.get(`/flights/${flightId}`, {
          headers: {
            Accept: 'application/json',
            app_id: 'b1a06b6e',
            app_key: 'aa28d83034a1edc1f9a07b340847013c',
            ResourceVersion: 'v4',
          },
        });

        const fetchedFlight = flightResponse.data;
        setFlight(fetchedFlight);

        const destinationId = fetchedFlight?.route.destinations[0];
        const destinationResponse = await axios.get(
          `/destinations/${destinationId}`,
          {
            headers: {
              Accept: 'application/json',
              app_id: 'b1a06b6e',
              app_key: 'aa28d83034a1edc1f9a07b340847013c',
              ResourceVersion: 'v4',
            },
          }
        );

        const destinationData = destinationResponse.data;
        setCity(destinationData.city);
        setAirport(destinationData.publicName?.english);
      } catch (error) {
        console.error('Error fetching flight details:', error);
      }
    };

    fetchFlightDetails();
  }, [flightId]);

  const getDate = () => {
    if (!flight) return '';

    const date = new Date(flight.scheduleDateTime);
    const formattedDate =
      date.getDate() + ' ' + date.toLocaleString('en-us', { month: 'short' });

    return formattedDate;
  };

  const getDesks = () => {
    const desks = flight?.checkinAllocations?.checkinAllocations[0]?.rows.rows;

    if (desks) {
      const lastIndex = desks[desks.length - 1].position;
      const firstIndex = desks[0].position;
      return `${firstIndex}-${lastIndex}`;
    }
    return '-';
  };

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

  // Fetch the flight details based on flightId from your API or state
  // Example: You can use flightId to fetch the specific flight details
  // const [flightDetails, setFlightDetails] = useState(null);
  // useEffect(() => {
  //   axios.get(`/flights/${flightId}`).then((res) => {
  //     setFlightDetails(res.data);
  //   });
  // }, [flightId]);

  return (
    <div className='flight-details'>
      {/* Back button go to localhost:3000 */}
      <NavLink to='/' exact>
        <button>Back</button>
      </NavLink>
      <h1>Flight Details</h1>
      <div className='card'>
        {flight ? (
          <div className='flight-details__header card-body bg-light'>
            <div className='flight-details__header__city'>
              <h5>
                {flight.flightName}{' '}
                {flight.flightDirection === 'D' ? 'To' : 'From'}:
              </h5>
              <h2>{airport}</h2>
            </div>
            <div>
              <div className='flight-details__header__details'>
                <div>
                  <h3> {flight.flightDirection === 'D' ? 'To' : 'From'}:</h3>
                  {city}
                </div>
                <div>
                  <h3>Date:</h3> {getDate()}
                </div>
                <div>
                  <h3> Departure time:</h3>{' '}
                  {flight.actualOffBlockTime
                    ? flight.actualOffBlockTime.slice(11, 16)
                    : flight.scheduleTime.slice(0, 5)}
                </div>
                <div>
                  <h3>Check-in desk:</h3> {getDesks()}
                </div>
                <div>
                  <h3>Status:</h3> {getStatus()}
                </div>
                <div>
                  <h3>Gate:</h3> {flight.gate ? flight.gate : '-'}
                </div>
              </div>

              <NavLink to={`/flights/${flight.id}`} exact>
                <p>Last Updated: {flight.lastUpdatedAt.slice(11, 16)}</p>
              </NavLink>

              <div className='flight-details__header__details2'>
                <h3>Aircraft: {flight.aircraftType?.iataMain}</h3>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FlightDetails;
