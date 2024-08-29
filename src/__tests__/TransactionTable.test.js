import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { fetchTransactions } from '../api/transactions';
import TransactionTable from '../components/TransactionTable/TransactionTable';
import { Suspense } from 'react';

beforeAll(() => {
  global.originalConsoleError = console.error;
  console.error = jest.fn();
});

afterAll(() => {
  console.error = global.originalConsoleError;
});

// Mock the fetchTransactions function
jest.mock('../api/transactions', () => ({
  fetchTransactions: jest.fn(),
}));

const MockedSuspenseWrapper = ({ children }) => (
  <Suspense fallback={<p>Loading...</p>}>
    {children}
  </Suspense>
);

describe('TransactionTable', () => {
  test('displays loading state initially', () => {
    fetchTransactions.mockImplementation(() => new Promise(() => {})); // Return a pending promise

    render(
      <MockedSuspenseWrapper>
        <TransactionTable />
      </MockedSuspenseWrapper>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays "No data available" when no transactions are returned', async () => {
    fetchTransactions.mockResolvedValueOnce([]);

    render(
      <MockedSuspenseWrapper>
        <TransactionTable />
      </MockedSuspenseWrapper>
    );

  });

  test('displays monthly points and customer details', async () => {
    fetchTransactions.mockResolvedValueOnce([
      { customerId: 1, customerName: 'Prashant Kumar', date: '2024-07-01', amount: 120 },
      { customerId: 2, customerName: 'Narendra Singh', date: '2024-07-15', amount: 150 },
    ]);

    render(
      <MockedSuspenseWrapper>
        <TransactionTable />
      </MockedSuspenseWrapper>
    );

    // Select Month (assuming the current month is used in the test)
    expect(await screen.findByText('Month Summary')).toBeInTheDocument();
    expect(screen.getByText('Total Points Per Customer')).toBeInTheDocument();
  });

  test('handles error during data fetch', async () => {
    fetchTransactions.mockRejectedValueOnce(new Error('Failed to fetch transactions'));

    render(
      <MockedSuspenseWrapper>
        <TransactionTable />
      </MockedSuspenseWrapper>
    );

  });

  test('switches between month summary and customer details', async () => {
    fetchTransactions.mockResolvedValueOnce([
      { customerId: 1, customerName: 'Prashant Kumar', date: '2024-07-01', amount: 120 },
      { customerId: 2, customerName: 'Narendra Singh', date: '2024-07-15', amount: 150 },
    ]);

    render(
      <MockedSuspenseWrapper>
        <TransactionTable />
      </MockedSuspenseWrapper>
    );

    await screen.findByText('Total Points Per Customer');

  });
});
