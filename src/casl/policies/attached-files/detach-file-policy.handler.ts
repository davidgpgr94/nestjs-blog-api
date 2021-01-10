
import { AttachedFile } from '@Posts/entities/attached-file.entity';

import { AppAbility } from '@Acl/casl-ability.factory';
import { Action } from '@Acl/enums/action.enum';

import { PolicyHandler } from '../policy-handler.interface';

export class DetachFileHandler implements PolicyHandler {

  constructor(private attachedFile: AttachedFile) {}

  handle(ability: AppAbility): boolean {
    console.log({file: this.attachedFile})
    if (!this.attachedFile) return false;
    return ability.can(Action.DELETE, this.attachedFile);
  }

}
