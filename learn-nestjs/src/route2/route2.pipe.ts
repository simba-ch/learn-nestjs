import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class Route2Pipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    console.log('route2 pipe', value);
    
    return value;
  }
}
