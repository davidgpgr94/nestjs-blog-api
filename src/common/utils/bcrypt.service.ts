
import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {

  private static readonly SALT_ROUNDS: number = 10;

  async compare(rawStr: string, hashedStr: string) {
    return bcrypt.compare(rawStr, hashedStr);
  }

  async hash(rawStr: string, salt?: string) {
    return bcrypt.hash(rawStr, salt || BcryptService.SALT_ROUNDS);
  }

  async genSalt() {
    return bcrypt.genSalt(BcryptService.SALT_ROUNDS);
  }

}
