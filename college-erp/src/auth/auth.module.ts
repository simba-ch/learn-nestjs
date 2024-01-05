import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { LocalStrategy } from './local-strategy';

@Module({
  imports: [AdminModule],
  providers: [AuthService,LocalStrategy],
  exports: [AuthService]
})
export class AuthModule { }
