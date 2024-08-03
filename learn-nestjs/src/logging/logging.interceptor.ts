import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('logging interceptor start');

    console.log('before...');
    const now = Date.now()
    return next.handle()
      .pipe(
        map(value => {
          console.log("🚀 ~ LoggingInterceptor ~ intercept ~ value:", value)
          return 123123
        }),
        tap(() => console.log(`after... ${Date.now() - now} ms`))
      );
  }
}
