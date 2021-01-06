
import { Type } from '@nestjs/common';

import { PolicyHandler } from '../policy-handler.interface';

import { CreatePostHandler } from './create-post-policy.handler';
import { EditPostHandler } from './edit-post-policy.handler';
import { RemovePostHandler } from './remove-post-policy.handler';

export * from './create-post-policy.handler';
export * from './edit-post-policy.handler';
export * from './remove-post-policy.handler';

export const postPolicies: Type<PolicyHandler>[] = [
  EditPostHandler,
  CreatePostHandler,
  RemovePostHandler
]
