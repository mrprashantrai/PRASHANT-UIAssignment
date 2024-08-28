import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TransactionTable from '../components/TransactionTable/TransactionTable';
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


test('renders TransactionTable with transactions data', async () => {
  // Mocking the API response
  fetchTransactions.mockResolvedValue([
    { customerId: 1, customerName: 'Prashant Kumar', date: '2024-06-01', amount: 120 },
    { customerId: 1, customerName: 'Prashant Kumar', date: '2024-07-15', amount: 80 },
    { customerId: 2, customerName: 'Narendra Singh', date: '2024-07-01', amount: 150 },
    { customerId: 2, customerName: 'Narendra Singh', date: '2024-08-10', amount: 60 },
    { customerId: 3, customerName: 'Ananya Patel', date: '2024-05-20', amount: 200 },
    { customerId: 3, customerName: 'Ananya Patel', date: '2024-06-25', amount: 90 },
    { customerId: 4, customerName: 'Ravi Sharma', date: '2024-07-30', amount: 75 },
    { customerId: 4, customerName: 'Ravi Sharma', date: '2024-08-15', amount: 130 },
    { customerId: 5, customerName: 'Amit Verma', date: '2024-06-10', amount: 55 },
    { customerId: 5, customerName: 'Amit Verma', date: '2024-08-01', amount: 110 },
  ]);

  render(<TransactionTable />);

  // Ensure the loading state is displayed
  expect(screen.getByText(/Loading.../)).toBeInTheDocument();

  // Wait for data to load and verify it is displayed
  await waitFor(() => {
    expect(screen.getByText(/Prashant Kumar/)).toBeInTheDocument();
    expect(screen.getByText(/Narendra Singh/)).toBeInTheDocument();
    expect(screen.getByText(/Ananya Patel/)).toBeInTheDocument();
    expect(screen.getByText(/Ravi Sharma/)).toBeInTheDocument();
    expect(screen.getByText(/Amit Verma/)).toBeInTheDocument();
  });
});
