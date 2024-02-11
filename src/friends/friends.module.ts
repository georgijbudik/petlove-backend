import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { PrismaService } from 'src/prisma.service';
import { FriendsRepository } from './friends.repository';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, FriendsRepository, PrismaService],
})
export class FriendsModule {}
