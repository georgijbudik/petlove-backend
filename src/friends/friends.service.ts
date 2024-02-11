import { Injectable } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';
import { Friend } from '@prisma/client';

@Injectable()
export class FriendsService {
  constructor(private readonly friendsRepository: FriendsRepository) {}
  async getAllFriends(): Promise<Friend[]> {
    return this.friendsRepository.getAllFriends();
  }
}
