import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findOne(username: string) {
        return this.prisma.user.findFirst({
            where: {
                username
            }
        })
    }
}
