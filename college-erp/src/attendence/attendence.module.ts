import { Module } from '@nestjs/common';
import { AttendenceService } from './attendence.service';

@Module({
  providers: [AttendenceService]
})
export class AttendenceModule {}
