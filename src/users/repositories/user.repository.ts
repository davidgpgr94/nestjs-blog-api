
import { EntityRepository, AbstractRepository } from 'typeorm';

import { User } from '@Users/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {

  async findOneById(id: number) {
    return this.repository.findOne(id);
  }

  async findByLogin(login: string) {
    return this.repository.findOne({ login: login });
  }

}

