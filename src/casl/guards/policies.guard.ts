
import { CanActivate, ExecutionContext, Injectable, Type, UnauthorizedException } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { CaslAbilityFactory } from '@Acl/casl-ability.factory';
import { CHECK_POLICIES_KEY } from '@Acl/decorators/check-policies.decorator';
import { PolicyHandler } from '@Acl/policies/policy-handler.interface';

import { Request } from 'express';

@Injectable()
export class PoliciesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private moduleRef: ModuleRef
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const policyHandlersRef = this.reflector.get<Type<PolicyHandler>[]>(
      CHECK_POLICIES_KEY,
      ctx.getHandler()
    ) || [];

    let policyHandlers: PolicyHandler[] = [];
    for (let i = 0; i < policyHandlersRef.length; i++) {
      const policyHandlerRef = policyHandlersRef[i];
      const policyHandler = await this.moduleRef.create(policyHandlerRef);
      policyHandlers.push(policyHandler);
    }

    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;
    const ability = this.caslAbilityFactory.createForUser(user);

    const allPoliciesOk = policyHandlers.every((handler) => handler.handle(ability, request));
    if (!allPoliciesOk) throw new UnauthorizedException();
    return allPoliciesOk;
  }

}
