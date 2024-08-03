import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class Param3Pipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('param3 pipe', value);

    return value;
  }
}
