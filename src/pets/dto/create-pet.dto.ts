import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  species: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  birthday: string;

  @IsString()
  @IsNotEmpty()
  sex: 'male' | 'female' | 'multiple' | 'unknown';

  @IsString()
  imgURL: string;
}
