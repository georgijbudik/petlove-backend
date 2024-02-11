import { Controller, Get } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Friend } from '@prisma/client';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  getAllFriends(): Promise<Friend[]> {
    return this.friendsService.getAllFriends();
  }
}
