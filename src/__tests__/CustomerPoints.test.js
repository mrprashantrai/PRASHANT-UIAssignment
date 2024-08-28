import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerPoints from '../components/CustomerPoints/CustomerPoints';
import { fetchTransactions } from '../api/transactions';

// Mock the fetchTransactions API call
jest.mock('../api/transactions');


beforeAll(() => {
    global.console = {
      ...console,
      error: jest.fn(),
    };
  });
  
  afterAll(() => {
    global.console.error = console.error;
  });
  

test('logs rendered output for debugging', () => {
  // Render the CustomerPoints component with mock data
  const { container } = render(
    <CustomerPoints
      customerName="Prashant Kumar"
      points={90}
      month="July 2024"
      amountBreakdown="2x$20 + 1x$50"
    />
  );

  // Log the entire HTML output
  console.log(container.innerHTML);
});
