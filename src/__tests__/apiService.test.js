import { fetchTransactions } from '../services/apiService';

beforeAll(() => {
  global.originalConsoleError = console.error;
  console.error = jest.fn();
});

afterAll(() => {
  console.error = global.originalConsoleError;
});

describe('fetchTransactions', () => {
  it('fetches transactions data successfully', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({transactions:[
          { customerId: 1, customerName: 'Amit Sharma', date: '2024-07-01', amount: 120 }
        ]}),
      })
    );

    const transactionData = await fetchTransactions();
    // Since fetchTransactions returns an array of transactions
    expect(transactionData).toEqual([
      { customerId: 1, customerName: 'Amit Sharma', date: '2024-07-01', amount: 120 }
    ]);
  });

  it('handles fetch errors', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Network error',
      })
    );

    const transactionData = await fetchTransactions();
    // When there is an error, fetchTransactions should return an empty array
    expect(transactionData).toEqual([]);
  });

  it('handles invalid data structure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ notTransactions: [] }),
      })
    );

    const transactionData = await fetchTransactions();
    // When data is not in the expected format, fetchTransactions should return an empty array
    expect(transactionData).toEqual([]);
  });
});
