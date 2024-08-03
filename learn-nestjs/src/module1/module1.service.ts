import { Injectable } from '@nestjs/common';
import { Module2Service } from 'src/module2/module2.service';

@Injectable()
export class Module1Service {

    constructor(private readonly module2Service: Module2Service) {

    }

    sayHello() {
        return 'hello,this is module1 service'
    }


    otherSayHello() {
        return this.module2Service.sayHello()
    }
}
