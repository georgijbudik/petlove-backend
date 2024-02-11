import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { News } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<News[]> {
    return await this.prisma.news.findMany();
  }
}
