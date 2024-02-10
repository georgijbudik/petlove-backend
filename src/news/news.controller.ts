import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { INews } from './news.type';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getAll(): Promise<INews[]> {
    return await this.newsService.getAll();
  }
}
