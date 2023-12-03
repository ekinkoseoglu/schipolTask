import React from 'react';

const DateSelect = ({ dates, selectDateHandler }) => {
  const dateOptions = dates.map((date) => {
    const currentDate = new Date();
    const tomorrow = new Date(Number(currentDate));
    tomorrow.setDate(tomorrow.getDate() + date);

    const formattedDate =
      date === 0
        ? 'Today'
        : date === 1
        ? 'Tomorrow'
        : tomorrow.getDate() +
          ' ' +
          tomorrow.toLocaleString('en-us', { month: 'short' });

    return (
      <option key={date} value={date}>
        {formattedDate}
      </option>
    );
  });
  return (
    <div>
      <strong>Date</strong>
      <select
        className='mx-2'
        name='date'
        id='date'
        onChange={(e) => selectDateHandler(e)}
      >
        {dateOptions}
      </select>
    </div>
  );
};

export default DateSelect;
