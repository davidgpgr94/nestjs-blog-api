
import { IsString } from 'class-validator';

import { UserDto } from '@Users/dtos/user.dto';

export class CreateCommentDto {

  @IsString()
  text: string;

  author: UserDto;

}
