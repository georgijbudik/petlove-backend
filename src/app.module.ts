import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NoticesModule } from './notices/notices.module';
import { CitiesModule } from './cities/cities.module';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { PrismaModule } from './prisma/prisma.module';

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
  ],
})
export class AppModule {}
