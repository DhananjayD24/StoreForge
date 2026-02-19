/**
 * planRules.js
 *
 * Defines SaaS subscription capabilities.
 * Central source of truth for feature gating.
 */

export const PLAN_RULES = {
  Free: {
    maxProducts: 10,
    analytics: false,
  },

  Pro: {
    maxProducts: Infinity,
    analytics: true,
  },

  Enterprise: {
    maxProducts: Infinity,
    analytics: true,
  },
};
