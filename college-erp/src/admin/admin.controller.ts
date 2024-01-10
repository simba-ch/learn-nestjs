import { BadRequestException, Body, Controller, Get, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ROLE, Roles } from 'src/auth/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
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
  async updatedPassword(@Body("newPassword") newPassword, @Body("confirmPassword") confirmPassword, @Body("email") email) {
    if (newPassword !== confirmPassword) throw new BadRequestException("Your password and confirmation password do not match");
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    return await this.adminService.updated({
      email
    }, {
      password: hashedPassword,
      passwordUpdated: true
    })
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

  @Get("/getallfaculty")
  @UseGuards(JwtAuthGuard)
  getAllFaculty() {

  }

  @Get("/getalldepartment")
  @UseGuards(JwtAuthGuard)
  getAllDepartment() {

  }

  @Get("/getalldepartment")
  @UseGuards(JwtAuthGuard)
  getAllSubject() {

  }

  @Get("/getalladmin")
  @UseGuards(JwtAuthGuard)
  getAllAdmin() {

  }

  @Post("/updateprofile")
  @UseGuards(JwtAuthGuard)
  updateAdmin() {

  }

  @Post("/addadmin")
  @UseGuards(JwtAuthGuard)
  addAdmin() {

  }

  @Post("/adddepartment")
  @UseGuards(JwtAuthGuard)
  addDepartment() {

  }

  @Post("/addfaculty")
  @UseGuards(JwtAuthGuard)
  addFaculty() {

  }

  @Post("/getfaculty")
  @UseGuards(JwtAuthGuard)
  getFaculty() {

  }

  @Post("/addsubject")
  @UseGuards(JwtAuthGuard)
  addSubject() {

  }

  @Post("/getsubject")
  @UseGuards(JwtAuthGuard)
  getSubject() {

  }

  @Post("/addstudent")
  @UseGuards(JwtAuthGuard)
  addStudent() {

  }

  @Post("/getstudent")
  @UseGuards(JwtAuthGuard)
  getStudent() {

  }

  @Post("/getnotice")
  @UseGuards(JwtAuthGuard)
  getNotice() {

  }

  @Post("/getadmin")
  @UseGuards(JwtAuthGuard)
  getAdmin() {

  }

  @Post("/deleteadmin")
  @UseGuards(JwtAuthGuard)
  deleteAdmin() {

  }

  @Post("/deletefaculty")
  @UseGuards(JwtAuthGuard)
  deleteFaculty() {

  }

  @Post("/deletestudent")
  @UseGuards(JwtAuthGuard)
  deleteStudent() {

  }

  @Post("/deletedepartment")
  @UseGuards(JwtAuthGuard)
  deleteDepartment() {

  }

  @Post("/deletesubject")
  @UseGuards(JwtAuthGuard)
  deleteSubject() {

  }
}
