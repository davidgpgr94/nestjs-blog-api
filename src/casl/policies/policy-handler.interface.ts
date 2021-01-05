
import { AppAbility } from '@Acl/casl-ability.factory';

export interface PolicyHandler {
  handle(ability: AppAbility): boolean;
}
