import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, CloudinaryModule],
})
export class UsersModule {}
