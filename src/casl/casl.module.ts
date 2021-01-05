import { Module } from '@nestjs/common';

import { CaslAbilityFactory } from '@Acl/casl-ability.factory';
import { EditPostPolicyProvider } from '@Acl/policies/edit-post-policy.provider';
import { EditPostHandler } from './policies/edit-post-policy.handler';

@Module({
  providers: [
    CaslAbilityFactory,
    EditPostPolicyProvider
  ],
  exports: [
    CaslAbilityFactory,
    EditPostHandler
  ]
})
export class CaslModule {}
