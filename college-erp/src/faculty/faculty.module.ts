import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { TestModule } from 'src/test/test.module';
import { StudentModule } from 'src/student/student.module';
import { MarksModule } from 'src/marks/marks.module';
import { SubjectModule } from 'src/subject/subject.module';
import { AttendenceModule } from 'src/attendence/attendence.module';

@Module({
  imports: [TestModule, StudentModule, MarksModule, SubjectModule, AttendenceModule],
  controllers: [FacultyController],
  providers: [FacultyService],
  exports: [FacultyService]
})
export class FacultyModule { }
