import { Module } from '@nestjs/common';

import { CaslAbilityFactory } from '@Acl/casl-ability.factory';

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class CaslModule {}
