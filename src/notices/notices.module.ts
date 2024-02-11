import { Module } from '@nestjs/common';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
import { NoticesRepository } from './notices.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [NoticesController],
  providers: [NoticesService, NoticesRepository],
  imports: [PrismaModule],
})
export class NoticesModule {}
