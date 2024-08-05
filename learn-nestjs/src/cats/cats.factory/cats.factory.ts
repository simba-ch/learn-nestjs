import { Injectable } from "@nestjs/common";


@Injectable()
export class CatsFactory {
    generate(name: string) {
        return {
            name,
            kind: 'cat'
        }
    }
}
