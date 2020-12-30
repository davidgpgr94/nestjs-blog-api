import { Role } from "@Users/enums/role.enum";

export class UserInRequestDto {
  id: number;
  login: string;
  firstname: string;
  lastname: string;
  role: Role;
}
