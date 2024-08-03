import { applyDecorators, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { Guard1Guard } from 'src/guard1/guard1.guard';
import { Guard2Guard } from 'src/guard2/guard2.guard';
import { Interceptor1Interceptor } from 'src/interceptor1/interceptor1.interceptor';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { Roles } from 'src/roles/roles.decorator';
import { Route1Pipe } from 'src/route1/route1.pipe';
import { Route2Pipe } from 'src/route2/route2.pipe';

export const Aggregation = () => {
    return applyDecorators(
        UsePipes(Route1Pipe, Route2Pipe),
        UseGuards(Guard1Guard, Guard2Guard),
        UseInterceptors(LoggingInterceptor, Interceptor1Interceptor),
        Roles('admin'),
    )
}