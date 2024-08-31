import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/apiService';
import { calculatePoints } from '../utils/pointsCalculator';
import TransactionList from './TransactionList';
import MonthSelector from './MonthSelector';
import './styles.css'; // Import the CSS file

const MonthlyTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const data = await fetchTransactions();
        if (!Array.isArray(data)) {
          console.error('Transactions is not an array:', data);
          setTransactions([]);
        } else {
          setTransactions(data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
      }
      setLoading(false); // Set loading to false here
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    const filterTransactions = () => {
      if (loading) return;

      // Check if transactions is an array
      if (!Array.isArray(transactions)) {
        console.error('Transactions is not an array:', transactions);
        setFilteredTransactions([]);
        return;
      }

      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1; // months are 0-based

      const filtered = transactions
        .filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.getFullYear() === year &&
            transactionDate.getMonth() + 1 === month
          );
        })
        .map(transaction => ({
          ...transaction,
          points: calculatePoints(transaction.amount)
        }));

      setFilteredTransactions(filtered);
    };

    filterTransactions();
  }, [selectedDate, transactions, loading]);

  const handleMonthChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate);

  return (
    <div className="monthly-transactions-container">
      <h1>Monthly Transactions</h1>
      <MonthSelector onMonthChange={handleMonthChange} currentDate={selectedDate} />
      <div className="month-header">
        <h2>{`${monthName} ${selectedDate.getFullYear()}`}</h2>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : filteredTransactions.length === 0 ? (
        <p>No transactions available</p>
      ) : (
        <TransactionList transactions={filteredTransactions} />
      )}
    </div>
  );
};

export default MonthlyTransactions;
