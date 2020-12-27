
import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { LocalAuthGuard } from '@Auth/guards/local-auth.guard';

@Controller()
export class AppController {

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

}
