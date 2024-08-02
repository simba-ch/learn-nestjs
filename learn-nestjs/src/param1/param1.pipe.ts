import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class Param1Pipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('param1 pipe', value);

    return value;
  }
}
