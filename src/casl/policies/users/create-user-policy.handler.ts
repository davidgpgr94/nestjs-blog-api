
import { User } from '@Users/entities/user.entity';

import { AppAbility } from '@Acl/casl-ability.factory';
import { Action } from '@Acl/enums/action.enum';

import { PolicyHandler } from '../policy-handler.interface';

export class CreateUserHandler implements PolicyHandler {

  handle(ability: AppAbility): boolean {
    return ability.can(Action.CREATE, User);
  }

}
