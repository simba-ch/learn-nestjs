import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from "@nestjs/jwt";
import { User as UserModel } from "@prisma/client";
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }


    async signIn(username: string, pass: string): Promise<any | UnauthorizedException> {
        const user = await this.usersService.findOne(username);
        if (user.password !== pass) throw new UnauthorizedException();

        const payload = {
            sub: user.id,
            username: user.username
        }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }

    }

    async signUp(username: string, password: string): Promise<UserModel> {
        return await this.usersService.create(username, password)
    }


    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result
        }
        return null
    }


    async login(user: any) {
        const payload = { username: user.username, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
