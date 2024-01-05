import { Injectable } from '@nestjs/common';
import { Prisma, User as UserModel } from "@prisma/client";
import { PrismaService } from 'src/prisma/prisma.service';


type UserName = Prisma.UserWhereUniqueInput["username"]
type Password = Prisma.UserCreateInput['password']


@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async findOne(username: UserName): Promise<UserModel | undefined> {
        return await this.prismaService.user.findUnique({
            where: {
                username
            }
        })
    }

    async create(username: UserName, password: Password): Promise<UserModel> {
        return await this.prismaService.user.create({
            data: {
                username,
                password
            }
        })
    }


    
}
