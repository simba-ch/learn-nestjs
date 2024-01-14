import { Injectable } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
    constructor(private readonly prismaService: PrismaService) { }
    async find(): Promise<Department[] | undefined> {
        return this.prismaService.department.findMany()
    }

    async findOne(where: Prisma.DepartmentWhereInput): Promise<Department | undefined> {
        return this.prismaService.department.findFirst({
            where
        })
    }


    async create(data: Prisma.DepartmentCreateInput): Promise<Department> {
        return this.prismaService.department.create({
            data
        })
    }



    async addOne(department: string): Promise<Department> {
        const { id, departmentLatest } = await this.prismaService.index.findFirst()
        const departmentCode = (parseInt(departmentLatest) + 1).toString().padStart(2, "0")
        const data = {
            department,
            departmentCode
        }
        const [_, newDepartment] = await this.prismaService.$transaction([this.prismaService.index.update({
            where: {
                id
            },
            data: {
                departmentLatest: departmentCode
            }
        }), this.prismaService.department.create({
            data
        })])




        return newDepartment
    }


    async delete(where: Prisma.DepartmentWhereInput) {
        return this.prismaService.department.deleteMany({
            where
        })
    }
}