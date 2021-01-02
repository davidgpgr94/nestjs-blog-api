import { applyDecorators, SetMetadata, Type, UseGuards } from '@nestjs/common';

import { PolicyHandler } from '@Acl/policies/policy-handler.interface';
import { PoliciesGuard } from '../guards/policies.guard';

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: Type<PolicyHandler>[]) => SetMetadata(CHECK_POLICIES_KEY, handlers);

export function Policies(...handlers: Type<PolicyHandler>[]) {
  return applyDecorators(
    SetMetadata(CHECK_POLICIES_KEY, handlers),
    UseGuards(PoliciesGuard)
  );
}
