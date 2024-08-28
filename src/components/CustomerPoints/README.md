# CustomerPoints Component

## Description
Displays reward points for a customer for a given month along with the customer's name and amount breakdown.

## Props
- `customerName` (string): Name of the customer.
- `points` (number): Total points earned.
- `month` (string): The month for which the points are displayed.
- `amountBreakdown` (string): Detailed breakdown of the amount used for calculating points.

## Example Usage

<CustomerPoints customerName="Prashant Kumar" points={90} month="August 2024" amountBreakdown="2x$20 + 1x$50" />
