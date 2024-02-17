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

  async findById(id: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { email } });
  }

  async getCurrent(id: string) {
    return await this.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }
  async updateAvatar(id: string, profileUrl: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: { profileUrl },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }
}
