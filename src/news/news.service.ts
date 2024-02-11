import { Injectable } from '@nestjs/common';
import { NewsRepository } from './news.repository';

import { News } from '@prisma/client';

import { PaginatedOutputDto } from './pagination-output.dto';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async getAll({
    page,
    perPage,
  }: {
    page?: number;
    perPage?: number;
  }): Promise<PaginatedOutputDto<News>> {
    return await this.newsRepository.getAll({ page, perPage });
  }
}
