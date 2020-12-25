import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from '@Users/services/users.service';
import { UserRepository } from '@Users/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository
    ])
  ],
  providers: [ UsersService ],
  exports: [ UsersService ]
})
export class UsersModule {}
