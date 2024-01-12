import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { ROLE } from './role.enum';
@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly reflector: Reflector) {
  }


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const role = this.reflector.get(ROLE, context.getHandler())
    const request = context.switchToHttp().getRequest()
    const { username, password } = request.body
    const user = await this.authService.validate(role, username, password)
    console.log("🚀 ~ LocalAuthGuard ~ user:", user)
    if (user) {
      request.user = user
      return true
    }
    request.user = null
    return false
  }

}
