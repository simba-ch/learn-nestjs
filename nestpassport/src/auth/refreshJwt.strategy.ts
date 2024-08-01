import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refreshJwt') {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('refreshToken'),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY_REFRESH
        })
    }


    async validate(payload: any) {
        const { username } = payload
        return this.usersService.findOne(username)
    }


}