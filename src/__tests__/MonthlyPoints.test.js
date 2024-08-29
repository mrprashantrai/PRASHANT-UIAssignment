// __tests__/MonthlyPoints.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthlyPoints from '../components/MonthlyPoints/MonthlyPoints';

beforeAll(() => {
  global.originalConsoleError = console.error;
  console.error = jest.fn();
});

afterAll(() => {
  console.error = global.originalConsoleError;
});

describe('MonthlyPoints', () => {
  const mockData = {
    month: '2024-07',
    totalAmount: 270,
    totalPoints: 170,
    customerPoints: [
      { customerId: 1, customerName: 'Prashant Kumar', totalPoints: 120 },
      { customerId: 2, customerName: 'Narendra Singh', totalPoints: 150 },
    ],
    onCustomerClick: jest.fn(),
  };

  test('displays month summary and customer points', () => {
    render(<MonthlyPoints {...mockData} />);

    expect(screen.getByText('Month Summary')).toBeInTheDocument();
    expect(screen.getByText('Total Amount: $270.00')).toBeInTheDocument();
    expect(screen.getByText('Total Points: 170')).toBeInTheDocument();
    expect(screen.getByText('Total Points Per Customer')).toBeInTheDocument();
    expect(screen.getByText('Prashant Kumar')).toBeInTheDocument();
    expect(screen.getByText('Narendra Singh')).toBeInTheDocument();
  });

});
