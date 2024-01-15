import { Module, forwardRef } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TestModule } from 'src/test/test.module';
import { SubjectModule } from 'src/subject/subject.module';
import { MarksModule } from 'src/marks/marks.module';

@Module({
  imports: [
    TestModule,
    forwardRef(() => SubjectModule),
    MarksModule
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})
export class StudentModule { }
