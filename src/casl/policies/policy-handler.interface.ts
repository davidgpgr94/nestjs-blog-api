
import { AppAbility } from '@Acl/casl-ability.factory';
import { Request } from 'express';

export interface PolicyHandler {
  handle(ability: AppAbility, request: Request): boolean;
}
