import { Injectable } from '@nestjs/common';
import { Friend } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllFriends(): Promise<Friend[]> {
    return await this.prismaService.friend.findMany();
  }
}
