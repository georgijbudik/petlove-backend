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
  popular?: boolean;
  unpopular?: boolean;
  cheap?: boolean;
  expensive?: boolean;
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
    popular,
    unpopular,
    expensive,
    cheap,
  }: IGetAllQueries): Promise<PaginatedOutputDto<Notice>> {
    const paginate = createPaginator({ perPage });

    if (gender === 'all') {
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
            species: {
              contains: type,
            },
            popularity: {
              gte: popular ? 6 : 0,
              lte: unpopular ? 5 : 10,
            },
            price: {
              gte: expensive ? 81 : 0,
              lte: cheap ? 80 : 200,
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
    } else {
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
              contains: gender,
            },
            species: {
              contains: type,
            },
            popularity: {
              gte: popular ? 6 : 0,
              lte: unpopular ? 5 : 10,
            },
            price: {
              gte: expensive ? 81 : 0,
              lte: cheap ? 80 : 200,
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
