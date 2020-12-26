import { Body, Controller, Logger, Post } from '@nestjs/common';

import { UsersService } from '@Users/services/users.service';
import { CreateUserDto } from '@Users/dtos/create-user.dto';

@Controller('users')
export class UsersController {

  private readonly logger: Logger;

  constructor(private usersService: UsersService) {
    this.logger = new Logger(UsersController.name);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.registerUser(createUserDto);
    } catch (err) {
      throw err;
    }
  }


}
