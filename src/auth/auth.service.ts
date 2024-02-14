import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { jwtsecret } from './auth.module';
import { jwtresreshkey } from './strategies/jwt.refresh.strategy';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    // private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new ConflictException('Email is in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(newUser.id, newUser.name);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return {
      ...newUser,
      ...tokens,
    };
  }

  async signin(loginCredentialsDto: LoginCredentialsDto): Promise<User> {
    const { email, password } = loginCredentialsDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User does not exists');
    }

    console.log(user);
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    const tokens = await this.getTokens(user.id, user.name);

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      ...user,
      token: tokens.refreshToken,
    };
  }

  async logout(id: number) {
    return await this.usersService.remove(id);
  }

  async getTokens(id: number, name: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          name,
        },
        {
          secret: jwtsecret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          name,
        },
        {
          secret: jwtresreshkey,
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(id: number, token: string) {
    const hashedRefreshToken = await bcrypt.hash(token, 10);

    await this.usersService.update(id, { token: hashedRefreshToken });
  }
  async refreshTokens(id: number, token: string) {
    const user = await this.usersService.findById(id);
    if (!user || !user.token) throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(user.token, token);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
