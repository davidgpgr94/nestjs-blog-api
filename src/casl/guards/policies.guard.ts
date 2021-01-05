
import { Injectable, CanActivate, ExecutionContext, Type } from '@nestjs/common';
import { ContextIdFactory, ModuleRef, Reflector } from '@nestjs/core';
import { Request } from 'express';

import { CaslAbilityFactory } from '@Acl/casl-ability.factory';
import { PolicyHandler } from '@Acl/policies/policy-handler.interface';
import { CHECK_POLICIES_KEY } from '@Acl/constants';

@Injectable()
export class PoliciesGuard implements CanActivate {

  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private reflector: Reflector,
    private moduleRef: ModuleRef
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const policiesHandlersRef = this.reflector.get<Type<PolicyHandler>[]>(
      CHECK_POLICIES_KEY,
      ctx.getHandler()
    ) || [];

    if (policiesHandlersRef.length === 0) return true;

    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId(ctx.switchToHttp().getRequest(), contextId);

    let policyHandlers: PolicyHandler[] = [];
    for (let i = 0; i < policiesHandlersRef.length; i++) {
      const policyHandlerRef = policiesHandlersRef[i];
      const policyHandler = await this.moduleRef.resolve(policyHandlerRef, contextId, {strict: false});
      policyHandlers.push(policyHandler);
    }

    const { user } = ctx.switchToHttp().getRequest<Request>();
    if (!user) return false;

    const ability = this.caslAbilityFactory.createForUser(user);
    return policyHandlers.every((handler) => handler.handle(ability));
  }

}
