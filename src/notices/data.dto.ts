import { IsNotEmpty } from 'class-validator';

export class DataDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
