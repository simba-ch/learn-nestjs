import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendenceService {
  constructor(private readonly prismaService: PrismaService) { }

  async find(where: Prisma.AttendenceWhereInput) {
    return this.prismaService.attendence.findFirst({ where })
  }

  async create(data: Prisma.AttendenceCreateInput) {
    return this.prismaService.attendence.create({ data })
  }


  async updateOne(where: Prisma.AttendenceWhereUniqueInput, data: Prisma.AttendenceCreateInput) {
    return this.prismaService.attendence.update({
      where,
      data
    })


  }
}
