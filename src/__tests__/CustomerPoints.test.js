import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import CustomerPoints from '../components/CustomerPoints/CustomerPoints';

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
  

describe('CustomerPoints Component', () => {
  test('renders customer points correctly', () => {
    // Arrange: Set up props
    const props = {
      customerName: 'Prashant',
      points: 150,
      month: 'August',
      amountBreakdown: 'Purchase of electronics'
    };

    // Act: Render the component with props
    render(<CustomerPoints {...props} />);

    // Assert: Check if elements are rendered with correct content
    expect(screen.getByText(/Prashant/i)).toBeInTheDocument();
    expect(screen.getByText(/Month: August/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Points: 150/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount Breakdown: Purchase of electronics/i)).toBeInTheDocument();
  });
});
