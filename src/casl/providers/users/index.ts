
import { Provider } from '@nestjs/common';

import { CreateUserPolicyProvider } from './create-user-policy.provider';
import { SearchUserPolicyProvider } from './search-user-policy.provider';

export const userPolicyProviders: Provider[] = [
  CreateUserPolicyProvider,
  SearchUserPolicyProvider
]
