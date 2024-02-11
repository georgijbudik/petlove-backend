import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { News, Prisma } from '@prisma/client';

import { createPaginator } from 'prisma-pagination';
import { PaginatedOutputDto } from './pagination-output.dto';

@Injectable()
export class NewsRepository {
  constructor(private prisma: PrismaService) {}

  async getAll({
    page,
    perPage,
  }: {
    page?: number;
    perPage?: number;
  }): Promise<PaginatedOutputDto<News>> {
    const paginate = createPaginator({ perPage });

    return paginate<News, Prisma.NewsFindManyArgs>(
      this.prisma.news,
      {
        where: {},
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
