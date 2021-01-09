
import { Post } from '@Posts/entities/post.entity';

import { AppAbility } from '@Acl/casl-ability.factory';
import { Action } from '@Acl/enums/action.enum';

import { PolicyHandler } from '../policy-handler.interface';

export class RemovePostHandler implements PolicyHandler {

  constructor(private post: Post) {}

  handle(ability: AppAbility): boolean {
    if (!this.post) return false;
    return ability.can(Action.DELETE, this.post);
  }

}
