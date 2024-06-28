import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secret: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: number; }) {
    const user = await this.usersService.findUserById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}