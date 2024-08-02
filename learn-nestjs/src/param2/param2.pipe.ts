import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class Param2Pipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('param2 pipe', value);

    return value;
  }
}
