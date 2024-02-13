import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService],
  imports: [PrismaModule],
})
export class CitiesModule {}
