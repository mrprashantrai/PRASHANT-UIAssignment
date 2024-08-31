import React from 'react';
import './styles.css'; // Import the CSS file

const MonthSelector = ({ onMonthChange, currentDate }) => {
  const handleChange = (event) => {
    const newDate = new Date(currentDate);
    const { value } = event.target;

    if (value === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (value === 'next') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (value === 'current') {
      newDate.setMonth(new Date().getMonth());
    }
    
    onMonthChange(newDate);
  };

  return (
    <div className="month-selector">
      <label htmlFor="month-select">Select Month: </label>
      <select id="month-select" onChange={handleChange}>
        <option value="prev">Previous Month</option>
        <option value="current">Current Month</option>
        <option value="next">Next Month</option>
      </select>
    </div>
  );
};

export default MonthSelector;
