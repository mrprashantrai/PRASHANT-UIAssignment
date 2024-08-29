# TransactionTable Component

## Overview

The `TransactionTable` component displays transactions and calculates customer points for the selected month. It allows users to view monthly summaries and detailed customer points, and handle different states such as loading, error, and no data available.

## Features

- **Month Selection**: Users can select a month to view transactions.
- **Monthly Summary**: Displays total points and amount for each customer for the selected month.
- **Customer Details**: Provides detailed points information for individual customers.
- **Error Handling**: Displays appropriate messages if data fetching fails or if no data is available.

## Usage

```jsx
import React from 'react';
import TransactionTable from './TransactionTable';

const App = () => (
  <div>
    <TransactionTable />
  </div>
);
0
export default App;
