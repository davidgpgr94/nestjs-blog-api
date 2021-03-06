
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { FlatPost, FlatAttachedFile } from '@Acl/types';

import { Action } from '@Acl/enums/action.enum';
import { Post } from '@Posts/entities/post.entity';
import { AttachedFile } from '@Posts/entities/attached-file.entity';
import { User } from '@Users/entities/user.entity';
import { Role } from '@Users/enums/role.enum';

type Subjects = typeof Post | typeof User | typeof AttachedFile | Post | User | AttachedFile | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {

  createForUser(user: User) {

    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.role === Role.Admin) {
      can(Action.MANAGE, 'all');
      can(Action.DELETE, Post);
    } else {
      can(Action.READ, Post);
      can(Action.UPDATE, User, { id: user.id });
      can(Action.READ, User, { id: user.id });
      can(Action.READ, User, { login: user.login });
      can(Action.CREATE, Post);
      cannot(Action.DELETE, Post);

      can<FlatAttachedFile>(Action.DELETE, AttachedFile, { 'post.author.id': user.id });
    }

    can<FlatPost>(Action.UPDATE, Post, { 'author.id': user.id });

    return build({
      detectSubjectType: type => type.constructor as ExtractSubjectType<Subjects>
    });
  }

}
