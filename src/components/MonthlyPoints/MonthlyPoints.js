import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component to display points for each customer for the entire period.
 * @param {Object} props
 * @param {Array} props.customerPoints - Array of customer points data.
 */
const MonthlyPoints = ({ customerPoints }) => (
  <div>
    <h2>Total Points Per Customer</h2>
    {customerPoints.map(({ customerId, customerName, totalPoints }) => (
      <div key={customerId} className="monthly-points">
        <h3>Customer ID: {customerId}</h3>
        <p>Name: {customerName}</p>
        <p>Total Points: {totalPoints}</p>
      </div>
    ))}
  </div>
);

MonthlyPoints.propTypes = {
  customerPoints: PropTypes.arrayOf(PropTypes.shape({
    customerId: PropTypes.number.isRequired,
    customerName: PropTypes.string.isRequired,
    totalPoints: PropTypes.number.isRequired,
  })).isRequired,
};

export default MonthlyPoints;
