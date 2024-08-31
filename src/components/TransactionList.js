import React from 'react';
import './styles.css'; // Import the CSS file

/**
 * Group transactions by customer and calculate total amount and points.
 * @param {Array} transactions - An array of transaction objects.
 * @returns {Object} - An object where keys are customer names and values are objects with totalAmountSpent and totalPointsEarned.
 */
const groupByCustomer = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const { customerName, amount, points } = transaction;

    if (!acc[customerName]) {
      acc[customerName] = { totalAmountSpent: 0, totalPointsEarned: 0 };
    }

    acc[customerName].totalAmountSpent += amount;
    acc[customerName].totalPointsEarned += points;

    return acc;
  }, {});
};

const TransactionList = ({ transactions }) => {
  // Group transactions by customer
  const customerGroups = groupByCustomer(transactions);

  return (
    <div className="transaction-list">
      {Object.keys(customerGroups).map(customerName => (
        <div className="transaction-card" key={customerName}>
          <h3>{customerName}</h3>
          <p><strong>Total Amount Spent:</strong> ${customerGroups[customerName].totalAmountSpent.toFixed(2)}</p>
          <p><strong>Total Points Earned:</strong> {customerGroups[customerName].totalPointsEarned}</p>
          <div className="transactions">
            {transactions
              .filter(transaction => transaction.customerName === customerName)
              .map(transaction => (
                <div className="transaction-detail" key={transaction.date}>
                  <p><strong>Amount:</strong> ${transaction.amount}</p>
                  <p><strong>Date:</strong> {transaction.date}</p>
                  <p><strong>Points:</strong> {transaction.points}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
