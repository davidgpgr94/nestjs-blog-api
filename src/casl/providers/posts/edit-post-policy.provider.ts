
import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { EditPostHandler } from '@Acl/policies/posts/edit-post-policy.handler';

export const EditPostPolicyProvider: Provider = {
  provide: EditPostHandler,
  inject: [ REQUEST ],
  useFactory: (request: Request) => {
    return new EditPostHandler(request.post);
  }
}
