
import { Provider } from '@nestjs/common';

import { EditPostPolicyProvider } from './edit-post-policy.provider';
import { CreatePostPolicyProvider } from './create-post-policy.provider';
import { RemovePostPolicyProvider } from './remove-post-policy.provider';

export const aclProviders: Provider[] = [
  EditPostPolicyProvider,
  CreatePostPolicyProvider,
  RemovePostPolicyProvider
]
