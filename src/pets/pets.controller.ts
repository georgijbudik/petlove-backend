import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { AccessTokenGuard } from 'src/auth/common/access.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '@prisma/client';

@UseGuards(AccessTokenGuard)
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@GetUser() user: User, @Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto, user.id);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.petsService.findAll(user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
