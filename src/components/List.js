import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

const List = () => {
  const [flights, setFlights] = useState([]);
  const [direction, setDirection] = useState('D');
  const [isLoading, setIsLoading] = useState(false);
  const [pageList, setPageList] = useState(0);
  const listRef = useRef(null);
  const previousScrollPosition = useRef(0);

  const now = new Date();
  const tomorrow = new Date(Number(now));
  tomorrow.setDate(tomorrow.getDate() + 1);

  const getFlights = () => {
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
        console.log(res.data.flights);
        setFlights((prev) =>
          pageList === 0 ? res.data.flights : [...prev, ...res.data.flights]
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (pageList === 0) {
      setIsLoading(true);
    }

    getFlights();
  }, [direction, pageList]);

  const changeDirection = (mode) => {
    setDirection(mode);
    setPageList(0);
    setFlights([]);
  };

  const pageListHandler = () => {
    setPageList((prev) => prev + 1);
    previousScrollPosition.current = listRef.current.scrollTop;
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = previousScrollPosition.current;
    }
  }, [flights]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (e.target.flightNumber.value) {
      setIsLoading(true);
      axios
        .get(`/flights?flightName=${e.target.flightNumber.value}`, {
          headers: {
            Accept: 'application/json',
            app_id: 'b1a06b6e',
            app_key: 'aa28d83034a1edc1f9a07b340847013c',
            ResourceVersion: 'v4',
          },
        })
        .then((res) => {
          console.log(res.data.flights);
          setFlights(res.data.flights);
          setIsLoading(false);
        });

      return;
    } else {
      getFlights();
    }
  };
  return (
    <div>
      <h1>Flights</h1>

      <div className='container' ref={listRef}>
        <form onSubmit={submitHandler}>
          <label htmlFor='flightNumber'>Flight Number</label>
          <input type='text' name='flightNumber' id='flightNumber' />
          <button type='submit'>Search</button>
        </form>

        <div>
          <button onClick={(e) => changeDirection('D')}>Departures</button>
          <button onClick={(e) => changeDirection('A')}>Arrivals</button>
        </div>

        <strong>
          {now.getDate() +
            ' ' +
            now.toLocaleString('en-us', { month: 'short' })}
        </strong>

        {flights.map((flight) => (
          <Link
            to={`/flights/${flight.id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Card flight={flight} direction={direction} />
          </Link>
        ))}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <button
            onClick={pageListHandler}
            disabled={isLoading}
            className='btn btn-dark w-100'
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
