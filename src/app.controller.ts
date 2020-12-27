
import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { LocalAuthGuard } from '@Auth/guards/local-auth.guard';
import { AuthService } from '@Auth/services/auth.service';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
