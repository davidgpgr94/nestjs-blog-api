
import { Request } from 'express';

import { AppAbility } from '@Acl/casl-ability.factory';
import { Action } from '@Auth/enums/action.enum';

import { PolicyHandler } from './policy-handler.interface';
import { Post } from '@Posts/entities/post.entity';
import { User } from '@AppRoot/users/entities/user.entity';

export class EditPostPolicyHandler implements PolicyHandler {

  handle(ability: AppAbility, req: Request): boolean {
    if (!req.post) return false;
    const post = req.post;
    return ability.can(Action.UPDATE, post);
  }

}
