import { Friend } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

export class FriendsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllFriends(): Promise<Friend[]> {
    return this.prismaService.friend.findMany();
  }
}
