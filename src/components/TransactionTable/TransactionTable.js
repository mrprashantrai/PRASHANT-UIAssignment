import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../../api/transactions';
import { calculatePoints } from '../../utils/calculatePoints';
import CustomerPoints from '../CustomerPoints/CustomerPoints';

/**
 * Component to display all transactions and calculate points.
 */
const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };
    
    getTransactions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const customerPoints = transactions.reduce((acc, { customerId, customerName, amount }) => {
    const points = calculatePoints(amount);
    let breakdown = '';
    
    if (amount > 100) {
      breakdown = `2x$${amount - 100} + 1x$50`;
    } else if (amount > 50) {
      breakdown = `1x$${amount - 50}`;
    }
    
    if (!acc[customerId]) {
      acc[customerId] = { customerName, totalPoints: 0, breakdown: '' };
    }
    acc[customerId].totalPoints += points;
    acc[customerId].breakdown = breakdown;
    
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(customerPoints).map(([customerId, { customerName, totalPoints, breakdown }]) => (
        <CustomerPoints
          key={customerId}
          customerName={customerName}
          points={totalPoints}
          month="August 2024"
          amountBreakdown={breakdown}
        />
      ))}
    </div>
  );
};

export default TransactionTable;
