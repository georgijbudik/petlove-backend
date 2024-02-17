import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(createPetDto: CreatePetDto, id: string) {
    const data = {
      ...createPetDto,
      ownerId: id,
    };
    return this.prisma.pet.create({ data });
  }

  async findAll(id: string) {
    return await this.prisma.pet.findMany({
      where: {
        ownerId: {
          equals: id,
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.pet.delete({
      where: {
        id,
      },
    });
  }
}
