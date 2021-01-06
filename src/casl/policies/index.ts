import { Type } from '@nestjs/common';

import { PolicyHandler } from './policy-handler.interface';

import { postPolicies } from './posts';
import { userPolicies } from './users';

export * from './posts';
export * from './users';

export const policies: Type<PolicyHandler>[] = [
  ...postPolicies,
  ...userPolicies
]
