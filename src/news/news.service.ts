import { Injectable } from '@nestjs/common';
import { NewsRepository } from './news.repository';
import { News } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async getAll(): Promise<News[]> {
    return await this.newsRepository.getAll();
  }
}
