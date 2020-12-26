
import { IsString, Length, MaxLength, MinLength } from 'class-validator';
import { Match } from '@Common/decorators/match.decorator';

export class CreateUserDto {

  @IsString()
  @Length(7, 7)
  login: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @Match('password')
  repeatPassword: string;

}
