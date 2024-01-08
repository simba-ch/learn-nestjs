import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {

  }

  async findOne(email: string): Promise<Student | undefined> {
    return this.prismaService.student.findUnique({
      where: {
        email
      }
    })
  }
}
