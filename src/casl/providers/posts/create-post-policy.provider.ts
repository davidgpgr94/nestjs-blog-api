
import { Provider, Scope } from '@nestjs/common';

import { CreatePostHandler } from '@Acl/policies/posts/create-post-policy.handler';

export const CreatePostPolicyProvider: Provider = CreatePostHandler;
