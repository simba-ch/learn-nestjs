import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CHECK_POLICIES_KEY } from 'src/check-policies/check-policies.decorator';
import { PolicyHandler } from 'src/types';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory
  ) { }


  async canActivate(
    context: ExecutionContext,
  ) {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || []

    const { user } = context.switchToHttp().getRequest();

    const ability = this.caslAbilityFactory.createForUser(user)

    return policyHandlers.every(handler => this.execPolicyHandler(handler, ability))

  }

  execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability)
    }
    return handler.handle(ability)
  }
}
