import { SetMetadata, Type } from '@nestjs/common';

import { PolicyHandler } from '@Auth/policies/policy-handler.interface';

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: Type<PolicyHandler>[]) => SetMetadata(CHECK_POLICIES_KEY, handlers);
