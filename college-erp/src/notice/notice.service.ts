import { Injectable } from '@nestjs/common';
import { Notice, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoticeService {
    constructor(private readonly prismaService: PrismaService) { }


    async findOne(where: Prisma.NoticeWhereInput): Promise<Notice | undefined> {
        return this.prismaService.notice.findFirst({
            where
        })
    }

    async createOne(data: Prisma.NoticeCreateInput): Promise<Notice> {
        return this.prismaService.notice.create({
            data
        })
    }


    async find(where?: Prisma.NoticeWhereInput): Promise<Notice[]> {
        return this.prismaService.notice.findMany({ where })
    }

    
}
