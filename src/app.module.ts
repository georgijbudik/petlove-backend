import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NoticesModule } from './notices/notices.module';
import { CitiesModule } from './cities/cities.module';
import { NewsModule } from './news/news.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { FriendsModule } from './friends/friends.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      validationSchema: configValidationSchema,
    }),
    AuthModule,
    NoticesModule,
    CitiesModule,
    NewsModule,
    PrismaModule,
    FriendsModule,
    UsersModule,
  ],
})
export class AppModule {}
