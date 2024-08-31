// src/services/apiService.js
export const fetchTransactions = async () => {
    try {
      const response = await fetch('/dataFiles/transactions.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      // Log the fetched data for debugging
      //console.log('Fetched data:', data);
      
      // Ensure data is an array
      if (Array.isArray(data.transactions)) {
        return data.transactions;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  };
  