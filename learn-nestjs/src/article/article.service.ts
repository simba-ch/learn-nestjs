import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
    constructor(private prismaService: PrismaService) { }
    async findAll() {
        return this.prismaService.article.findMany()
    }
}
