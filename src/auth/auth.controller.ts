import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { GetUser } from './get-user.decorator';
import { AccessTokenGuard } from './common/access.guard';
import { RefreshTokenGuard } from './common/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  signin(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.signin(loginCredentialsDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@GetUser() user: User) {
    this.authService.logout(user.id);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@GetUser() user: User) {
    const userId = user['id'];
    const refreshToken = user['token'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
