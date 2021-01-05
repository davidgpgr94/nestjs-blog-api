import { Type } from '@nestjs/common';

import { PolicyHandler } from './policy-handler.interface';

import { EditPostHandler } from './edit-post-policy.handler';
import { CreatePostHandler } from './create-post-policy.handler';

export * from './edit-post-policy.handler';
export * from './create-post-policy.handler';

export const policies: Type<PolicyHandler>[] = [
  EditPostHandler,
  CreatePostHandler
]
