import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './logger/logger.middleware';
import { Module1Module } from './module1/module1.module';
import { GlobalModule1Module } from './global-module1/global-module1.module';

@Module({
  imports: [Module1Module, GlobalModule1Module],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 没有效果，需要设置中间件作用的路由
    consumer.apply(LoggerMiddleware)
  }


}
