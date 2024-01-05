import { Module } from '@nestjs/common';
import { InitDataService } from './init-data.service';
import { InitDataController } from './init-data.controller';

@Module({
  controllers: [InitDataController],
  providers: [InitDataService]
})
export class InitDataModule {}
