import { BadRequestException, Body, Controller, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ROLE, Roles } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import bcrypt from "bcrypt";
import { TestService } from 'src/test/test.service';
import { SubjectService } from 'src/subject/subject.service';
import { MarksService } from 'src/marks/marks.service';
@Controller('/api/student')
export class StudentController {
  constructor(
    private readonly authService: AuthService,
    private readonly studentService: StudentService,
    private readonly testService: TestService,
    private readonly subjectService: SubjectService,
    private readonly marksService: MarksService
  ) { }

  @Post("/login")
  @UseGuards(LocalAuthGuard)
  @SetMetadata(ROLE, Roles.STUDENT)
  login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post("/updatepassword")
  @UseGuards(JwtAuthGuard)
  async updatedPassword(@Body() body) {
    const { newPassword, confirmPassword, email } = body
    if (newPassword !== confirmPassword) throw new BadRequestException("Your password and confirmation password do not match");
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const student = await this.studentService.update({ email }, {
      password: hashedPassword,
      passwordUpdated: true
    })
    return {
      success: true,
      message: "Password updated successfully",
      response: student
    }
  }


  @Post("/updateprofile")
  @UseGuards(JwtAuthGuard)
  updateStudent(@Body() body) {
    const { name, dob, department, contactNumber, avatar, email, batch, section, year, fatherName, motherName, fatherContactNumber, motherContactNumber } = body
    return this.studentService.update({ email }, {
      name,
      dob,
      department,
      contactNumber,
      avatar,
      batch,
      section, year, fatherName, motherName, fatherContactNumber, motherContactNumber,
    })
  }

  @Post("/testresult")
  @UseGuards(JwtAuthGuard)
  async testResult(@Body() body) {
    const { department, year, section } = body
    const [student, test] = await Promise.all([
      this.studentService.findFirst({
        department,
        year,
        section
      }),
      this.testService.findAll({ department, year, section })
    ])

    if (test.length === 0) throw new BadRequestException("No Test Found")

    const result = []

    for (let i = 0; i < test.length; i++) {
      const subjectCode = test[i].subjectCode;
      const [subject, marks] = await Promise.all([
        this.subjectService.findOne({ subjectCode }),
        this.marksService.find({ studentId: student.id, testId: test[i].id })
      ])

      if (marks) {
        const temp = {
          marks: marks.marks,
          totalMarks: test[i].totalMarks,
          subjectName: subject.subjectName,
          subjectCode,
          test: test[i].test
        }

        result.push(temp)
      }
    }


    return {
      result
    }

  }

  @Post("/attendance")
  @UseGuards(JwtAuthGuard)
  async attendance(@Body() body) {
    const { department, year, section } = body
    const { attendence } = await this.studentService.getAttendance({ department, year, section })
    if (!attendence) throw new BadRequestException("Attendence not found")
    const result = attendence.map(att => ({
      percentage: (att.lectureAttended / att.totalLecturesByFaculty * 100).toFixed(2),
      subjectCode: att.subject.subjectCode,
      subjectName: att.subject.subjectName,
      attended: att.lectureAttended,
      total: att.totalLecturesByFaculty
    }))

    return {
      result
    }
  }

}
