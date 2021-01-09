import { Module, Global } from '@nestjs/common';

import { CaslAbilityFactory } from '@Acl/casl-ability.factory';
import { aclProviders } from '@Acl/providers'
import { policies } from '@Acl/policies';

@Global()
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
