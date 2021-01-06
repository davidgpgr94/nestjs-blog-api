
import { Provider } from '@nestjs/common';

import { CreateUserHandler } from '@Acl/policies/users/create-user-policy.handler';

export const CreateUserPolicyProvider: Provider = CreateUserHandler;
