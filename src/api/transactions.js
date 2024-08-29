// Mocking API response with a promise
export const fetchTransactions = (selectedMonth) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data includes transactions for various months
      const transactions = [
        { customerId: 1, customerName: 'Prashant Kumar', date: '2024-06-01', amount: 120 },
        { customerId: 1, customerName: 'Prashant Kumar', date: '2024-07-15', amount: 80 },
        { customerId: 2, customerName: 'Narendra Singh', date: '2024-07-01', amount: 150 },
        { customerId: 2, customerName: 'Narendra Singh', date: '2024-08-10', amount: 60 },
        { customerId: 3, customerName: 'Ananya Patel', date: '2024-05-20', amount: 200 },
        { customerId: 3, customerName: 'Ananya Patel', date: '2024-06-25', amount: 90 },
        { customerId: 4, customerName: 'Ravi Sharma', date: '2024-07-30', amount: 75 },
        { customerId: 4, customerName: 'Ravi Sharma', date: '2024-08-15', amount: 130 },
        { customerId: 5, customerName: 'Amit Verma', date: '2024-06-10', amount: 55 },
        { customerId: 5, customerName: 'Amit Verma', date: '2024-08-01', amount: 110 },
        // Adding transactions for the next month (e.g., September 2024)
        { customerId: 6, customerName: 'Sonia Mehta', date: '2024-09-05', amount: 95 },
        { customerId: 6, customerName: 'Sonia Mehta', date: '2024-09-20', amount: 70 },
        { customerId: 7, customerName: 'Raj Patel', date: '2024-09-12', amount: 120 },
        { customerId: 7, customerName: 'Raj Patel', date: '2024-09-25', amount: 85 },
      ];

      // Filter transactions based on the selected month
      const filteredTransactions = transactions.filter(transaction =>
        transaction.date.startsWith(selectedMonth)
      );

      resolve(filteredTransactions);
    }, 1000); // Simulate network delay
  });
};
