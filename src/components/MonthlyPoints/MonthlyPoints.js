import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component to display points for each customer for the entire period.
 * @param {Object} props
 * @param {string} props.month - The month for which points are displayed.
 * @param {number} props.totalAmount - The total amount spent in the month.
 * @param {number} props.totalPoints - The total points earned in the month.
 * @param {Array} props.customerPoints - Array of customer points data.
 * @param {Function} props.onCustomerClick - Callback function to handle showing customer details.
 */
const MonthlyPoints = ({ month, totalAmount, totalPoints, customerPoints, onCustomerClick }) => (
  <div>
    <h2>Month Summary</h2>
    <p>Month: {getMonthName(month)}</p>
    <p>Total Amount: ${totalAmount.toFixed(2)}</p>
    <p>Total Points: {totalPoints}</p>
    <h3>Total Points Per Customer</h3>
    {customerPoints.map(({ customerId, customerName, totalPoints }) => (
      <div key={customerId} className="monthly-points">
        <h4>{customerName}</h4>
        <p>Total Points: {totalPoints}</p>
        <button onClick={onCustomerClick}>Show Details</button>
      </div>
    ))}
  </div>
);

MonthlyPoints.propTypes = {
  month: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  totalPoints: PropTypes.number.isRequired,
  customerPoints: PropTypes.arrayOf(PropTypes.shape({
    customerId: PropTypes.number.isRequired,
    customerName: PropTypes.string.isRequired,
    totalPoints: PropTypes.number.isRequired,
  })).isRequired,
  onCustomerClick: PropTypes.func.isRequired,
};

// Helper function to get month name from date string
const getMonthName = (month) => {
  const [year, monthIndex] = month.split('-').map(Number);
  return new Date(year, monthIndex - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
};

export default MonthlyPoints;
