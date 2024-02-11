import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

import { News } from '@prisma/client';

import { PaginatedOutputDto } from './pagination-output.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 6,
  ): Promise<PaginatedOutputDto<News>> {
    return await this.newsService.getAll({ page, perPage });
  }
}
