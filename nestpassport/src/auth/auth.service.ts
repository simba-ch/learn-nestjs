import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username)

        if (user && user.password === pass) {
            const { password, ...result } = user

            return result
        }

        return null
    }


    async login(user: User) {
        const { username, userId } = user
        const accessPayload = {
            username,
            sub: userId
        }
        const refreshPayload = {
            username
        }

        return {
            access_token: this.jwtService.sign(accessPayload),
            refresh_token: this.jwtService.sign(refreshPayload, {
                expiresIn: "2h",
                secret:process.env.SECRET_KEY_REFRESH
            })
        }
    }

}
