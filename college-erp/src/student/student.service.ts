import { Injectable } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {

  }

  async findOne(where: Prisma.StudentWhereUniqueInput): Promise<Student | undefined> {
    return this.prismaService.student.findUnique({
      where
    })
  }


  async find(where?: Prisma.StudentWhereInput): Promise<Student[] | undefined> {
    return this.prismaService.student.findMany({ where })
  }

  async create(data: Prisma.StudentCreateInput): Promise<Student> {
    return this.prismaService.student.create({ data })
  }

}
