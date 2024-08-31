import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MonthlyTransactions from '../components/MonthlyTransactions';
import { fetchTransactions } from '../services/apiService';
import { calculatePoints } from '../utils/pointsCalculator';

jest.mock('../services/apiService');
jest.mock('../utils/pointsCalculator');

beforeAll(() => {
  global.originalConsoleError = console.error;
  console.error = jest.fn();
});

afterAll(() => {
  console.error = global.originalConsoleError;
});

describe('MonthlyTransactions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('displays loading message while transactions are loading', async () => {
    fetchTransactions.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve([]), 1000)));

    render(<MonthlyTransactions />);

    // Ensure "Loading..." is initially displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for loading to finish and the component to update
    await waitFor(() => {
      // Verify that "Loading..." is no longer displayed
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('displays transaction details for the selected month', async () => {
    fetchTransactions.mockResolvedValue([
      { customerId: 1, customerName: 'Amit Sharma', date: '2024-07-01', amount: 120 },
      { customerId: 1, customerName: 'Amit Sharma', date: '2024-07-15', amount: 80 }
    ]);
    calculatePoints.mockImplementation(amount => amount > 100 ? (2 * (amount - 100) + 50) : (amount > 50 ? (amount - 50) : 0));

    render(<MonthlyTransactions />);

    await waitFor(() => {
      expect(screen.getByText('Monthly Transactions')).toBeInTheDocument();
      expect(screen.getByText('Select Month:')).toBeInTheDocument();
    });

    // Simulate month selection
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2024-08-01' } });

    await waitFor(() => {
      // Verify that no transactions are displayed for August
      expect(screen.getByText('No transactions available')).toBeInTheDocument();
    });
  });

  it('handles empty transactions list', async () => {
    fetchTransactions.mockResolvedValue([]);
    calculatePoints.mockImplementation(amount => 0);

    render(<MonthlyTransactions />);

    await waitFor(() => {
      expect(screen.getByText('No transactions available')).toBeInTheDocument();
    });
  });

  it('handles non-array transactions response gracefully', async () => {
    fetchTransactions.mockResolvedValue("Not an array");
    calculatePoints.mockImplementation(amount => 0);

    render(<MonthlyTransactions />);

    await waitFor(() => {
      expect(screen.getByText('No transactions available')).toBeInTheDocument();
    });
  });

  it('updates transactions when the month is changed', async () => {
    fetchTransactions.mockResolvedValue([
      { customerId: 1, customerName: 'Amit Sharma', date: '2024-07-01', amount: 120 },
      { customerId: 1, customerName: 'Amit Sharma', date: '2024-08-01', amount: 80 }
    ]);
    calculatePoints.mockImplementation(amount => amount > 100 ? (2 * (amount - 100) + 50) : (amount > 50 ? (amount - 50) : 0));

    render(<MonthlyTransactions />);

    await waitFor(() => {
      expect(screen.getByText('Monthly Transactions')).toBeInTheDocument();
    });

    // Simulate changing the month
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2024-08-01' } });

    await waitFor(() => {
      // Verify that August transactions are displayed
      expect(screen.getByText('Amit Sharma')).toBeInTheDocument();
      expect(screen.queryByText('July')).not.toBeInTheDocument(); // Ensure July data is not displayed
    });
  });
});
