import { Type } from '@nestjs/common';

import { PolicyHandler } from './policy-handler.interface';

import { postPolicies } from './posts';
import { userPolicies } from './users';
import { attachedFilesPolicies } from './attached-files';

export * from './posts';
export * from './users';
export * from './attached-files';

export const policies: Type<PolicyHandler>[] = [
  ...postPolicies,
  ...userPolicies,
  ...attachedFilesPolicies
]
