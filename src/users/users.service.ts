import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        ...createUserDto,
        profileUrl: '',
        token: '',
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findById(id: number): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }
}
