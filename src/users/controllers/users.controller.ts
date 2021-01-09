import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Param,
  NotFoundException
} from '@nestjs/common';

import { UsersService } from '@Users/services/users.service';
import { CreateUserDto } from '@Users/dtos/create-user.dto';

import { JwtAuthGuard } from '@Auth/guards/jwt-auth.guard';

import { Acl } from '@Acl/decorators/acl.decorator';
import { CheckPolicies } from '@Acl/decorators/check-policies.decorator';
import { CreateUserHandler, SearchUserHandler } from '@Acl/policies';

@Controller('users')
@Acl(JwtAuthGuard)
export class UsersController {

  private readonly logger: Logger;

  constructor(private usersService: UsersService) {
    this.logger = new Logger(UsersController.name);
  }

  @Post()
  @CheckPolicies(CreateUserHandler)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.registerUser(createUserDto);
    } catch (err) {
      throw err;
    }
  }

  @Get(':login')
  @CheckPolicies(SearchUserHandler)
  async findOne(@Param('login') login: string) {
    const user = await this.usersService.findByLogin(login);
    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }


}
