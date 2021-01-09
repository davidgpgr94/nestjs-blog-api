import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BcryptService } from '@Common/utils/bcrypt.service';
import { UsersService } from '@Users/services/users.service';
import { User } from '@Users/entities/user.entity';

import { JwtPayload } from '@Auth/dtos/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptService: BcryptService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByLogin(login);
    if (user) {
      const comparedPassword = await this.bcryptService.compare(password, user.hashedPassword);
      if (comparedPassword) return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      login: user.login,
      sub: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role
    };

    return this.jwtService.sign(payload);
  }

  async retrieveUserFromJwt(jwtPayload: JwtPayload): Promise<User | null> {
    const user: User = await this.usersService.findById(jwtPayload.sub);
    if (user) {
      if (user.login === jwtPayload.login) {
        return user;
      }
    }
    return null;
  }

}
