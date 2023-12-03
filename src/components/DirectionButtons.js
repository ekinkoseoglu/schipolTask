import React from 'react';

const DirectionButtons = ({ direction, changeDirection, currentDate }) => {
  return (
    <div>
      <div className='d-flex justify-content-center my-3'>
        <button
          type='button'
          className={`${
            direction === 'A' ? 'destButton' : 'destButton active'
          }`}
          onClick={(e) => changeDirection('D')}
        >
          Departures
        </button>
        <button
          type='button'
          className={`${
            direction === 'D' ? 'destButton' : 'destButton active'
          }`}
          onClick={(e) => changeDirection('A')}
        >
          Arrivals
        </button>
      </div>
      <strong>
        {currentDate.getDate() +
          ' ' +
          currentDate.toLocaleString('en-us', { month: 'short' })}
      </strong>
    </div>
  );
};

export default DirectionButtons;
