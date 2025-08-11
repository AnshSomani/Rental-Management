// client/src/components/RentalCalendar.jsx
import React, { useState } from 'react';

const RentalCalendar = ({ onDateSelect }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date > startDate) {
      setEndDate(date);
      onDateSelect(startDate, date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const getDays = () => {
    // This is a simplified calendar for demonstration
    const today = new Date();
    const days = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {getDays().map(day => (
        <div 
          key={day.toISOString()}
          onClick={() => handleDateClick(day)}
          style={{ 
            padding: '10px', 
            margin: '5px', 
            border: '1px solid #ccc', 
            backgroundColor: (startDate && endDate && day >= startDate && day <= endDate) ? 'lightblue' : 'white',
            cursor: 'pointer',
          }}
        >
          {day.getDate()}
        </div>
      ))}
    </div>
  );
};

export default RentalCalendar;