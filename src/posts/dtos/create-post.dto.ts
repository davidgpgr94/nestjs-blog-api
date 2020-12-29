
import { IsString } from 'class-validator';

import { UserDto } from '@Users/dtos/user.dto';

export class CreatePostDto {

  @IsString()
  title: string;

  @IsString()
  text: string;

  author: UserDto;

}
