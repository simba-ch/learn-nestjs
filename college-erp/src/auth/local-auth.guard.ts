import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import "rxjs"
@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  canActivate(
    context: ExecutionContext,
  ) {
    const result = super.canActivate(context);
    console.log("🚀 ~ file: local-auth.guard.ts:11 ~ LocalAuthGuard ~ classLocalAuthGuardextendsAuthGuard ~ result:", result)
    return result
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    console.log("🚀 ~ file: local-auth.guard.ts:13 ~ LocalAuthGuard ~ handleRequest ~ status:", status)
    console.log("🚀 ~ file: local-auth.guard.ts:13 ~ LocalAuthGuard ~ handleRequest ~ context:", context)
    console.log("🚀 ~ file: local-auth.guard.ts:13 ~ LocalAuthGuard ~ handleRequest ~ info:", info)
    console.log("🚀 ~ file: local-auth.guard.ts:13 ~ LocalAuthGuard ~ handleRequest ~ user:", user)
    console.log("🚀 ~ file: local-auth.guard.ts:13 ~ LocalAuthGuard ~ handleRequest ~ err:", err)
    return user
  }

}
