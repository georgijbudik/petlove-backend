import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  species: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  birthday: string;
  @ApiProperty({ enum: ['male', 'female', 'multiple', 'unknown'] })
  @IsString()
  @IsNotEmpty()
  sex: 'male' | 'female' | 'multiple' | 'unknown';
  @ApiProperty({ required: false })
  @IsString()
  imgURL: string;
}
