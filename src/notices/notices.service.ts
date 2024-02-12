import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoticesService {
  constructor(private prisma: PrismaService) {}

  async create(createNoticeDto: CreateNoticeDto) {
    return this.prisma.notice.create({ data: createNoticeDto });
  }

  async findAll() {
    return await this.prisma.notice.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.notice.findUnique({ where: { id } });
  }

  update(id: number, updateNoticeDto: UpdateNoticeDto) {
    return `This action updates a #${id} notice`;
  }

  remove(id: number) {
    return `This action removes a #${id} notice`;
  }
}
