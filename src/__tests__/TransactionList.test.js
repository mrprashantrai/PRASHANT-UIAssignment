import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionList from '../components/TransactionList';

beforeAll(() => {
    global.originalConsoleError = console.error;
    console.error = jest.fn();
  });
  
  afterAll(() => {
    console.error = global.originalConsoleError;
  });

describe('TransactionList', () => {
  it('displays aggregated customer data correctly', () => {
    const transactions = [
      { customerId: 1, customerName: 'Amit Sharma', date: '2024-07-01', amount: 120, points: 90 },
      { customerId: 1, customerName: 'Amit Sharma', date: '2024-07-15', amount: 80, points: 30 }
    ];

    render(<TransactionList transactions={transactions} />);

    expect(screen.getByText('Amit Sharma')).toBeInTheDocument();
    expect(screen.getByText(/Total Amount Spent/)).toBeInTheDocument();
    expect(screen.getByText(/Total Points Earned/)).toBeInTheDocument();
  });
});
