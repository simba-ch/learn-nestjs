import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('middleware start');
    next();
    console.log('middleware end');

  }
}


export async function LoggerMiddlewareFn(req: any, res: any, next: NextFunction) {
  console.log('logger middleware start');
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 2000);
  })
  next();
  console.log('logger middleware end');
}


export async function MiddlewareFn1(req: any, res: any, next: () => void) {
  console.log(' middleware1 start');
  next();
  console.log(' middleware1 end');
} 