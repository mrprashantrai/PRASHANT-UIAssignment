import React, { Suspense, useState } from 'react';
import { calculatePoints } from '../../utils/calculatePoints';
import CustomerPoints from '../CustomerPoints/CustomerPoints';
import MonthlyPoints from '../MonthlyPoints/MonthlyPoints';
import { useTransactions } from '../../utils/useTransactions'; 

const TransactionTable = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth()); // Initialize with current month
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [customerPoints, setCustomerPoints] = useState({});

  // Use Suspense for data fetching
  const transactions = useTransactions(selectedMonth);

  // Calculate customer points
  const calculateCustomerPoints = (transactions) => {
    const points = transactions.reduce((acc, { customerId, customerName, amount }) => {
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

    setCustomerPoints(points);
  };

  React.useEffect(() => {
    calculateCustomerPoints(transactions);
  }, [transactions]);

  // Prepare data for MonthlyPoints
  const monthlyData = Object.entries(customerPoints).map(([customerId, { customerName, totalPoints }]) => ({
    customerId,
    customerName,
    totalPoints,
  }));

  // Calculate monthly total points
  const totalAmount = transactions.reduce((sum, { amount }) => sum + amount, 0);
  const totalPoints = transactions.reduce((sum, { amount }) => sum + calculatePoints(amount), 0);

  return (
    <div>
      <div>
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value={getCurrentMonth()}>Current Month</option>
          <option value={getNextMonth()}>Next Month</option>
        </select>
      </div>
      {!showCustomerDetails ? (
        <MonthlyPoints
          month={selectedMonth}
          totalAmount={totalAmount}
          totalPoints={totalPoints}
          customerPoints={monthlyData}
          onCustomerClick={() => setShowCustomerDetails(true)}
        />
      ) : (
        <div>
          <button onClick={() => setShowCustomerDetails(false)}>Back to Month Summary</button>
          {Object.entries(customerPoints).map(([customerId, { customerName, totalPoints, breakdown }]) => (
            <CustomerPoints
              key={customerId}
              customerName={customerName}
              points={totalPoints}
              month={selectedMonth}
              amountBreakdown={breakdown}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Helper functions to get current and next month
const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const getNextMonth = () => {
  const now = new Date();
  const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
  return `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}`;
};

// Wrap your component with Suspense in the parent component
export default function WrappedTransactionTable() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TransactionTable />
    </Suspense>
  );
}
