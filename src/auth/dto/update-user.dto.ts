import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false, example: 'John' })
  name?: string;

  @ApiProperty({ required: false, example: 'john@example.com' })
  email?: string;
}
