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
        console.log("🚀 ~ file: local-strategy.ts:11 ~ LocalStrategy ~ validate ~ params:", params)
        const [username, password, verifiedHandler] = params
        // const verifiedResult = await verifiedHandler(1,2,3,4,1)
        // console.log("🚀 ~ file: local-strategy.ts:15 ~ LocalStrategy ~ validate ~ verifiedResult:", verifiedResult)
        // const user = await this.authService.validateAdmin(username, password)
        // if (!user) throw new UnauthorizedException()
        return null
    }
}
