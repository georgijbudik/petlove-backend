import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/auth/common/access.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { responses } from 'src/apiResponses/responses';

@ApiTags('Users')
@ApiUnauthorizedResponse({ description: responses.unauthorized })
@ApiInternalServerErrorResponse({ description: responses.serverError })
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: responses.success,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get current user' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: responses.success })
  @UseGuards(AccessTokenGuard)
  @Get('current')
  getCurrent(@GetUser() user: User) {
    return this.usersService.getCurrent(user.id);
  }
  @ApiOperation({ summary: 'Get user by id' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: responses.success })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findById(@Param() id: string) {
    return this.usersService.findById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ description: responses.success })
  @UseGuards(AccessTokenGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @ApiOperation({ summary: 'Upload user avatar' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: responses.success })
  @UseGuards(AccessTokenGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('imgURL'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imgURL: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ description: 'Upload image', type: String })
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    const result = await this.cloudinaryService.uploadFile(file);
    return this.usersService.updateAvatar(user.id, result.secure_url);
  }
}
