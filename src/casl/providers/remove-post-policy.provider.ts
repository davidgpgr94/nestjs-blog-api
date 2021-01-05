
import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { RemovePostHandler } from '@Acl/policies/remove-post-policy.handler';

export const RemovePostPolicyProvider: Provider = {
  provide: RemovePostHandler,
  inject: [ REQUEST ],
  useFactory: (request: Request) => {
    return new RemovePostHandler(request.post);
  }
}
