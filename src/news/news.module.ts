import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [PrismaModule],
})
export class NewsModule {}
