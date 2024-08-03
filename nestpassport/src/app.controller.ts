import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { CheckPolicies } from './check-policies/check-policies.decorator';
import { PoliciesGuard } from './policies/policies.guard';
import { AppAbility } from './casl/casl-ability.factory';
import { Action } from './enum/caslAction';
import { Article } from './entities/article.entity';



@Controller()
export class AppController {

  constructor(private readonly authService: AuthService) { }


  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user)
  }



  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    return req.user
  }


  @UseGuards(AuthGuard('refreshJwt'))
  @Get('refresh_token')
  async refreshToken(@Req() req) {
    return this.authService.login(req.user)
  }


  // @Get('authorization')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  // async authorization(@Req() req) {
  //   return req.user
  // }



}


