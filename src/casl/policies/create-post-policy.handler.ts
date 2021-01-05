
import { Post } from '@Posts/entities/post.entity';

import { AppAbility } from '@Acl/casl-ability.factory';
import { Action } from '@Acl/enums/action.enum';

import { PolicyHandler } from './policy-handler.interface';

export class CreatePostHandler implements PolicyHandler {

  handle(ability: AppAbility): boolean {
    return ability.can(Action.CREATE, Post);
  }

}
