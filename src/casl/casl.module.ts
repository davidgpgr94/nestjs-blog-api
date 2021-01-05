import { Module } from '@nestjs/common';

import { CaslAbilityFactory } from '@Acl/casl-ability.factory';
import { aclProviders } from '@Acl/providers'
import { policies } from '@Acl/policies';

@Module({
  providers: [
    CaslAbilityFactory,
    ...aclProviders
  ],
  exports: [
    CaslAbilityFactory,
    ...policies
  ]
})
export class CaslModule {}
