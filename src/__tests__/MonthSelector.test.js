import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthSelector from '../components/MonthSelector';

beforeAll(() => {
    global.originalConsoleError = console.error;
    console.error = jest.fn();
  });
  
  afterAll(() => {
    console.error = global.originalConsoleError;
  });
  

describe('MonthSelector', () => {
  it('renders correctly and handles month change', () => {
    const onMonthChange = jest.fn();
    render(<MonthSelector onMonthChange={onMonthChange} currentDate={new Date()} />);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'next' } });
    
    expect(onMonthChange).toHaveBeenCalledWith(expect.any(Date));
  });
});
