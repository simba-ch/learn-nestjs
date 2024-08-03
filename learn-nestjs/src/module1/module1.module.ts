import { Module } from '@nestjs/common';
import { Module1Service } from './module1.service';
import { Module2Module } from 'src/module2/module2.module';

@Module({
  providers: [Module1Service],
  exports: [Module1Service],
  imports: [Module2Module]
})
export class Module1Module { }
