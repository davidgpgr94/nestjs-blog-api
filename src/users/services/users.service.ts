import { Injectable } from '@nestjs/common';

import { UserRepository } from '@Users/repositories/user.repository';

@Injectable()
export class UsersService {

  constructor(private userRepository: UserRepository) {}

  async findByLogin(login: string) {
    return this.userRepository.findByLogin(login);
  }

}
