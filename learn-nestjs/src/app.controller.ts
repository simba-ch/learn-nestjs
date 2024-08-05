import { Controller, Get, Inject, Param, ParseIntPipe, Query, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { Param1Pipe } from './param1/param1.pipe';
import { Param2Pipe } from './param2/param2.pipe';
import { Route1Pipe } from './route1/route1.pipe';
import { Route2Pipe } from './route2/route2.pipe';
import { Param3Pipe } from './param3/param3.pipe';
import { Guard1Guard } from './guard1/guard1.guard';
import { Guard2Guard } from './guard2/guard2.guard';
import { Roles } from './roles/roles.decorator';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { Interceptor1Interceptor } from './interceptor1/interceptor1.interceptor';
import { Module1Service } from './module1/module1.service';
import { Module2Service } from './module2/module2.service';
import { Aggregation } from './aggregation/aggregation.decorator';
import { Custom } from './custom/custom';
import { CatsService } from './cats/cats.service';

@Controller()
export class AppController {
  constructor(
    private readonly module1Service: Module1Service,
    // private readonly module2Service: Module2Service,
    @Inject('Custom') private readonly customProvider: Custom,
    private readonly catsService: CatsService
  ) { }

  @UsePipes(Route1Pipe, Route2Pipe)
  @Get('pipe')
  async testPipe(@Query('param1', Param1Pipe, Param2Pipe) param1Pipe, @Query('param2', Param3Pipe) param2Pipe) {
    console.log("🚀 ~ AppController ~ testPipe ~ param1Pipe:", param1Pipe)
    console.log("🚀 ~ AppController ~ testPipe ~ param2Pipe:", param2Pipe)
  }

  @Roles('admin')
  @Get('guard')
  @UseGuards(Guard1Guard, Guard2Guard)

  async testGuard() {

    return 'guard success'
  }


  @Get('interceptor')
  @UseInterceptors(LoggingInterceptor, Interceptor1Interceptor)
  async testInterceptor() {
    return 'interceptor success'
  }

  @Get('order')
  @Roles('admin')
  @UseGuards(Guard1Guard, Guard2Guard)
  @UseInterceptors(LoggingInterceptor, Interceptor1Interceptor)
  @UsePipes(Route1Pipe, Route2Pipe)
  async testOrder(@Query('param1', Param1Pipe, Param2Pipe) param1Pipe, @Query('param2', Param3Pipe) param2Pipe) {
    console.log('route handler');

    return 'order success'
  }


  // @Get('order')
  // @Roles('admin')
  // @UseGuards(Guard1Guard, Guard2Guard)
  // @UseInterceptors(LoggingInterceptor, Interceptor1Interceptor)
  // @UsePipes(Route1Pipe, Route2Pipe)
  // async testOrder() {
  //   console.log('order handler');

  //   return 'order success'
  // }





  @Get('say_hello/:id')
  async sayHello(@Param('id', ParseIntPipe) id) {
    switch (id) {
      case 1:
        return this.module1Service.sayHello()
      // case 2:
      //   return this.module2Service.sayHello()
      case 3:
        return this.module1Service.otherSayHello()
      default:
        return 'hello';
    }
  }


  @Get('global_guard')
  async testGlobalGuard() {
    return 'global guard route success'
  }

  @Aggregation()
  @Get("aggregation")
  async testAggregationDecorators(@Query('param1', Param1Pipe, Param2Pipe) param1Pipe, @Query('param2', Param3Pipe) param2Pipe) {
    console.log('route handler');

    return 'aggregation route success'
  }


  @Get('custom_provider')
  async testCustomProvider() {
    return this.customProvider.sayHello()
  }

  @Get('cat')
  async FindOneForCat() {
    return this.catsService.crate()
  }
}
