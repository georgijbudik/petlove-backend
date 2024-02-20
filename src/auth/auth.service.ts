import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new ConflictException('Email is in use');
    }
    const hashedPassword = await this.hashData(password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(newUser.id, newUser.name);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
  async signin(loginCredentialsDto: LoginCredentialsDto) {
    const { email, password } = loginCredentialsDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User does not exists');
    }

    const comparePassword = await argon2.verify(user.password, password);
    if (!comparePassword) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    const tokens = await this.getTokens(user.id, user.name);

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(id: string) {
    await this.usersService.update(id, { token: '' });
  }

  async getTokens(id: string, name: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          name,
        },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '23h',
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          name,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(id: string, token: string) {
    const hashedRefreshToken = await this.hashData(token);
    await this.usersService.update(id, { token: hashedRefreshToken });
  }

  async refreshTokens(id: string, token: string) {
    const user = await this.usersService.findById(id);
    if (!user || !user.token) throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(user.token, token);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
