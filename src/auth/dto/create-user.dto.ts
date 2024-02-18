import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { emailRegexp } from 'src/constants/emailRegexp';

export class CreateUserDto {
  @ApiProperty({ example: 'petlove@mail.com' })
  @IsString()
  @IsNotEmpty()
  @Matches(emailRegexp, {
    message: 'Invalid email type',
  })
  email: string;

  @ApiProperty({ example: 'Sergey Petlove' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ minimum: 7, example: '1234567' })
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  token: string;
}
