import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { Param1Pipe } from './param1/param1.pipe';
import { Param2Pipe } from './param2/param2.pipe';
import { Route1Pipe } from './route1/route1.pipe';
import { Route2Pipe } from './route2/route2.pipe';

@Controller()
export class AppController {
  constructor() { }


  @Get('pipe')
  @UsePipes(Route1Pipe, Route2Pipe)
  async testPipe(@Param('param1', Param1Pipe, Param2Pipe) param1Pipe, @Param('param2') param2Pipe) {

    console.log("🚀 ~ AppController ~ testPipe ~ param1Pipe:", param1Pipe)

    console.log("🚀 ~ AppController ~ testPipe ~ param2Pipe:", param2Pipe)


  }
}
