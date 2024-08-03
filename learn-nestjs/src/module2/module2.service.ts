import { Injectable } from '@nestjs/common';

@Injectable()
export class Module2Service {

    sayHello() {
        return 'hello,this is module2 service'
    }
}
