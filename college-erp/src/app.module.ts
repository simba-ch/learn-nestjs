import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { FacultyModule } from './faculty/faculty.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { NoticeModule } from './notice/notice.module';
import { DepartmentModule } from './department/department.module';
import { SubjectModule } from './subject/subject.module';
import { TestModule } from './test/test.module';
import { MarksModule } from './marks/marks.module';
import { AttendenceModule } from './attendence/attendence.module';

@Module({
  imports: [AdminModule, FacultyModule, StudentModule, AuthModule, PrismaModule, NoticeModule, DepartmentModule, SubjectModule, TestModule, MarksModule, AttendenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
