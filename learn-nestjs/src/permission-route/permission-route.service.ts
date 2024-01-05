import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from "@prisma/client";



@Injectable()
export class PermissionRouteService {
    constructor(private prismaService: PrismaService) {

    }


    async create(permissionRouteDTO: Prisma.PermissionRouteCreateInput) {
        return this.prismaService.permissionRoute.create({ data: permissionRouteDTO })
    }

    async update(id: string, permissionRouteDTO: Prisma.PermissionRouteUpdateInput) {
        return this.prismaService.permissionRoute.update({
            where: {
                id
            },
            data: permissionRouteDTO
        })
    }

}
