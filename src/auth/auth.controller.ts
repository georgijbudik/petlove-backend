import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { GetUser } from './get-user.decorator';
import { AccessTokenGuard } from './common/access.guard';
import { RefreshTokenGuard } from './common/refresh.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { responses } from 'src/apiResponses/responses';

@ApiTags('Auth')
@ApiUnauthorizedResponse({ description: responses.unauthorized })
@ApiOkResponse({ description: responses.success })
@ApiInternalServerErrorResponse({ description: 'Server error' })
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User sign up' })
  @ApiConflictResponse({ description: 'Email is in use' })
  @ApiOkResponse({ status: 201, description: responses.success })
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @ApiOperation({ summary: 'User sign in' })
  @ApiBadRequestResponse({ description: 'User does not exists' })
  @ApiUnauthorizedResponse({
    description: 'Please check your login credentials',
  })
  @Post('signin')
  signin(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.signin(loginCredentialsDto);
  }

  @ApiOperation({ summary: 'User logout' })
  @ApiBearerAuth()
  @ApiOkResponse({ status: 200, description: responses.success })
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@GetUser() user: User) {
    this.authService.logout(user.id);
  }

  @ApiOperation({ summary: 'User refresh token' })
  @ApiUnauthorizedResponse({
    description: 'Access Denied',
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Bearer refresh token',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@GetUser() user: User) {
    const userId = user['id'];
    const refreshToken = user['token'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
