import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class Guard1Guard implements CanActivate {
  constructor(private readonly reflector: Reflector) {

  }


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('guard1 start');

    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    const request = context.switchToHttp().getRequest()
    request.user = {
      name: 'simba',
      age: 18,
      roles
    }
    return true;
  }
}
