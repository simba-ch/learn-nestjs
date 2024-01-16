import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { FacultyService } from 'src/faculty/faculty.service';
import { StudentService } from 'src/student/student.service';
import { Roles } from './role.enum';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService {
    constructor(private readonly adminService: AdminService,
        private readonly facultyService: FacultyService,
        private readonly studentService: StudentService,
        private readonly jwtService: JwtService
    ) {

    }

    async validate(userType: Roles, username: string, password: string) {
        let userService;
        switch (userType) {
            case Roles.ADMIN:
                userService = this.adminService
                break;
            case Roles.FACULTY:
                userService = this.facultyService
                break;
            default:
                userService = this.studentService
                break;
        }

        const user = await userService.findOne({ username })
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result
        }
        throw new UnauthorizedException()
    }


    async login(user: any) {
        const payload = { email: user.email, id: user.id }
        return { result: user, token: this.jwtService.sign(payload) }
    }


}
