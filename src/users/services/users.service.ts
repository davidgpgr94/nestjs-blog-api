import { BadRequestException, Injectable, InternalServerErrorException, Logger} from '@nestjs/common';

import { UserRepository } from '@Users/repositories/user.repository';
import { CreateUserDto } from '@Users/dtos/create-user.dto';
import { RegisterUserDto } from '@Users/dtos/register-user.dto';
import { UserDto } from '@Users/dtos/user.dto';

import { BcryptService } from '@Common/utils/bcrypt.service';
import { DbErrors } from '@Common/database/database-errors';

@Injectable()
export class UsersService {

  private readonly logger: Logger;

  constructor(
    private userRepository: UserRepository,
    private bcryptService: BcryptService
  ) {
    this.logger = new Logger(UsersService.name);
  }

  async findByLogin(login: string) {
    return this.userRepository.findByLogin(login);
  }

  async findById(id: number) {
    return this.userRepository.findOneById(id);
  }

  async registerUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { password, repeatPassword, ...userData } = createUserDto;
    const hashedPassword = await this.bcryptService.hash(password);
    const dbInsertUserDto: RegisterUserDto = {...userData, hashedPassword};
    try {
      const userCreated = await this.userRepository.create(dbInsertUserDto);
      return {
        id: userCreated.id,
        firstname: userCreated.firstname,
        lastname: userCreated.lastname,
        login: userCreated.login,
        role: userCreated.role
      }
    } catch (err) {
      if (err?.code === DbErrors.UniqueViolation) {
        throw new BadRequestException('User with that login already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

}
