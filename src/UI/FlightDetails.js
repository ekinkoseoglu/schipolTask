import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './FlightDetails.css';

const FlightDetails = () => {
  // Access the flight ID from the URL parameter react-router-dom
  const flightId = useParams().flightId;

  useEffect(() => {
    // Fetch the flight details based on flightId from your API or state
    // Example: You can use flightId to fetch the specific flight details
    axios
      .get(`/flights/${flightId}`, {
        headers: {
          Accept: 'application/json',
          app_id: 'b1a06b6e',
          app_key: 'aa28d83034a1edc1f9a07b340847013c',
          ResourceVersion: 'v4',
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, [flightId]);

  // Fetch the flight details based on flightId from your API or state
  // Example: You can use flightId to fetch the specific flight details
  // const [flightDetails, setFlightDetails] = useState(null);
  // useEffect(() => {
  //   axios.get(`/flights/${flightId}`).then((res) => {
  //     setFlightDetails(res.data);
  //   });
  // }, [flightId]);

  return (
    <section class='flights-list'>
      <article class='flight-card flights-list__item'>
        <div class='flight-card__airlines'>
          <div class='flight-card__airline'>
            <img src='//unsplash.it/30/30' alt='' />
          </div>

          <div class='flight-card__airline'>
            <img src='//unsplash.it/30/30' alt='' />
          </div>
        </div>
        <div class='flight-card__departure'>
          <time class='flight-card__time'>10:30 AM</time>
          <h2 class='flight-card__city'>Barcelona</h2>
          <time class='flight-card__day'>Tuesday, Apr 21, 2020</time>
        </div>

        <div class='flight-card__route'>
          <p class='flight-card__duration'>1hr 50m</p>
          <div class='flight-card__route-line route-line' aria-hidden='true'>
            <div
              class='route-line__stop route-line__start'
              aria-hidden='true'
            ></div>

            <div
              class='route-line__stop route-line__end'
              aria-hidden='true'
            ></div>
          </div>

          <p class='flight-card__type'>Non-stop</p>
        </div>
        <div class='flight-card__arrival'>
          <time class='flight-card__time'>10:30 AM</time>
          <h2 class='flight-card__city'>Rome</h2>
          <time class='flight-card__day'>Tuesday, Apr 21, 2020</time>
        </div>

        <div class='flight-card__action'>
          <p class='flight-card__price styled-price'>
            <sup>$</sup>93<sub>USD</sub>
          </p>
          <button class='flight-card__cta button button--orange'>Select</button>
        </div>
      </article>
    </section>
  );
};

export default FlightDetails;
