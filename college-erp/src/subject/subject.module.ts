import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { StudentModule } from 'src/student/student.module';

@Module({
  providers: [SubjectService, StudentModule],
  exports: [SubjectService]
})
export class SubjectModule { }
