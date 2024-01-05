import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PolicyHandler } from './policyHandler';
import { CHECK_POLICIES_KEY } from './check-policies.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || []
    const req = context.switchToHttp().getRequest()
    const {user} = req.body
    console.log("🚀 ~ file: policies.guard.ts:17 ~ PoliciesGuard ~ user:", user)
    const ability = this.caslAbilityFactory.createForUser(user)
    return policyHandlers.every(handler => this.execPolicyHandler(handler, ability, req))

  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility, req: any) {
    if (typeof handler === 'function') {
      return handler(ability, req)
    }
    return handler.handle(ability, req)
  }
}
