
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '@AppRoot/common/env-variables';

import { JwtConstants } from '@Auth/constants';
import { JwtPayload } from '@Auth/dtos/jwt-payload.dto';
import { AuthService } from '@Auth/services/auth.service';
import { UserInRequestDto } from '@Auth/dtos/user-in-request.dto';

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

  async validate(fullPayload: FullJwtPayload): Promise<UserInRequestDto> {
    const { exp, iat, ...payload } = fullPayload;
    const user = await this.authService.retrieveUserFromJwt(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}
