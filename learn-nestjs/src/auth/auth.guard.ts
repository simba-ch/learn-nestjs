import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROUTE } from './permission.decorator';
const secret = process.env.JWTSECRET
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prismaService: PrismaService, private reflector: Reflector) { }


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {



    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) throw new UnauthorizedException()
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret })
      request.user = payload
      const route = this.reflector.getAllAndOverride<string>(ROUTE, [context.getHandler(), context.getClass()])
      const permissionRoute = await this.prismaService.route.findFirst({
        where: {
          routename: route
        },
        include: {
          permission: {
            select: {
              auth: true,
            }
          }
        }
      })

      const user = await this.prismaService.user.findUnique({
        where: {
          username: payload.username,
        },
        include: {
          auth: true
        }
      })
      const isPermission = permissionRoute.permission.some(permission => user.auth.some(userAuth => userAuth.authname === permission.auth.authname))
      if (!isPermission) throw new UnauthorizedException()


    } catch {
      throw new UnauthorizedException()
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === "Bearer" ? token : undefined
  }
}




