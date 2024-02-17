import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(createPetDto: CreatePetDto) {
    return this.prisma.pet.create({ data: createPetDto });
  }

  async findAll() {
    return await this.prisma.pet.findMany();
  }

  async remove(id: string) {
    return await this.prisma.pet.delete({
      where: {
        id,
      },
    });
  }
}
