import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BcryptService } from '@Common/utils/bcrypt.service';
import { User } from '@Users/entities/user.entity';
import { UsersService } from '@Users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptService: BcryptService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.findByLogin(login);
    if (user) {
      const comparedPassword = await this.bcryptService.compare(password, user.hashedPassword);
      if (comparedPassword) {
        const { hashedPassword, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: Partial<User>) {
    const payload = {
      login: user.login,
      sub: user.id,
      firstname: user.firstname,
      lastname: user.lastname
    };

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
