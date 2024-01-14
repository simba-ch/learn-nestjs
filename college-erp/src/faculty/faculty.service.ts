import { Injectable } from '@nestjs/common';
import { Faculty, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FacultyService {
    constructor(private readonly prismaService: PrismaService) {

    }

    async findOne(where: Prisma.FacultyWhereUniqueInput): Promise<Faculty | undefined> {
        return this.prismaService.faculty.findUnique({
            where
        })
    }

    async find(where?: Prisma.FacultyWhereInput): Promise<Faculty[] | undefined> {
        return this.prismaService.faculty.findMany({ where })
    }

    async create(data: Prisma.FacultyCreateInput) {
        return this.prismaService.faculty.create({
            data
        })
    }

    async delete(where: Prisma.FacultyWhereUniqueInput) {
        return this.prismaService.faculty.delete({
            where
        })
    }

    async update(where: Prisma.FacultyWhereUniqueInput, data: Prisma.FacultyUpdateInput) {
        return this.prismaService.faculty.update({
            where,
            data
        })
    }


}
