import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor(){
        super({
            log:[
                {
                    emit:"event",
                    level:"query"
                }
            ]
        })
       this.$extends({})
    }
    async onModuleInit() {
        await this.$connect()
    }
}