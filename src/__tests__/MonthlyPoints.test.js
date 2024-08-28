import React from 'react';
import { render } from '@testing-library/react';
import MonthlyPoints from '../components/MonthlyPoints/MonthlyPoints';

beforeAll(() => {
  global.console = {
    ...console,
    error: jest.fn(),
  };
});

afterAll(() => {
  global.console.error = console.error;
});


test('renders MonthlyPoints with given customer details', () => {
  const customerPoints = [
    { customerId: 1, customerName: 'Alice Johnson', totalPoints: 150 },
    { customerId: 2, customerName: 'Bob Smith', totalPoints: 100 },
  ];

  const { getByText } = render(<MonthlyPoints customerPoints={customerPoints} />);
  
  expect(getByText(/Customer ID: 1/)).toBeInTheDocument();
  expect(getByText(/Name: Alice Johnson/)).toBeInTheDocument();
  expect(getByText(/Total Points: 150/)).toBeInTheDocument();
  expect(getByText(/Customer ID: 2/)).toBeInTheDocument();
  expect(getByText(/Name: Bob Smith/)).toBeInTheDocument();
  expect(getByText(/Total Points: 100/)).toBeInTheDocument();
});
