
import { CanActivate, UseGuards, Type } from '@nestjs/common';

import { PoliciesGuard } from '@Acl/guards/policies.guard';

export function Acl(authGuard: Type<CanActivate>) {
  return UseGuards(authGuard, PoliciesGuard)
}
