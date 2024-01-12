import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private readonly prismaService: PrismaService) {

    }

    async findOne(where: Prisma.AdminWhereUniqueInput): Promise<Admin | undefined> {
        return this.prismaService.admin.findUnique({
            where
        })
    }

    async updated(where: Prisma.AdminWhereUniqueInput, data: Partial<Omit<Admin, "id">>): Promise<Admin | undefined> {
        return this.prismaService.admin.update({
            where,
            data
        })
    }


    async find(where?: Prisma.AdminWhereInput): Promise<Admin[] | undefined> {
        return this.prismaService.admin.findMany({ where })
    }


    async create(data: Prisma.AdminCreateInput) {
        return this.prismaService.admin.create({ data })
    }


    async delete(where: Prisma.AdminDeleteArgs["where"]): Promise<Admin | undefined> {
        return this.prismaService.admin.delete({ where })
    }
}
