
import { Type } from '@nestjs/common';

import { PolicyHandler } from '../policy-handler.interface';

import { CreateUserHandler } from './create-user-policy.handler';
import { SearchUserHandler } from './search-user-policy.handler';

export * from './create-user-policy.handler';
export * from './search-user-policy.handler';

export const userPolicies: Type<PolicyHandler>[] = [
  CreateUserHandler,
  SearchUserHandler
]
