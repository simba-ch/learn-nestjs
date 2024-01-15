import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';

@Module({
  providers: [MarksService],
  exports: [MarksService]
})
export class MarksModule { }
