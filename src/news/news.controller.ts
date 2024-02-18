import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

import { News } from '@prisma/client';

import { PaginatedOutputDto } from '../prisma/dto/pagination-output.dto';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { responses } from 'src/apiResponses/responses';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'Get news' })
  @ApiOkResponse({ description: responses.success })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 6,
    @Query('search') search: string,
  ): Promise<PaginatedOutputDto<News>> {
    return await this.newsService.getAll({ page, perPage, search });
  }
}
