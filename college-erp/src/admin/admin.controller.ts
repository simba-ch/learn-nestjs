import { BadRequestException, Body, Controller, Get, Post, Request, ServiceUnavailableException, SetMetadata, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ROLE, Roles } from 'src/auth/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import { StudentService } from 'src/student/student.service';
import { NoticeService } from 'src/notice/notice.service';
import { FacultyService } from 'src/faculty/faculty.service';
import { DepartmentService } from 'src/department/department.service';
import { SubjectService } from 'src/subject/subject.service';
import { generateDob } from 'src/utils';
import { Admin } from '@prisma/client';

@Controller('/api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly authService: AuthService,
    private readonly studentService: StudentService,
    private readonly noticeService: NoticeService,
    private readonly facultyService: FacultyService,
    private readonly departmentService: DepartmentService,
    private readonly subjectService: SubjectService
  ) { }


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
    try {
      const admin = await this.adminService.updated({
        email
      }, {
        password: hashedPassword,
        passwordUpdated: true
      })
      return {
        success: true,
        message: "Password updated successfull",
        response: admin
      }
    } catch (err) {
      throw new ServiceUnavailableException(err)
    }

  }


  @Get("/getallstudent")
  @UseGuards(JwtAuthGuard)
  getAllStudent() {
    return this.studentService.find()
  }

  @Post("/createnotice")
  @UseGuards(JwtAuthGuard)
  async createNotice(@Body() body) {

    const { from, content, topic, date, noticeFor } = body;

    const notice = await this.noticeService.findOne({
      topic, content, date
    })
    if (notice) {
      throw new BadRequestException("Notice already created")
    }
    const newNotice = await this.noticeService.createOne({
      from,
      content,
      topic,
      noticeFor,
      date,
    })

    return {
      success: true,
      message: "Notice created successfully",
      response: newNotice
    }

  }

  @Get("/getallfaculty")
  @UseGuards(JwtAuthGuard)
  getAllFaculty() {
    return this.facultyService.find()
  }

  @Get("/getalldepartment")
  @UseGuards(JwtAuthGuard)
  getAllDepartment() {
    return this.departmentService.find()
  }

  @Get("/getalldepartment")
  @UseGuards(JwtAuthGuard)
  getAllSubject() {
    return this.subjectService.find()
  }

  @Get("/getalladmin")
  @UseGuards(JwtAuthGuard)
  getAllAdmin() {
    return this.adminService.find()
  }

  @Post("/updateprofile")
  @UseGuards(JwtAuthGuard)
  updateAdmin(@Body() body) {
    const { name, dob, department, contactNumber, avatar, email } = body
    return this.adminService.updated({ email }, {
      name,
      dob,
      department,
      contactNumber,
      avatar,
      email
    })

  }

  @Post("/addadmin")
  @UseGuards(JwtAuthGuard)
  async addAdmin(@Body() body) {
    const { name, dob, department, contactNumber, avatar, email, joiningYear } = body
    const existingAdmin = await this.adminService.findOne({ email })
    if (existingAdmin) throw new BadRequestException("Email already exists")
    const existingDepartment = await this.departmentService.findOne({ department })
    let departmentHelper = existingDepartment.departmentCode;
    const admins = await this.adminService.find({ department })
    let helper = admins.length.toString().padStart(3, "0");
    const date = new Date();
    const components = ["ADM", date.getFullYear(), departmentHelper, helper]
    const username = components.join("")
    const newDob = generateDob(dob);
    const hashedPassword = await bcrypt.hash(newDob, 10)
    const newAdmin = await this.adminService.create({
      name,
      email,
      password: hashedPassword,
      joiningYear,
      username,
      department,
      avatar,
      contactNumber,
      dob
    })

    return {
      success: true,
      message: "Admin registerd successfully",
      response: newAdmin
    }
  }

  @Post("/adddepartment")
  @UseGuards(JwtAuthGuard)
  async addDepartment(@Body("department") deparment) {
    const newDepartment = await this.departmentService.addOne(deparment)
    return {
      success: true,
      message: "Department added successfully",
      response: newDepartment
    }
  }

  @Post("/addfaculty")
  @UseGuards(JwtAuthGuard)
  async addFaculty(@Body() body) {
    const { name, dob, department, contactNumber, avatar, email, joiningYear, gender, designation } = body
    const existingFaculty = await this.facultyService.findOne({ email })
    if (existingFaculty) throw new BadRequestException("Email already exists")
    const existingDepartment = await this.departmentService.findOne({ department })
    const departmentHelper = existingDepartment.departmentCode
    const faculties = await this.facultyService.find({ department })
    const helper = faculties.length.toString().padStart(3, "0")
    const date = new Date()
    const components = ["FAC", date.getFullYear(), departmentHelper, helper]
    const username = components.join("")
    const newDob = generateDob(dob)
    const hashedPassword = await bcrypt.hash(newDob, 10)
    const newFaculty = await this.facultyService.create({
      name,
      email,
      password: hashedPassword,
      joiningYear,
      username,
      department,
      avatar,
      contactNumber,
      dob,
      gender,
      designation,
    })

    return {
      success: true,
      message: "Faculty registerd successfully",
      response: newFaculty
    }
  }

  @Post("/getfaculty")
  @UseGuards(JwtAuthGuard)
  async getFaculty(@Body("department") department) {
    const faculties = await this.facultyService.find({ department })
    if (faculties.length === 0) throw new BadRequestException("No Faculty Found")
    return {
      result: faculties
    }
  }

  @Post("/addsubject")
  @UseGuards(JwtAuthGuard)
  async addSubject(@Body() body) {
    const { totalLectures, department, subjectCode, subjectName, year } = body
    const subject = await this.subjectService.findOne({ subjectCode })
    if (subject) throw new BadRequestException("Given Subject is already added")
    const newSubject = await this.subjectService.create({
      totalLectures,
      department,
      subjectCode,
      subjectName,
      year
    })

    return {
      success: true,
      message: "Subject added successfully",
      response: newSubject
    }

  }

  @Post("/getsubject")
  @UseGuards(JwtAuthGuard)
  async getSubject(@Body("department") department, @Body("year") year) {
    const subjects = await this.subjectService.find({ department, year })
    if (subjects.length === 0) throw new BadRequestException("No Subject Found")
    return {
      result: subjects
    }
  }

  @Post("/addstudent")
  @UseGuards(JwtAuthGuard)
  async addStudent(@Body() body) {
    const { name, dob, department, contactNumber, avatar, email, section, gender, batch, fatherName, motherName, fatherContactNumber, motherContactNumber, year } = body
    const existingStudent = await this.studentService.findOne({ email })
    if (existingStudent) throw new BadRequestException("Email already exists")
    const existingDepartment = await this.departmentService.findOne({ department })
    const departmentHelper = existingDepartment.departmentCode
    const students = await this.studentService.find({ department })
    const helper = students.length.toString().padStart(3, "0")
    const date = new Date();
    const components = ["STU", date.getFullYear(), departmentHelper, helper]
    const username = components.join("")
    const newDob = generateDob(dob)
    const hashedPassword = await bcrypt.hash(newDob, 10)

    const newStudent = await this.studentService.create({
      name,
      dob,
      password: hashedPassword,
      username,
      department,
      contactNumber,
      avatar,
      email,
      section,
      gender,
      batch,
      fatherName,
      motherName,
      fatherContactNumber,
      motherContactNumber,
      year,
    })

    const subjects = await this.subjectService.find({ department, year })
    if (subjects.length !== 0) {
      for (let i = 0; i < subjects.length; i++) {
        await this.subjectService.update({
          id: subjects[i].id
        }, {
          students: {
            create: {
              student: {
                connect: newStudent
              }
            }
          }
        })
      }
    }

    return {
      success: true,
      message: "Student registerd successfully",
      response: newStudent
    }
  }

  @Post("/getstudent")
  @UseGuards(JwtAuthGuard)
  async getStudent(@Body("department") department, @Body("year") year) {
    const students = await this.studentService.find({ department, year })
    if (students.length === 0) throw new BadRequestException("No Student Found")
    return {
      result: students
    }
  }

  @Post("/getnotice")
  @UseGuards(JwtAuthGuard)
  async getNotice() {
    const notices = await this.noticeService.find()
    if (notices.length === 0) throw new BadRequestException("No Notice Found")
    return {
      result: notices
    }
  }

  @Post("/getadmin")
  @UseGuards(JwtAuthGuard)
  async getAdmin(@Body("department") department) {
    const admins = await this.adminService.find()
    if (admins.length === 0) throw new BadRequestException("No Admin Found")
    return {
      result: admins
    }
  }

  @Post("/deleteadmin")
  @UseGuards(JwtAuthGuard)
  async deleteAdmin(@Body() admins: Admin[]) {
    let count = 0
    const promiseArr = admins.map(admin => admin.id).map(id => {
      return async () => {
        await this.adminService.delete({ id })
        count += 1;
      }
    })

    await Promise.all(promiseArr)

    return {
      message: "Admins Deleted",
      result: count
    }
  }

  @Post("/deletefaculty")
  @UseGuards(JwtAuthGuard)
  async deleteFaculty(@Body("faculties") faculties) {
    await Promise.all(faculties.map(facultyId => this.facultyService.delete({ id: facultyId })))
    return {
      message: "Faculty Deleted"
    }
  }

  @Post("/deletestudent")
  @UseGuards(JwtAuthGuard)
  async deleteStudent(@Body("students") students) {
    await Promise.all(students.map(studentId => this.studentService.delete({ id: studentId })))
    return {
      message: "Student Deleted"
    }
  }

  @Post("/deletedepartment")
  @UseGuards(JwtAuthGuard)
  async deleteDepartment(@Body("department") department) {
    await this.departmentService.delete({ department })
    return {
      message: "Student Deleted"
    }
  }

  @Post("/deletesubject")
  @UseGuards(JwtAuthGuard)
  async deleteSubject(@Body("subjects") subjects) {
    await Promise.all(subjects.map(subjectId => this.subjectService.delete({ id: subjectId })))
    return {
      message: "Subject Deleted"
    }
  }
}
