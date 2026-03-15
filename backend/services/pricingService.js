/**
 * File: pricingService.js
 * Purpose:
 * Contains reusable pricing logic for subscription upgrades.
 * Calculates prorated billing amounts.
 */

export const calculateProratedAmount = (
  currentPlan,
  newPlan,
  subscription
) => {
  const now = new Date();

  const totalDuration =
    subscription.endDate - subscription.startDate;

  const remainingDuration =
    subscription.endDate - now;

  // remaining credit value
  const remainingCredit =
    (remainingDuration / totalDuration) * currentPlan.price;

  const payableAmount =
    newPlan.price - remainingCredit;

  return {
    remainingCredit: Math.max(0, Math.round(remainingCredit)),
    payableAmount: Math.max(0, Math.round(payableAmount)),
  };
};