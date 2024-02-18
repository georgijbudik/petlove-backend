import { Controller, Get } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Friend } from '@prisma/client';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { responses } from 'src/apiResponses/responses';

@ApiTags('Friends')
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiOperation({ summary: 'Get Petlove friends' })
  @ApiOkResponse({ description: responses.success })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get()
  getAllFriends(): Promise<Friend[]> {
    return this.friendsService.getAllFriends();
  }
}
