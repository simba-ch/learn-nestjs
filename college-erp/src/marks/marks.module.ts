import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';

@Module({
  providers: [MarksService]
})
export class MarksModule {}
