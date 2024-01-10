import { Controller, Get, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ROLE, Roles } from 'src/auth/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly authService: AuthService) { }


  @Post("/login")
  @UseGuards(LocalAuthGuard)
  @SetMetadata(ROLE, Roles.ADMIN)
  adminLogin(@Request() req) {
    return this.authService.login(req.user)
  }


  @Post("/updatepassword")
  @UseGuards(JwtAuthGuard)
  updatedPassword() {

  }


  @Get("/getallstudent")
  @UseGuards(JwtAuthGuard)
  getAllStudent() {
    return 123123
  }

  @Post("/createnotice")
  @UseGuards(JwtAuthGuard)
  createNotice() {

  }
}
