import { Body, Controller, Param, Post } from '@nestjs/common';
import { PermissionRouteService } from './permission-route.service';
import { Prisma } from "@prisma/client";
@Controller('permission-route')
export class PermissionRouteController {
  constructor(private readonly permissionRouteService: PermissionRouteService) { }

  @Post("create")
  async create(@Body() permissionRouteDTO: Prisma.PermissionRouteCreateInput) {
    return this.permissionRouteService.create(permissionRouteDTO)
  }

  @Post("update:id")
  async update(@Param("id") id: string, @Body() permissionRouteDTO: Prisma.PermissionRouteUpdateInput) {
    return this.permissionRouteService.update(id, permissionRouteDTO)
  }
}
