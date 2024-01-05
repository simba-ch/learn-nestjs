import { Body, Controller, Param, Post } from '@nestjs/common';
import { InitDataService } from './init-data.service';
import { Prisma } from '@prisma/client';
@Controller('init-data')
export class InitDataController {
  constructor(private readonly initDataService: InitDataService) { }

  @Post("all")
  async initAll() {
    return this.initDataService.initAll()
  }
  @Post("user")
  async initUser() {
    return this.initDataService.initUser()
  }
  @Post("auth")
  async initAuth() {
    return this.initDataService.initAuth()
  }
  @Post("auth/:id")
  async setAuth(@Param("id") id: string, @Body() updateAuthDTO: Prisma.AuthUpdateInput) {
    return this.initDataService.updateAuth(id, updateAuthDTO)
  }


  @Post("role")
  async initRole() {
    return this.initDataService.initRole()
  }

  @Post("role/:id")
  async setRole(@Param("id") id: string, @Body() updateRoleDTO: Prisma.RoleUpdateInput) {
    return this.initDataService.updateRole(id, updateRoleDTO)
  }

  @Post("route")
  async initRoute() {
    return this.initDataService.initRoute()
  }



}
