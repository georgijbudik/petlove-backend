import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsRepository } from './news.repository';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
  imports: [PrismaModule],
})
export class NewsModule {}
