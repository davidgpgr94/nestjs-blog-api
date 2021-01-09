
import { Controller, UseGuards, Post, Get } from '@nestjs/common';

import { LocalAuthGuard } from '@Auth/guards/local-auth.guard';
import { AuthService } from '@Auth/services/auth.service';
import { ReqUser } from '@Auth/decorators/user.decorator';
import { User } from '@Users/entities/user.entity';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@ReqUser() user: User) {
    return { token: await this.authService.login(user) };
  }

}
