import { Injectable } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) { }

  async findOne(where: Prisma.StudentWhereUniqueInput): Promise<Student | undefined> {
    return this.prismaService.student.findUnique({
      where
    })
  }


  async findFirst(where: Prisma.StudentWhereInput) {
    return this.prismaService.student.findFirst({
      where
    })
  }


  async find(where?: Prisma.StudentWhereInput): Promise<Student[] | undefined> {
    return this.prismaService.student.findMany({ where })
  }

  async create(data: Prisma.StudentCreateInput): Promise<Student> {
    return this.prismaService.student.create({ data })
  }

  async delete(where: Prisma.StudentWhereUniqueInput) {
    return this.prismaService.student.delete({
      where
    })
  }


  async update(where: Prisma.StudentWhereUniqueInput, data: Prisma.StudentUpdateInput) {
    return this.prismaService.student.update({
      where,
      data
    })
  }


  async getAttendance(where: Prisma.StudentWhereInput) {
    return this.prismaService.student.findFirst({
      where,
      include: {
        attendence: {
          include: {
            subject: true
          }
        }
      }
    })
  }

}
