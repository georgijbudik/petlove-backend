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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { responses } from 'src/apiResponses/responses';

@ApiTags('Pets')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiOperation({ summary: 'Add own pet' })
  @ApiCreatedResponse({ description: responses.success })
  @Post()
  create(@GetUser() user: User, @Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto, user.id);
  }

  @ApiOperation({ summary: 'Get own pets' })
  @ApiOkResponse({ description: responses.success })
  @Get()
  findAll(@GetUser() user: User) {
    return this.petsService.findAll(user.id);
  }
  @ApiOperation({ summary: 'Remove pet by id' })
  @ApiOkResponse({ description: responses.success })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
