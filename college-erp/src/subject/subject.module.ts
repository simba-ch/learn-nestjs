import { Module, forwardRef } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [forwardRef(() => StudentModule)],
  providers: [SubjectService],
  exports: [SubjectService]
})
export class SubjectModule { }
