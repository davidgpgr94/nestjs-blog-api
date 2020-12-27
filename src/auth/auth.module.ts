import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';

import { AuthService } from '@Auth/services/auth.service';
import { LocalStrategy } from '@Auth/strategies/local.strategy';
import { UsersModule } from '@Users/users.module';
import { BcryptService } from '@Common/utils/bcrypt.service';

@Module({
  imports: [
    UsersModule,
    PassportModule
  ],
  providers: [
    BcryptService,
    AuthService,
    LocalStrategy
  ]
})
export class AuthModule {}
