import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { FacultyModule } from 'src/faculty/faculty.module';
import { StudentModule } from 'src/student/student.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratege } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
const JWT_SECRET = process.env.JWT_SECRET

@Global()
@Module({
  imports: [AdminModule, FacultyModule, StudentModule,PassportModule,JwtModule.register({
    secret: JWT_SECRET,
    signOptions:{
      expiresIn:"1h"
    }
  })],
  providers: [AuthService, JwtStratege],
  exports: [AuthService]
})
export class AuthModule { }
