# MonthlyPoints Component

## Overview

The `MonthlyPoints` component shows a summary of total points and amounts for each customer for the selected month. It includes a button to view detailed customer points.

## Features

- **Month Summary**: Displays total amount and total points for the month.
- **Customer Points**: Lists total points per customer.
- **Interactions**: Users can click to view detailed points for each customer.

## Usage

```jsx
import React from 'react';
import MonthlyPoints from './MonthlyPoints';

const App = () => {
  const handleCustomerClick = (customerId) => {
    // Handle customer click
  };

  return (
    <MonthlyPoints
      month="2024-07"
      totalAmount={270}
      totalPoints={170}
      customerPoints={[
        { customerId: 1, customerName: 'Prashant Kumar', totalPoints: 120 },
        { customerId: 2, customerName: 'Narendra Singh', totalPoints: 150 },
      ]}
      onCustomerClick={handleCustomerClick}
    />
  );
};

export default App;
