import { BadRequestException, Body, Controller, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ROLE, Roles } from 'src/auth/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import bcrypt from "bcrypt";
import { TestService } from 'src/test/test.service';
import { StudentService } from 'src/student/student.service';
import { MarksService } from 'src/marks/marks.service';
import { SubjectService } from 'src/subject/subject.service';
import { AttendenceService } from 'src/attendence/attendence.service';
@Controller('/api/faculty')
export class FacultyController {
  constructor(
    private readonly authService: AuthService,
    private readonly facultyService: FacultyService,
    private readonly testService: TestService,
    private readonly studentService: StudentService,
    private readonly marksService: MarksService,
    private readonly subjectService: SubjectService,
    private readonly attendenceService: AttendenceService
  ) { }


  @Post("/login")
  @UseGuards(LocalAuthGuard)
  @SetMetadata(ROLE, Roles.FACULTY)
  async login(@Request() req) {
    return this.authService.login(req.user)
  }


  @Post("/updatepassword")
  @UseGuards(JwtAuthGuard)
  async updatedPassword(@Body() body) {
    const { newPassword, confirmPassword, email } = body
    if (newPassword !== confirmPassword) throw new BadRequestException("Your password and confirmation password do not match");
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const faculty = await this.facultyService.update({ email }, { passwordUpdated: true, password: hashedPassword })
    return {
      success: true,
      message: "Password updated successfully",
      response: faculty
    }

  }

  @Post("/updateprofile")
  @UseGuards(JwtAuthGuard)
  updateFaculty(@Body() body) {
    const { name, dob, department, contactNumber, avatar, email, designation } = body
    return this.facultyService.update({ email }, {
      name,
      dob,
      department,
      contactNumber,
      designation,
      avatar
    })
  }


  @Post("/createtest")
  @UseGuards(JwtAuthGuard)
  async createTest(@Body() body) {
    const { subjectCode, department, year, section, date, test, totalMarks } = body
    const existingTest = await this.testService.find({
      subjectCode,
      department,
      year,
      section,
      test
    })

    if (existingTest) throw new BadRequestException("Given Test is already created")

    const newTest = await this.testService.create({
      totalMarks,
      section,
      test,
      date,
      department,
      subjectCode,
      year
    })

    return {
      success: true,
      message: "Test added successfully",
      response: newTest
    }

  }

  @Post("/getTest")
  @UseGuards(JwtAuthGuard)
  async getTest(@Body() body) {
    const { department, year, section } = body
    const tests = await this.testService.find({ department, year, section })
    return {
      result: tests
    }
  }

  @Post("/getstudent")
  @UseGuards(JwtAuthGuard)
  async getStudent(@Body() body) {
    const { department, year, section } = body
    const students = await this.studentService.find({ department, year, section })
    if (students.length === 0) throw new BadRequestException("No Student Found");
    return {
      result: students
    }

  }

  @Post("/uploadmarks")
  @UseGuards(JwtAuthGuard)
  async uploadMarks(@Body() body) {
    const { department, year, section, test, marks } = body
    const existingTest = await this.testService.find({ department, year, section, test })
    const isAlready = await this.marksService.find({ testId: existingTest.id })
    if (isAlready) throw new BadRequestException("You have already uploaded marks of given exam");
    const newMarks = marks.map(mark => ({
      studentId: mark._id,
      testId: existingTest.id,
      marks: mark.value
    }))
    await this.marksService.createMany(newMarks)

    return {
      message: "Marks uploaded successfully"
    }
  }

  @Post("/markattendance")
  @UseGuards(JwtAuthGuard)
  async markAttendance(@Body() body) {
    const { selectedStudents, subjectName, department, year, section } = body
    const sub = await this.subjectService.findOne({ subjectName })
    const allStudents = await this.studentService.find({ department, year, section })
    for (let i = 0; i < allStudents.length; i++) {
      let pre = await this.attendenceService.find({ studentId: allStudents[i].id, subjectId: sub.id });
      if (!pre) {
        pre = await this.attendenceService.create({
          student: {
            connect: { id: allStudents[i].id }
          },
          subject: {
            connect: {
              id: sub.id
            }
          }
        })
      }

      await this.attendenceService.updateOne({ id: pre.id }, { totalLecturesByFaculty: pre.totalLecturesByFaculty + 1 })
    }


    for (let i = 0; i < selectedStudents.length; i++) {
      let pre = await this.attendenceService.find({
        studentId: selectedStudents[i],
        subjectId: sub.id
      });
      if (!pre) {
        pre = await this.attendenceService.create({
          student: {
            connect: {
              id: selectedStudents[i]
            }
          },
          subject: {
            connect: { id: sub.id }
          }
        })
      }

      await this.attendenceService.updateOne({ id: pre.id }, { lectureAttended: pre.lectureAttended + 1 })
      return {
        message: "Attendance Marked successfully"
      }
    }
  }
}
