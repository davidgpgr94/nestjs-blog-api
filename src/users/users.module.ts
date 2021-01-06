import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from '@Users/services/users.service';
import { UserRepository } from '@Users/repositories/user.repository';
import { UsersController } from '@Users/controllers/users.controller';

import { CaslModule } from '@Acl/casl.module';

import { BcryptService } from '@Common/utils/bcrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository
    ]),
    CaslModule
  ],
  providers: [
    UsersService,
    BcryptService
  ],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
