import { Injectable } from '@nestjs/common';
import { Faculty } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FacultyService {
  constructor(private readonly prismaService:PrismaService){

  }

  async findOne(email: string): Promise<Faculty | undefined> {
    return this.prismaService.faculty.findUnique({
        where: {
            email
        }
    })
}
}
