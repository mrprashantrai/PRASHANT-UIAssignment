# Components

This folder contains React components used throughout the application. Each component is responsible for rendering a part of the UI and managing its internal state if necessary.

## Folder Structure

- **TransactionList/**: Displays a list of transactions for each customer.
- **MonthlyTransactions/**: Manages and displays transactions for a selected month.
- **MonthSelector/**: Provides a dropdown to select the month for filtering transactions.

## Usage

To use a component, import it into your React file like so:

```jsx
import TransactionList from './components/TransactionList';
import MonthlyTransactions from './components/MonthlyTransactions';
import MonthSelector from './components/MonthSelector';
