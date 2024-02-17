import { Exclude } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { emailRegexp } from 'src/constants/emailRegexp';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(emailRegexp, {
    message: 'Invalid email type',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @IsString()
  @IsOptional()
  token: string;
}
