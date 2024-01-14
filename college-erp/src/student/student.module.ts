import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TestModule } from 'src/test/test.module';
import { SubjectModule } from 'src/subject/subject.module';
import { MarksModule } from 'src/marks/marks.module';

@Module({
  imports: [AuthModule,TestModule,SubjectModule,MarksModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})
export class StudentModule { }
