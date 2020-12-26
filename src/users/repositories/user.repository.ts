
import { EntityRepository, AbstractRepository } from 'typeorm';

import { User } from '@Users/entities/user.entity';
import { RegisterUserDto } from '@Users/dtos/register-user.dto';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {

  async findOneById(id: number) {
    return this.repository.findOne(id);
  }

  async findByLogin(login: string) {
    return this.repository.findOne({ login: login });
  }

  async create(registerUserDto: RegisterUserDto) {
    const user = this.repository.create(registerUserDto);
    const userSaved = await this.repository.save(user);
    return userSaved;
  }

}

