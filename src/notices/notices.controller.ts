import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NoticesService } from './notices.service';

import { ParseIntPipe, DefaultValuePipe, ParseBoolPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { responses } from 'src/apiResponses/responses';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/common/access.guard';

@ApiTags('Notices')
@ApiInternalServerErrorResponse({ description: 'Server error' })
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @ApiOperation({ summary: 'Get notices' })
  @ApiOkResponse({ description: responses.success })
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(6), ParseIntPipe) perPage: number,
    @Query('search') search: string,
    @Query('location') location: string,
    @Query('category') category: string,
    @Query('gender') gender: string,
    @Query('type') type: string,
    @Query('popular', new DefaultValuePipe(false), ParseBoolPipe)
    popular: boolean,
    @Query('unpopular', new DefaultValuePipe(false), ParseBoolPipe)
    unpopular: boolean,
    @Query('expensive', new DefaultValuePipe(false), ParseBoolPipe)
    expensive: boolean,
    @Query('cheap', new DefaultValuePipe(false), ParseBoolPipe)
    cheap: boolean,
  ) {
    return this.noticesService.findAll({
      page,
      perPage,
      search,
      location,
      category,
      gender,
      type,
      popular,
      unpopular,
      expensive,
      cheap,
    });
  }

  @ApiOperation({ summary: 'Get notice categories' })
  @ApiOkResponse({ description: responses.success })
  @Get('/categories')
  getCategories() {
    return this.noticesService.getCategories();
  }

  @ApiOperation({ summary: 'Get notice sex' })
  @ApiOkResponse({ description: responses.success })
  @Get('/sex')
  getSex() {
    return this.noticesService.getSex();
  }

  @ApiOperation({ summary: 'Get notice species' })
  @ApiOkResponse({ description: responses.success })
  @Get('/species')
  getSpecies() {
    return this.noticesService.getSpecies();
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Add favorite notice' })
  @ApiCreatedResponse({ status: 201, description: responses.success })
  @ApiBearerAuth()
  @Post('/favorites/add/:id')
  addNoticeToFavorites(@Param('id') noticeId: string, @GetUser() user: User) {
    return this.noticesService.addNoticeToFavorites(noticeId, user);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Remove favorite notice' })
  @ApiOkResponse({ description: responses.success })
  @ApiBearerAuth()
  @Delete('/favorites/remove/:id')
  removeNoticeFromFavorites(
    @Param('id') noticeId: string,
    @GetUser() user: User,
  ) {
    return this.noticesService.removeNoticeFromFavorites(noticeId, user);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Add viewed notice' })
  @ApiCreatedResponse({ status: 201, description: responses.success })
  @ApiBearerAuth()
  @Post('/viewed/add/:id')
  addNoticeToViewed(@Param('id') noticeId: string, @GetUser() user: User) {
    return this.noticesService.addNoticeToViewed(noticeId, user);
  }
}
