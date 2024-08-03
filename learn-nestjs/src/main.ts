import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddlewareFn, MiddlewareFn1 } from './logger/logger.middleware';
import { GlobalGuardGuard } from './global-guard/global-guard.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(LoggerMiddlewareFn,MiddlewareFn1)
  // app.use(LoggerMiddlewareFn)
  // app.useGlobalGuards(new GlobalGuardGuard())？？？
  await app.listen(3000);
}
bootstrap();
