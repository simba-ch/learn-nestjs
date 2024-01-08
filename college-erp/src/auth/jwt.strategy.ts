import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
const JWT_SECRET = process.env.JWT_SECRET

export class JwtStratege extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET
    })
  }

  async validate(payload) {
    return {
      userId: payload.sub,
      username: payload.username
    }
  }
}