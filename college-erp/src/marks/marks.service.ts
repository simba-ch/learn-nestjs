import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MarksService {
  constructor(private readonly prismaService: PrismaService) { }

  async find(where: Prisma.MarksWhereInput) {
    return this.prismaService.marks.findFirst({ where })
  }

  async createMany(data: Prisma.MarksCreateManyInput) {
    return this.prismaService.marks.createMany({ data })
  }
}
