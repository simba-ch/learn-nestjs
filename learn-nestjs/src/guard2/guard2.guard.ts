import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class Guard2Guard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('guard2 start');
    
    const request = context.switchToHttp().getRequest()
    const { user } = request
    console.log("🚀 ~ Guard2Guard ~ user:", user)

    return true;
  }
}
