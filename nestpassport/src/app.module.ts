import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [AuthModule, UsersModule,PrismaModule, CaslModule],
  controllers: [AppController],
})
export class AppModule {}
