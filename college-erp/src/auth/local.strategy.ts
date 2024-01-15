import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super()
    }

    async validate(...params): Promise<any> {
        const [username, password, verifiedHandler] = params
        // const verifiedResult = await verifiedHandler(1,2,3,4,1)
        // const user = await this.authService.validateAdmin(username, password)
        // if (!user) throw new UnauthorizedException()
        return null
    }
}
