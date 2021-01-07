import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from '@Users/services/users.service';
import { UserRepository } from '@Users/repositories/user.repository';
import { UsersController } from '@Users/controllers/users.controller';

import { BcryptService } from '@Common/utils/bcrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository
    ])
  ],
  providers: [
    UsersService,
    BcryptService
  ],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
