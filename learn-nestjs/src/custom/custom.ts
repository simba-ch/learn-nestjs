import { Injectable } from '@nestjs/common';

@Injectable()
export class Custom {
    sayHello(){
        return 'hello,this is custom provider'
    }
}
