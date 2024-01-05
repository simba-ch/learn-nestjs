import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class InitDataService {
  constructor(private prismaService: PrismaService) {

  }
  users = [{
    "username": "john",
    "password": "changeme"
  },
  {
    "username": "maria",
    "password": "guess"
  }]
  auth = ['admin', 'superAdmin', 'standard', 'test', 'advanced']
  role = ['add', 'delete', 'edit', 'export', 'print']
  route = ['/auth/profile']
  async initAll() {
    this.initAuth()
    this.initAuth()
    this.initRole()
    this.initRoute()
  }

  async initUser() {
    const user = await this.prismaService.user.findFirst({})
    if (user) return user;
    return this.prismaService.user.createMany({
      data: this.users
    })
  }



  async initAuth() {
    const auth = await this.prismaService.auth.findFirst({})
    if (auth) return auth;
    return this.prismaService.auth.createMany({
      data: this.auth.map(authname => ({ authname }))
    })
  }

  async updateAuth(id: string, updateAuthDTO: Prisma.AuthUpdateInput) {
    return this.prismaService.auth.update({
      where: {
        id
      },
      data: updateAuthDTO
    })
  }


  async initRole() {
    const role = await this.prismaService.role.findFirst({})
    if (role) return role;
    return this.prismaService.role.createMany({
      data: this.role.map(rolename => ({ rolename }))
    })
  }

  async updateRole(id: string, updateRoleDTO: Prisma.RoleUpdateInput) {
    return this.prismaService.role.update({
      where: {
        id
      },
      data: updateRoleDTO
    })
  }


  async initRoute() {
    const route = await this.prismaService.route.findFirst({ include: { permission: true } })
    if (route) return route;
    return this.prismaService.route.createMany({
      data: this.route.map(routename => ({ routename }))
    })
  }


}
