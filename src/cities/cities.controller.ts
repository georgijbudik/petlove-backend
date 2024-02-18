import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { responses } from 'src/apiResponses/responses';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiOperation({ summary: 'Get Ukrainian cities' })
  @ApiOkResponse({ description: responses.success })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get()
  findAll(@Query('location') location: string) {
    return this.citiesService.findAll({ location });
  }
}
