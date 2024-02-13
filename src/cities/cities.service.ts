import { Injectable } from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Location } from '@prisma/client';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ location }: { location: string }) {
    const [city, state] = location.split(',').map((part) => part.trim());

    const paginate = createPaginator({ perPage: 3 });

    return paginate<Location, Prisma.LocationFindManyArgs>(
      this.prisma.location,
      {
        where: {
          AND: [
            {
              cityEn: {
                contains: city,
                mode: 'insensitive',
              },
            },
            {
              stateEn: {
                contains: state,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          id: 'asc',
        },
      },
    );
  }
}
