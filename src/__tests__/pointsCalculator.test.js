import { calculatePoints, calculateTotals } from '../utils/pointsCalculator';

describe('calculatePoints', () => {
  it('calculates points correctly for amounts over $100', () => {
    expect(calculatePoints(120)).toBe(90);  // 2*(120-100) + 50 = 90
    expect(calculatePoints(150)).toBe(150); // 2*(150-100) + 50 = 150
  });

  it('calculates points correctly for amounts between $50 and $100', () => {
    expect(calculatePoints(80)).toBe(30);  // 80-50 = 30
    expect(calculatePoints(75)).toBe(25);  // 75-50 = 25
  });

  it('calculates points correctly for amounts $50 or less', () => {
    expect(calculatePoints(30)).toBe(0);   // 0 points
    expect(calculatePoints(50)).toBe(0);   // 0 points
  });

  it('calculates points correctly for boundary values', () => {
    expect(calculatePoints(51)).toBe(1);   // 51-50 = 1
    expect(calculatePoints(100)).toBe(50); // 2*(100-100) + 50 = 50
  });
});

describe('calculateTotals', () => {
  it('calculates totals correctly for a list of transactions', () => {
    const transactions = [
      { amount: 120 }, // 90 points
      { amount: 80 },  // 30 points
      { amount: 30 }   // 0 points
    ];

    const result = calculateTotals(transactions);
    expect(result.totalAmountSpent).toBe(230); // 120 + 80 + 30
    expect(result.totalPointsEarned).toBe(120); // 90 + 30 + 0
  });

  it('returns zeros for an empty list of transactions', () => {
    const result = calculateTotals([]);
    expect(result.totalAmountSpent).toBe(0);
    expect(result.totalPointsEarned).toBe(0);
  });

  it('calculates totals correctly for transactions with edge case amounts', () => {
    const transactions = [
      { amount: 51 },  // 1 point
      { amount: 50 },  // 0 points
      { amount: 101 }  // 52 points
    ];

    const result = calculateTotals(transactions);
    expect(result.totalAmountSpent).toBe(202); // 51 + 50 + 101
    expect(result.totalPointsEarned).toBe(53); // 1 + 0 + 52
  });
});
