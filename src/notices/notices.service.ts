import { Injectable } from '@nestjs/common';

import { PaginatedOutputDto } from 'src/prisma/dto/pagination-output.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Notice, User } from '@prisma/client';

import { createPaginator } from 'prisma-pagination';

interface IGetAllQueries {
  page?: number;
  perPage?: number;
  search?: string;
  location?: string;
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
    location,
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
            location: {
              contains: location,
              mode: 'insensitive',
            },
            category: {
              contains: category,
            },
            species: {
              contains: type,
            },
            popularity: {
              gte: popular && !unpopular ? 3 : 0,
              lte: !popular && unpopular ? 2 : 5,
            },
            price: {
              gte: expensive && !cheap ? 81 : 0,
              lte: !expensive && cheap ? 80 : 200,
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
            location: {
              contains: location,
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

  async addNoticeToFavorites(noticeId: string, user: User) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });
    const { id, ...result } = currentUser;
    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...result,

        favoritesIDs: [...currentUser.favoritesIDs, noticeId],
      },
    });
  }
  async addNoticeToViewed(noticeId: string, user: User) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });
    const { id, ...result } = currentUser;
    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...result,

        viewedIDs: [...currentUser.viewedIDs, noticeId],
      },
    });
  }
}
