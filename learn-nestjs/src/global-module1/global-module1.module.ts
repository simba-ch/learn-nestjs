import { Module } from '@nestjs/common';
import { GlobalModule1Service } from './global-module1.service';

@Module({
  providers: [GlobalModule1Service]
})
export class GlobalModule1Module {}
