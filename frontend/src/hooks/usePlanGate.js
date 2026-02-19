/**
 * usePlanGate.js
 *
 * Custom hook that checks whether
 * current tenant can access a feature.
 */

import { PLAN_RULES } from "../config/planrules";
import { useTenants } from "../context/TenantContext";

export function usePlanGate() {
  const { tenants } = useTenants();

  // MVP assumption: first tenant = active store
  const currentTenant = tenants[0];

  const rules = PLAN_RULES[currentTenant.plan];

  // Check product limit
  const canAddProduct = (productCount) => {
    return productCount < rules.maxProducts;
  };

  return {
    plan: currentTenant.plan,
    rules,
    canAddProduct,
  };
}
