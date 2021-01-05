import { SetMetadata, Type } from '@nestjs/common';

import { PolicyHandler } from '@Acl/policies/policy-handler.interface';
import { CHECK_POLICIES_KEY } from '@Acl/constants';


export const CheckPolicies = (...handlers: Type<PolicyHandler>[]) => SetMetadata(CHECK_POLICIES_KEY, handlers);
