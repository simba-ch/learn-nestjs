import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class Guard3Guard implements CanActivate {
  constructor(private reflector: Reflector) { }


  async canActivate(
    context: ExecutionContext,
  ) {
    // // 字符串
    // const roles = this.reflector.getAll('role', [context.getHandler(), context.getClass()])
    // console.log("🚀 ~ Guard3Guard ~ roles:", roles)
    // const roles1 = this.reflector.getAll('role', [context.getClass(), context.getHandler()])
    // console.log("🚀 ~ Guard3Guard ~ roles1:", roles1)
    // const roles2 = this.reflector.getAllAndMerge('role', [context.getHandler(), context.getClass()])
    // console.log("🚀 ~ Guard3Guard ~ roles2:", roles2)
    // const roles3 = this.reflector.getAllAndMerge('role', [context.getClass(), context.getHandler()])
    // console.log("🚀 ~ Guard3Guard ~ roles3:", roles3)
    // const roles4 = this.reflector.getAllAndOverride('role', [context.getHandler(), context.getClass()])
    // console.log("🚀 ~ Guard3Guard ~ roles4:", roles4)
    // const roles5 = this.reflector.getAllAndOverride('role', [context.getClass(), context.getHandler()])
    // console.log("🚀 ~ Guard3Guard ~ roles5:", roles5)


    // 数组
    const roles = this.reflector.getAll('roles', [context.getHandler(), context.getClass()])
    console.log("🚀 ~ Guard3Guard ~ roles:", roles)
    const roles1 = this.reflector.getAll('roles', [context.getClass(), context.getHandler()])
    console.log("🚀 ~ Guard3Guard ~ roles1:", roles1)
    const roles2 = this.reflector.getAllAndMerge('roles', [context.getHandler(), context.getClass()])
    console.log("🚀 ~ Guard3Guard ~ roles2:", roles2)
    const roles3 = this.reflector.getAllAndMerge('roles', [context.getClass(), context.getHandler()])
    console.log("🚀 ~ Guard3Guard ~ roles3:", roles3)
    const roles4 = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()])
    console.log("🚀 ~ Guard3Guard ~ roles4:", roles4)
    const roles5 = this.reflector.getAllAndOverride('roles', [context.getClass(), context.getHandler()])
    console.log("🚀 ~ Guard3Guard ~ roles5:", roles5)
    return true;
  }
}
