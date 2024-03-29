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
        phone: '',
        token: '',
      },
    });
  }

  async findById(id: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { email } });
  }

  async getCurrent(id: string) {
    const currentUser = await this.findById(id);

    const favorites = await this.prismaService.notice.findMany({
      where: {
        id: {
          in: currentUser.favoritesIDs,
        },
      },
    });
    const viewed = await this.prismaService.notice.findMany({
      where: {
        id: {
          in: currentUser.viewedIDs,
        },
      },
    });

    return {
      ...currentUser,
      favoritesIDs: favorites,
      viewedIDs: viewed,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }
  async updateAvatar(id: string, profileUrl: string): Promise<string> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { profileUrl },
    });

    return user.profileUrl;
  }
}
