import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BcryptService } from '@Common/utils/bcrypt.service';
import { UsersService } from '@Users/services/users.service';

import { JwtPayload } from '@Auth/dtos/jwt-payload.dto';
import { UserInRequestDto } from '@Auth/dtos/user-in-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptService: BcryptService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string): Promise<UserInRequestDto | null> {
    const user = await this.usersService.findByLogin(login);
    if (user) {
      const comparedPassword = await this.bcryptService.compare(password, user.hashedPassword);
      if (comparedPassword) {
        const { hashedPassword, createdAt, updatedAt, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: UserInRequestDto) {
    const payload: JwtPayload = {
      login: user.login,
      sub: user.id,
      firstname: user.firstname,
      lastname: user.lastname
    };

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async retrieveUserFromJwt(jwtPayload: JwtPayload): Promise<UserInRequestDto | null> {
    const fullUser = await this.usersService.findById(jwtPayload.sub);
    if (fullUser) {
      if (fullUser.login === jwtPayload.login) {
        const { hashedPassword, createdAt, updatedAt, ...user } = fullUser;
        return user;
      }
    }
    return null;
  }

}
