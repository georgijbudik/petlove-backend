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
  isPopular?: boolean;
  isUnpopular?: boolean;
  isCheap?: boolean;
  isExpensive?: boolean;
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
    isPopular,
    isUnpopular,
    isExpensive,
    isCheap,
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
            gte: isPopular ? 6 : 0,
            lte: isUnpopular ? 5 : 10,
          },
          price: {
            gte: isExpensive ? 81 : 0,
            lte: isCheap ? 80 : 200,
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

  getCategories() {
    return ['found', 'free', 'lost', 'sell'];
  }

  getSex() {
    return ['female', 'male', 'multiple', 'unknown'];
  }

  getSpecies() {
    return [
      'dog',
      'cat',
      'monkey',
      'bird',
      'snake',
      'turtle',
      'lizard',
      'frog',
      'fish',
      'ants',
      'bees',
      'butterfly',
      'spider',
      'scorpion',
    ];
  }
}
