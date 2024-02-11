import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from '@prisma/client';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getAll(): Promise<News[]> {
    return await this.newsService.getAll();
  }
}
