
import { Provider } from '@nestjs/common';

import { postPolicyProviders } from './posts';
import { userPolicyProviders } from './users';

export const aclProviders: Provider[] = [
  ...postPolicyProviders,
  ...userPolicyProviders
]
