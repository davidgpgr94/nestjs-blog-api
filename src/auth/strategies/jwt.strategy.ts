
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '@Common/env-variables';
import { User } from '@Users/entities/user.entity';

import { JwtConstants } from '@Auth/constants';
import { JwtPayload } from '@Auth/dtos/jwt-payload.dto';
import { AuthService } from '@Auth/services/auth.service';

interface FullJwtPayload extends JwtPayload {
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(Env.JWT_SECRET, JwtConstants.secret)
    });
  }

  async validate(fullPayload: FullJwtPayload): Promise<User> {
    const { exp, iat, ...payload } = fullPayload;
    const user = await this.authService.retrieveUserFromJwt(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}
