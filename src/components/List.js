import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import './List.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DateSelect from './DateSelect';
import FlightSearchForm from './FlightSearchForm';
import DirectionButtons from './DirectionButtons';

const List = () => {
  const [flights, setFlights] = useState([]);
  const [direction, setDirection] = useState('D');
  const [isLoading, setIsLoading] = useState(false);
  const [pageList, setPageList] = useState(0);
  const listRef = useRef(null);
  const previousScrollPosition = useRef(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  const dates = [0, 1, 2, 3, 4, 5, 6, 7];

  const date = new Date();

  const getFlights = (direction, date, pageList) => {
    const tomorrow = new Date(Number(date));
    tomorrow.setDate(tomorrow.getDate() + 1);
    const url = `/flights?flightDirection=${direction}&fromDateTime=${
      date.toJSON().split('.')[0]
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

    getFlights(direction, currentDate, pageList);
  }, [direction, pageList, currentDate]);

  const changeDirection = (mode) => {
    setDirection(mode);
  };

  const selectDateHandler = (e) => {
    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + Number(e.target.value));
    setCurrentDate(selectedDate);
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

  const submitHandler = (flightNumber) => {
    if (flightNumber) {
      setIsLoading(true);
      axios
        .get(`/flights?flightName=${flightNumber}`, {
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
    } else {
      return;
    }
  };

  return (
    <div>
      <h1>Flights</h1>

      <div className='container' ref={listRef}>
        <div className='d-flex justify-content-between'>
          <DateSelect dates={dates} selectDateHandler={selectDateHandler} />
          <FlightSearchForm handleSearch={submitHandler} />
        </div>

        <DirectionButtons
          currentDate={currentDate}
          direction={direction}
          changeDirection={changeDirection}
        />

        {flights.map((flight) => (
          <Link
            to={`/flights/${flight.id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
            key={flight.id}
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
