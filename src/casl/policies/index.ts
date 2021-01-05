import { Type } from '@nestjs/common';

import { PolicyHandler } from './policy-handler.interface';
import { EditPostHandler } from './edit-post-policy.handler';

export const policies: Type<PolicyHandler>[] = [
  EditPostHandler
]
