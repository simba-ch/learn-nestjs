import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from "@prisma/client";
import { AuthGuard } from './auth.guard';
import { Permission } from './permission.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
type SignDto = Pick<UserModel, "username" | "password">


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('sigin')
  signIn(@Body() signInDto: SignDto) {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }



  @Post('signup')
  signup(@Body() signupDto: SignDto) {
    return this.authService.signUp(signupDto.username, signupDto.password)
  }

  @Permission("/auth/profile")
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }


  @UseGuards(JwtAuthGuard)
  @Get("profile1")
  getProfile1(@Request() req) {
    return req.user
  }

}
