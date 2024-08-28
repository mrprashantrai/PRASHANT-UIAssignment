import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component to display points earned by a customer for a given month.
 * @param {Object} props
 * @param {string} props.customerName - The name of the customer.
 * @param {number} props.points - The total points for the customer in the month.
 * @param {string} props.month - The month for which points are displayed.
 * @param {string} props.amountBreakdown - The breakdown of the amount used for calculation.
 */
const CustomerPoints = ({ customerName, points, month, amountBreakdown }) => (
  <div className="customer-points">
    <h3>{customerName}</h3>
    <p>Month: {month}</p>
    <p>Total Points: {points}</p>
    <p>Amount Breakdown: {amountBreakdown}</p>
  </div>
);

CustomerPoints.propTypes = {
  customerName: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  amountBreakdown: PropTypes.string.isRequired,
};

export default CustomerPoints;
