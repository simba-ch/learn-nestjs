import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalGuardGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()])
    console.log("🚀 ~ GlobalGuardGuard ~ roles:", roles)
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()

    const { route } = request
    console.log("🚀 ~ GlobalGuardGuard ~ route:", route)
    return true;
  }
}
