
import { Provider } from '@nestjs/common';

import { postPolicyProviders } from './posts';
import { userPolicyProviders } from './users';
import { attachedFilesPolicyProviders } from './attached-files';

export const aclProviders: Provider[] = [
  ...postPolicyProviders,
  ...userPolicyProviders,
  ...attachedFilesPolicyProviders
]
