import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class Route1Pipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    console.log('route1 pipe', value);

    return value + 1;
  }
}
