import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateNoticeDto {
  @IsString()
  @IsNotEmpty()
  species: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

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
  comment: string;

  @IsString()
  @IsNotEmpty()
  sex: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  imgURL: string;

  @IsNumber()
  @IsNotEmpty()
  popularity: number;
}

//   owner      User?    @relation(fields: [ownerId], references: [id])
//   ownerId    Int?

// {
//     "species": "dog",
//     "category": "good",
//     "price": 1000,
//     "title": "Cool dog",
//     "name": "El Primo",
//     "comment": "very nice and loyal dog",
//     "birthday": "2020-01-01",
//     "location": "Ukraine, Odesa",
//     "sex": "male",
//     "imgURL": "https://localhost:3001/api/v1/notices",
//     "popularity": 4
// }
