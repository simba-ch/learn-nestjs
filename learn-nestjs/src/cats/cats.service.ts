import { Injectable, OnModuleInit } from '@nestjs/common';
import { CatsFactory } from './cats.factory/cats.factory';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CatsService implements OnModuleInit {
    private catsFactory: CatsFactory;

    constructor(private moduleRef: ModuleRef) { }

    async onModuleInit() {
        this.catsFactory = await this.moduleRef.create(CatsFactory)
    }

    async crate() {
        return this.catsFactory.generate('nancy')
    }
}
