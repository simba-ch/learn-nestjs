import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class Interceptor1Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(' interceptor1 start');

    return next.handle().pipe(
      map(value => {
        console.log("🚀 ~ Interceptor1Interceptor ~ intercept ~ value:", value)
        return value
      }),
    )


    // return of(123123)

  }
}
