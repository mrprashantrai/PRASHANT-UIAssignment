import React from 'react';
import MonthlyTransactions from './components/MonthlyTransactions';
import ErrorBoundary from './components/ErrorBoundry';

/**
 * Main App component to render the transaction table.
 */
const App = () => (
  <ErrorBoundary>
    <div>
      <h1>Customer Reward Points</h1>
      <MonthlyTransactions />
    </div>
  </ErrorBoundary>
);

export default App;
