
import { Request } from 'express';

import { AppAbility } from '@Acl/casl-ability.factory';
import { Action } from '@Acl/enums/action.enum';
import { PolicyHandler } from '@Acl/policies/policy-handler.interface';


export class EditPostPolicyHandler implements PolicyHandler {

  handle(ability: AppAbility, req: Request): boolean {
    if (!req.post) return false;
    const post = req.post;
    return ability.can(Action.UPDATE, post);
  }

}
