import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { emailRegexp } from 'src/constants/emailRegexp';

export class LoginCredentialsDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Matches(emailRegexp, {
    message: 'Invalid email type',
  })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
