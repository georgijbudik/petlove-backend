import { Injectable } from '@nestjs/common';

import { News, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { PaginatedOutputDto } from '../prisma/dto/pagination-output.dto';
import { createPaginator } from 'prisma-pagination';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async getAll({
    page,
    perPage,
    search,
  }: {
    page?: number;
    perPage?: number;
    search?: string;
  }): Promise<PaginatedOutputDto<News>> {
    const paginate = createPaginator({ perPage });

    return paginate<News, Prisma.NewsFindManyArgs>(
      this.prisma.news,
      {
        where: {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        orderBy: {
          id: 'asc',
        },
      },
      {
        page,
      },
    );
  }
}
