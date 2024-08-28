/**
 * Calculate reward points based on the amount spent.
 * @param {number} amount - The amount spent in a transaction.
 * @returns {number} - The calculated reward points.
 */
export const calculatePoints = (amount) => {
    if (amount <= 0) return 0;
  
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2; // Points for amount above $100
      points += 50; // Points for the first $50-$100
    } else if (amount > 50) {
      points += (amount - 50); // Points for amount between $50 and $100
    }
    return points;
  };
  