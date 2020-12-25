import { Module } from '@nestjs/common';

import { AuthService } from '@Auth/services/auth.service';
import { UsersModule } from '@Users/users.module';
import { BcryptService } from '@Common/utils/bcrypt.service';

@Module({
  imports: [UsersModule],
  providers: [
    BcryptService,
    AuthService,
  ]
})
export class AuthModule {}
