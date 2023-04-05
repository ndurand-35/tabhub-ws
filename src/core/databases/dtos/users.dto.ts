import { Match } from '@/core/utils/util';
import { IsString, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  @Match(CreateUserDto, (prop) => prop.password)
  public password_confirm: string;
}
