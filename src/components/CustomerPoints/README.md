# CustomerPoints Component

## Overview

The `CustomerPoints` component displays detailed points information for a specific customer for the selected month.

## Features

- **Customer Name**: Shows the name of the customer.
- **Total Points**: Displays the total points earned by the customer.
- **Amount Breakdown**: Provides a breakdown of how the amount was used to calculate points.

## Usage

```jsx
import React from 'react';
import CustomerPoints from './CustomerPoints';

const App = () => (
  <div>
    <CustomerPoints
      customerName="Prashant Kumar"
      points={120}
      month="2024-07"
      amountBreakdown="2x$20 + 1x$50"
    />
  </div>
);

export default App;
