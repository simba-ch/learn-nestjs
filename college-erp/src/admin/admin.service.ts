import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private readonly prismaService: PrismaService) {

    }

    async findOne(email: string): Promise<Admin | undefined> {
        return this.prismaService.admin.findUnique({
            where: {
                email
            }
        })
    }

    async updated(where: Prisma.AdminWhereUniqueInput, data: Partial<Omit<Admin, "id">>): Promise<Admin | undefined> {
        return this.prismaService.admin.update({
            where,
            data
        })
    }
}
