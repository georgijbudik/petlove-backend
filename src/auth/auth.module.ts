import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { UsersRepository } from './users.repository';
import { AccessTokenStrategy } from './strategies/jwt.access.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RefreshTokenStrategy } from './strategies/jwt.refresh.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from 'src/users/users.module';

export const jwtsecret = "vgKVAODrsRofy'K*':@v@M";
@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    PrismaModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    // UsersRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AccessTokenStrategy, RefreshTokenStrategy, PassportModule],
})
export class AuthModule {}
