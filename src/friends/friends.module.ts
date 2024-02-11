import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { FriendsRepository } from './friends.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, FriendsRepository, PrismaService],
})
export class FriendsModule {}
