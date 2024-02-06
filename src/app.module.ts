import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NoticesModule } from './notices/notices.module';
import { CitiesModule } from './cities/cities.module';
import { NewsModule } from './news/news.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.stage.${process.env.STAGE}`,
      validationSchema: configValidationSchema,
    }),
    AuthModule,
    NoticesModule,
    CitiesModule,
    NewsModule,
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     const isProduction = configService.get('STAGE') === 'prod';
    //     return {
    //       ssl: isProduction,
    //       extra: {
    //         ssl: isProduction ? { rejestunauthorized: false } : null,
    //         type: 'postgres',
    //         autoLoadEntities: true,
    //         synchronize: true,
    //         host: configService.get('DB_HOST'),
    //         port: configService.get('DB_PORT'),
    //         username: configService.get('DB_USERNAME'),
    //         password: configService.get('DB_PASSWORD'),
    //         database: configService.get('DB_DATABASE'),
    //       },
    //     };
    //   },
    // }),
  ],
})
export class AppModule {}
