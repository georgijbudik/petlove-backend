import { Injectable } from '@nestjs/common';

import { PaginatedOutputDto } from 'src/prisma/dto/pagination-output.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Notice } from '@prisma/client';

import { createPaginator } from 'prisma-pagination';

interface IGetAllQueries {
  page?: number;
  perPage?: number;
  search?: string;
  category?: string;
  gender?: string;
  type?: string;
  byPopularity?: string;
  byPrice?: string;
}

@Injectable()
export class NoticesService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    page,
    perPage,
    search,
    category,
    gender,
    type,
    byPopularity,
    byPrice,
  }: IGetAllQueries): Promise<PaginatedOutputDto<Notice>> {
    const paginate = createPaginator({ perPage });

    return await paginate<Notice, Prisma.NoticeFindManyArgs>(
      this.prisma.notice,
      {
        where: {
          title: {
            contains: search,
            mode: 'insensitive',
          },
          category: {
            contains: category,
          },
          sex: {
            equals: gender,
          },
          species: {
            equals: type,
          },
          popularity: {
            lt: byPopularity === 'unpopular' ? 5 : 10,
            gte: byPopularity === 'popular' ? 5 : 0,
          },
          price: {
            lt: byPrice === 'cheap' ? 80 : 200,
            gte: byPrice === 'expensive' ? 80 : 0,
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

  async findOne(id: number) {
    return await this.prisma.notice.findUnique({ where: { id } });
  }
}
