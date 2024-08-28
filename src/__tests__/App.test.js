import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';


beforeAll(() => {
  global.originalConsoleError = console.error;
  console.error = jest.fn();
});

afterAll(() => {
  console.error = global.originalConsoleError;
});

test('renders Customer Reward Points', () => {
  render(<App />);
  const linkElement = screen.getByText(/Customer Reward Points/i);
  expect(linkElement).toBeInTheDocument();
});
