import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, PrismaService],
})
export class FriendsModule {}
