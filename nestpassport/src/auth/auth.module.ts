import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RefreshJwtStrategy, } from "./refreshJwt.strategy";
@Module({
  imports: [
    UsersModule,
    JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: "120s" } })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
