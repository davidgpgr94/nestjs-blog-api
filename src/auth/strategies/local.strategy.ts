
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '@Auth/services/auth.service';
import { UserInRequestDto } from '@Auth/dtos/user-in-request.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super({
      usernameField: 'login',
      passwordField: 'password'
    });
  }

  async validate(username: string, password: string): Promise<UserInRequestDto> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}
