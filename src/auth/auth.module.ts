import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from '@Auth/services/auth.service';
import { LocalStrategy } from '@Auth/strategies/local.strategy';
import { JwtConstants } from '@Auth/constants';

import { UsersModule } from '@Users/users.module';

import { BcryptService } from '@Common/utils/bcrypt.service';
import { Env } from '@Common/env-variables';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(Env.JWT_SECRET, JwtConstants.secret),
        signOptions: {
          expiresIn: configService.get(Env.JWT_EXPIRES_IN, JwtConstants.expiresIn)
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    BcryptService,
    AuthService,
    LocalStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
