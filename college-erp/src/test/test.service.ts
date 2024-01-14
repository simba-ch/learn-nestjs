import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll(where: Prisma.TestWhereInput) {
    return this.prismaService.test.findMany({
      where
    })
  }


  async find(where: Prisma.TestWhereInput) {
    return this.prismaService.test.findFirst({ where })
  }

  async create(data: Prisma.TestCreateInput) {
    return this.prismaService.test.create({ data })
  }
}
