
import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { SearchUserHandler } from '@Acl/policies/users/search-user-policy.handler';

export const SearchUserPolicyProvider: Provider = {
  provide: SearchUserHandler,
  inject: [ REQUEST ],
  useFactory: (request: Request) => {
    return new SearchUserHandler(request.params.login);
  }
}
