import { Role } from '@Users/enums/role.enum';

export class UserDto {
  id: number;
  login: string;
  firstname: string;
  lastname: string;
  role: Role;
}
