
import { AppAbility } from '@AppRoot/casl/casl-ability.factory';
import { Action } from '@AppRoot/casl/enums/action.enum';
import { User } from '@Users/entities/user.entity';

import { PolicyHandler } from '../policy-handler.interface';

export class SearchUserHandler implements PolicyHandler {

  constructor(private loginToSearch: string) {}

  handle(ability: AppAbility): boolean {
    if (!this.loginToSearch) return false;
    const mockUserToSearch: User = new User();
    mockUserToSearch.login = this.loginToSearch;
    return ability.can(Action.READ, mockUserToSearch);
  }

}
