import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { petSexEnum } from 'src/constants/petSexEnum';

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
  @ApiProperty({ type: Date, example: '2024-01-01' })
  @IsString()
  @IsNotEmpty()
  birthday: string;
  @ApiProperty({ enum: petSexEnum })
  @IsString()
  @IsNotEmpty()
  sex: 'male' | 'female' | 'multiple' | 'unknown';
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsString()
  imgURL: string;
}
