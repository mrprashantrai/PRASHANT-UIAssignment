// __tests__/CustomerPoints.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerPoints from '../components/CustomerPoints/CustomerPoints';

beforeAll(() => {
  global.originalConsoleError = console.error;
  console.error = jest.fn();
});

afterAll(() => {
  console.error = global.originalConsoleError;
});

describe('CustomerPoints', () => {
  const mockProps = {
    customerName: 'Prashant Kumar',
    points: 120,
    month: '2024-07',
    amountBreakdown: '2x$20 + 1x$50',
  };

  test('displays customer points information', () => {
    render(<CustomerPoints {...mockProps} />);

    expect(screen.getByText('Prashant Kumar')).toBeInTheDocument();
    expect(screen.getByText('Month: 2024-07')).toBeInTheDocument();
    expect(screen.getByText('Total Points: 120')).toBeInTheDocument();
    expect(screen.getByText('Amount Breakdown: 2x$20 + 1x$50')).toBeInTheDocument();
  });
});
