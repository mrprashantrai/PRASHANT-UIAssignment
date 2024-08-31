/**
 * Calculate reward points based on the amount spent.
 * @param {number} amount - The amount spent in the transaction.
 * @returns {number} - The calculated reward points.
 */
export const calculatePoints = (amount) => {
  if (amount > 100) {
    return 2 * (amount - 100) + 50;
  } else if (amount > 50) {
    return 1 * (amount - 50);
  }
  return 0;
};

/**
 * Calculate total amount spent and total points earned from transactions.
 * @param {Array} transactions - An array of transaction objects.
 * @returns {Object} - An object with totalAmountSpent and totalPointsEarned.
 */
export const calculateTotals = (transactions) => {
  return transactions.reduce(
    (totals, transaction) => {
      const points = calculatePoints(transaction.amount);
      return {
        totalAmountSpent: totals.totalAmountSpent + transaction.amount,
        totalPointsEarned: totals.totalPointsEarned + points,
      };
    },
    { totalAmountSpent: 0, totalPointsEarned: 0 }
  );
};
