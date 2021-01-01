
import { Role } from '@Users/enums/role.enum';

export class JwtPayload {
  sub: number;
  login: string;
  firstname: string;
  lastname: string;
  role: Role;
}
