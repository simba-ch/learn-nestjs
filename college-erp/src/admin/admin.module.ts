import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { StudentModule } from 'src/student/student.module';
import { NoticeModule } from 'src/notice/notice.module';
import { FacultyModule } from 'src/faculty/faculty.module';
import { DepartmentModule } from 'src/department/department.module';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [StudentModule, NoticeModule, FacultyModule, DepartmentModule, SubjectModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule { }
