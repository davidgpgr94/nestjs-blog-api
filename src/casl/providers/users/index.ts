
import { Provider } from '@nestjs/common';

import { CreateUserPolicyProvider } from './create-user-policy.provider';

export const userPolicyProviders: Provider[] = [
  CreateUserPolicyProvider
]
