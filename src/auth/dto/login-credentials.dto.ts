import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginCredentialsDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, {
    message: 'Invalid email type',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
