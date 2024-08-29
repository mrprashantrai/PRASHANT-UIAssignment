// useTransactions.js
import { fetchTransactions } from "../api/transactions";

// Create a cache to store transactions
const cache = new Map();

export function useTransactions(selectedMonth) {
  if (cache.has(selectedMonth)) {
    return cache.get(selectedMonth);
  }

  let promise = fetchTransactions(selectedMonth).then(data => {
    cache.set(selectedMonth, data);
    return data;
  });

  throw promise; // Throw the promise to suspend
}
