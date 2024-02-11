import { Injectable } from '@nestjs/common';
import { DataDto } from './data.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class NoticesRepository {
  constructor(private prisma: PrismaService) {}
}

// async getNotices() {
//     return this.prisma.post.findMany();
//   }
//   async createNotice(data: DataDto): Promise<> {
//     const { title, description } = data;

//     const notice = this.prisma.post.create({
//       title,
//       description,
//     });

//     await this.prisma.create({ data: notice });

//     return notice;
//   }
