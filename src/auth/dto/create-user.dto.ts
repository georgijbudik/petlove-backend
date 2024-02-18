import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(emailRegexp, {
    message: 'Invalid email type',
  })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  token: string;
}
