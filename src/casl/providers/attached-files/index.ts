
import { Provider } from '@nestjs/common';

import { DetachFilePolicyProvider } from './detach-file-policy.provider';

export const attachedFilesPolicyProviders: Provider[] = [
  DetachFilePolicyProvider
]
