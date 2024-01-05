import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { InitDataModule } from './init-data/init-data.module';
import { PermissionRouteModule } from './permission-route/permission-route.module';
import { CaslModule } from './casl/casl.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [PrismaModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true
  }), InitDataModule, PermissionRouteModule, CaslModule, ArticleModule],
})
export class AppModule { }
