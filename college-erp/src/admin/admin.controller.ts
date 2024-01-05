import { Controller, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }


  @Post()
  @UseGuards(LocalAuthGuard)
  login() {
    return 123
  }
}
